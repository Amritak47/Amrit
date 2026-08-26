"""Print-ready map poster generator.

Generates a single A4 portrait poster: a square street map in the upper
portion of the page with a hairline frame, a red/white location marker,
and a centred text block (couple's names, address) underneath. Outputs
a 300dpi PNG, an RGB PDF, and a CMYK-converted PDF for commercial print.

Run with: python3 map_poster.py
"""

import random
import subprocess
from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
import osmnx as ox
from osmnx._errors import InsufficientResponseError

# ---------------------------------------------------------------------------
# CONSTANTS — edit these to customise the poster
# ---------------------------------------------------------------------------

# --- Location -----------------------------------------------------------
LATITUDE = -12.4598273
LONGITUDE = 130.8436849
RADIUS_M = 900  # map query/crop radius in metres from the point above

# --- Text content ---------------------------------------------------------
TITLE_TEXT = "Promosh and Deelina"
ADDRESS_LINE_1 = "Unit 505, 3-5 Gardiner Street"
ADDRESS_LINE_2 = "Darwin City NT 0800"
CREDIT_TEXT = "Map data © OpenStreetMap contributors"

# --- Palette (exact hex values) --------------------------------------------
COLOR_BACKGROUND = "#F6C6D4"
COLOR_BUILDINGS = ["#D64545", "#E8825A", "#C9A227"]
COLOR_WATER = "#7FB2C4"
COLOR_GREEN = "#4E7A3A"
COLOR_ROADS = "#FFFFFF"
COLOR_MARKER = "#B01B2E"
COLOR_DIVIDER = "#C9A227"
COLOR_BODY_TEXT = "#2B1216"
COLOR_CREDIT = "#8C7A7D"
COLOR_MARKER_HALO = "#FFFFFF"
COLOR_FRAME = "#2B1216"

# --- Page geometry (A4 @ 300dpi) -------------------------------------------
DPI = 300
PAGE_W_PX = 2480
PAGE_H_PX = 3508
PAGE_W_MM = 210.0
PAGE_H_MM = 297.0
MARGIN_MM = 15.0  # print-safe margin, must be >= 15mm

# --- Fonts -------------------------------------------------------------
FONT_SERIF = "DejaVu Serif"
TITLE_FONT_SIZE_PT = 46
ADDR1_FONT_SIZE_PT = 21
ADDR2_FONT_SIZE_PT = 14
CREDIT_FONT_SIZE_PT = 8

# --- Text block layout (mm, measured from the bottom edge of the map) -----
GAP_MAP_TO_TITLE_MM = 20.0
GAP_TITLE_TO_DIVIDER_MM = 24.0  # must clear the italic title's descenders
GAP_DIVIDER_TO_ADDR1_MM = 12.0
GAP_ADDR1_TO_ADDR2_MM = 10.0
GAP_ADDR2_TO_CREDIT_MM = 15.0  # credit anchored to the text block, not the page edge

DIVIDER_WIDTH_MM = 25.0
DIVIDER_THICKNESS_PT = 1.8

# --- Map frame & marker -----------------------------------------------------
MAP_FRAME_LINEWIDTH_PT = 1.0  # hairline
MARKER_DIAMETER_MM = 8.0
MARKER_HALO_EXTRA_MM = 2.2  # halo ring extends this much beyond the dot on each side

# --- Road line widths by highway class (points) -----------------------------
ROAD_WIDTH_MAJOR_PT = 1.6
ROAD_WIDTH_MINOR_PT = 0.7

# --- Misc --------------------------------------------------------------
BUILDING_COLOR_SEED = 7  # fixed seed so palette assignment is reproducible
FETCH_PADDING_FACTOR = 1.15  # fetch a bit wider than RADIUS_M to avoid edge clipping

OUTPUT_DIR = Path(__file__).parent / "output"
OUTPUT_BASENAME = "map_poster"


def mm_to_in(mm):
    return mm / 25.4


def mm_to_pt(mm):
    return mm / 25.4 * 72.0


def _features_or_none(point, tags, dist):
    """osmnx raises InsufficientResponseError when a query matches nothing
    (e.g. no water within radius) -- treat that as an empty layer."""
    try:
        return ox.features_from_point(point, tags=tags, dist=dist)
    except InsufficientResponseError:
        return None


def fetch_osm_data(lat, lon, radius_m):
    """Fetch buildings, water, green space and roads around a point."""
    point = (lat, lon)
    fetch_dist = radius_m * FETCH_PADDING_FACTOR

    buildings = _features_or_none(point, {"building": True}, fetch_dist)

    water = _features_or_none(
        point, {"natural": "water", "waterway": True}, fetch_dist
    )

    green = _features_or_none(
        point,
        {
            "leisure": ["park", "garden", "recreation_ground", "pitch"],
            "landuse": ["grass", "forest", "recreation_ground", "meadow"],
            "natural": ["wood"],
        },
        fetch_dist,
    )

    graph = ox.graph_from_point(point, dist=fetch_dist, network_type="all", simplify=True)

    return buildings, water, green, graph


