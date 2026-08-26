# Map poster generator

Generates a print-ready A4 map poster (PNG + PDF + CMYK PDF) centred on a
given address, using OpenStreetMap data via `osmnx` and `matplotlib`.

## Setup

```
pip install -r requirements.txt
```

Ghostscript is also required (for the CMYK conversion step):

```
apt-get install -y ghostscript   # or: brew install ghostscript
```

## Run

```
python3 map_poster.py
```

Outputs are written to `output/`:

- `map_poster.png` — 2480x3508px (A4 @ 300dpi)
- `map_poster.pdf` — RGB, print-ready A4 PDF
- `map_poster_cmyk.pdf` — CMYK-converted PDF for commercial printing

## Customising

All content (location, radius, text, colours, fonts, layout spacing, marker
size) is defined as constants at the top of `map_poster.py` — edit those and
re-run.

## Network requirement

This script needs outbound access to OpenStreetMap's Overpass API
(`overpass-api.de` or a mirror) to fetch map data. It will hang/retry if
that host is blocked by a firewall or egress policy — run it somewhere with
normal internet access (e.g. your own machine) if it stalls.
