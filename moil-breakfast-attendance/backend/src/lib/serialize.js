function serializeStudent(row) {
  return {
    id: row.id,
    first: row.first_name,
    last: row.last_name,
    klass: row.klass,
    active: !!row.active,
    order: row.sort_order
  };
}

module.exports = { serializeStudent };