def project_to_utm(buildings, water, green, graph, lat, lon):
    """Project every layer into the same local metric (UTM) CRS."""
    from shapely.geometry import Point
    import geopandas as gpd

    graph_proj = ox.project_graph(graph)
    utm_crs = graph_proj.graph["crs"]

    def _proj(gdf):
        if gdf is None or len(gdf) == 0:
            return gdf
        return gdf.to_crs(utm_crs)

    buildings_proj = _proj(buildings)
    water_proj = _proj(water)
    green_proj = _proj(green)

    center_gdf = gpd.GeoDataFrame(geometry=[Point(lon, lat)], crs="EPSG:4326").to_crs(utm_crs)
    cx, cy = center_gdf.geometry.iloc[0].x, center_gdf.geometry.iloc[0].y

    return buildings_proj, water_proj, green_proj, graph_proj, cx, cy


def draw_map(ax, buildings, water, green, graph, cx, cy, radius_m):
    ax.set_facecolor(COLOR_BACKGROUND)

    if green is not None and len(green) > 0:
        green.plot(ax=ax, facecolor=COLOR_GREEN, edgecolor="none", linewidth=0, zorder=1)

    if water is not None and len(water) > 0:
        water.plot(ax=ax, facecolor=COLOR_WATER, edgecolor="none", linewidth=0, zorder=2)

    if buildings is not None and len(buildings) > 0:
        buildings = buildings.copy()
        rng = random.Random(BUILDING_COLOR_SEED)
        buildings["_fill"] = [rng.choice(COLOR_BUILDINGS) for _ in range(len(buildings))]
        buildings.plot(ax=ax, color=buildings["_fill"], edgecolor="none", linewidth=0, zorder=3)

    major_highways = {
        "motorway", "trunk", "primary", "secondary", "tertiary",
        "motorway_link", "trunk_link", "primary_link", "secondary_link", "tertiary_link",
    }
    for u, v, data in graph.edges(data=True):
        hwy = data.get("highway", "")
        if isinstance(hwy, list):
            hwy = hwy[0] if hwy else ""
        lw = ROAD_WIDTH_MAJOR_PT if hwy in major_highways else ROAD_WIDTH_MINOR_PT
        geom = data.get("geometry")
        if geom is not None:
            xs, ys = geom.xy
        else:
            xs = [graph.nodes[u]["x"], graph.nodes[v]["x"]]
            ys = [graph.nodes[u]["y"], graph.nodes[v]["y"]]
        ax.plot(xs, ys, color=COLOR_ROADS, linewidth=lw, solid_capstyle="round", zorder=4)

    halo_diam_mm = MARKER_DIAMETER_MM + 2 * MARKER_HALO_EXTRA_MM
    ax.plot(
        cx, cy, marker="o", markersize=mm_to_pt(halo_diam_mm),
        markerfacecolor=COLOR_MARKER_HALO, markeredgewidth=0, zorder=5,
    )
    ax.plot(
        cx, cy, marker="o", markersize=mm_to_pt(MARKER_DIAMETER_MM),
        markerfacecolor=COLOR_MARKER, markeredgewidth=0, zorder=6,
    )

    ax.set_xlim(cx - radius_m, cx + radius_m)
    ax.set_ylim(cy - radius_m, cy + radius_m)
    ax.set_aspect("equal")
    ax.set_xticks([])
    ax.set_yticks([])
    for spine in ax.spines.values():
        spine.set_visible(True)
        spine.set_edgecolor(COLOR_FRAME)
        spine.set_linewidth(MAP_FRAME_LINEWIDTH_PT)


def build_poster(buildings, water, green, graph, cx, cy):
    # figsize computed directly from the target pixel dimensions so the
    # rendered PNG is exactly PAGE_W_PX x PAGE_H_PX at DPI (avoids off-by-
    # one rounding from converting mm -> inches -> pixels).
    fig_w_in = PAGE_W_PX / DPI
    fig_h_in = PAGE_H_PX / DPI
    fig = plt.figure(figsize=(fig_w_in, fig_h_in), dpi=DPI)
    fig.patch.set_facecolor(COLOR_BACKGROUND)

    content_w_mm = PAGE_W_MM - 2 * MARGIN_MM
    map_size_mm = content_w_mm  # square map block, full content width
    map_left_mm = MARGIN_MM
    map_top_mm = MARGIN_MM  # distance from top edge

    map_left_frac = map_left_mm / PAGE_W_MM
    map_width_frac = map_size_mm / PAGE_W_MM
    map_bottom_frac = 1.0 - (map_top_mm + map_size_mm) / PAGE_H_MM
    map_height_frac = map_size_mm / PAGE_H_MM

    ax_map = fig.add_axes([map_left_frac, map_bottom_frac, map_width_frac, map_height_frac])
    draw_map(ax_map, buildings, water, green, graph, cx, cy, RADIUS_M)

    map_bottom_mm_from_top = map_top_mm + map_size_mm
    center_x_frac = 0.5

    y_title_mm = map_bottom_mm_from_top + GAP_MAP_TO_TITLE_MM
    y_divider_mm = y_title_mm + GAP_TITLE_TO_DIVIDER_MM
    y_addr1_mm = y_divider_mm + GAP_DIVIDER_TO_ADDR1_MM
    y_addr2_mm = y_addr1_mm + GAP_ADDR1_TO_ADDR2_MM
    y_credit_mm = y_addr2_mm + GAP_ADDR2_TO_CREDIT_MM

    def y_frac(mm_from_top):
        return 1.0 - mm_from_top / PAGE_H_MM

    fig.text(
        center_x_frac, y_frac(y_title_mm), TITLE_TEXT,
        ha="center", va="top", fontsize=TITLE_FONT_SIZE_PT,
        fontfamily=FONT_SERIF, style="italic", color=COLOR_BODY_TEXT,
    )

    divider_half_w_frac = (DIVIDER_WIDTH_MM / 2) / PAGE_W_MM
    divider_y_frac = y_frac(y_divider_mm)
    line = Line2D(
        [center_x_frac - divider_half_w_frac, center_x_frac + divider_half_w_frac],
        [divider_y_frac, divider_y_frac],
        transform=fig.transFigure, color=COLOR_DIVIDER,
        linewidth=DIVIDER_THICKNESS_PT, solid_capstyle="butt",
    )
    fig.add_artist(line)

    fig.text(
        center_x_frac, y_frac(y_addr1_mm), ADDRESS_LINE_1,
        ha="center", va="top", fontsize=ADDR1_FONT_SIZE_PT,
        fontfamily=FONT_SERIF, color=COLOR_BODY_TEXT,
    )

    fig.text(
        center_x_frac, y_frac(y_addr2_mm), ADDRESS_LINE_2,
        ha="center", va="top", fontsize=ADDR2_FONT_SIZE_PT,
        fontfamily=FONT_SERIF, color=COLOR_BODY_TEXT, alpha=0.75,
    )

    fig.text(
        center_x_frac, y_frac(y_credit_mm), CREDIT_TEXT,
        ha="center", va="bottom", fontsize=CREDIT_FONT_SIZE_PT,
        fontfamily=FONT_SERIF, color=COLOR_CREDIT,
    )

    return fig


def convert_pdf_to_cmyk(rgb_pdf_path, cmyk_pdf_path):
    """Convert an RGB PDF to CMYK using Ghostscript, for commercial print."""
    cmd = [
        "gs",
        "-dSAFER", "-dBATCH", "-dNOPAUSE",
        "-sDEVICE=pdfwrite",
        "-sColorConversionStrategy=CMYK",
        "-dProcessColorModel=/DeviceCMYK",
        "-dCompatibilityLevel=1.5",
        f"-r{DPI}",
        f"-sOutputFile={cmyk_pdf_path}",
        str(rgb_pdf_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Fetching OpenStreetMap data within {RADIUS_M}m of ({LATITUDE}, {LONGITUDE})...")
    buildings, water, green, graph = fetch_osm_data(LATITUDE, LONGITUDE, RADIUS_M)

    print("Projecting to local metric CRS...")
    buildings, water, green, graph, cx, cy = project_to_utm(
        buildings, water, green, graph, LATITUDE, LONGITUDE
    )

    print("Building poster layout...")
    fig = build_poster(buildings, water, green, graph, cx, cy)

    png_path = OUTPUT_DIR / f"{OUTPUT_BASENAME}.png"
    pdf_path = OUTPUT_DIR / f"{OUTPUT_BASENAME}.pdf"
    cmyk_pdf_path = OUTPUT_DIR / f"{OUTPUT_BASENAME}_cmyk.pdf"

    print(f"Saving PNG -> {png_path}")
    fig.savefig(png_path, dpi=DPI, facecolor=fig.get_facecolor())

    print(f"Saving PDF -> {pdf_path}")
    fig.savefig(pdf_path, dpi=DPI, facecolor=fig.get_facecolor())

    print(f"Converting to CMYK -> {cmyk_pdf_path}")
    convert_pdf_to_cmyk(pdf_path, cmyk_pdf_path)

    print("Done.")


if __name__ == "__main__":
    main()
