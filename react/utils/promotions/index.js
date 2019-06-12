function sortNameAlphapeticallyASC(a, b) {
  return a.name.toLowerCase() < b.name.toLowerCase()
    ? -1
    : a.name.toLowerCase() > b.name.toLowerCase()
      ? 1
      : 0
}

function sortNameAlphapeticallyDESC(a, b) {
  return a.name.toLowerCase() < b.name.toLowerCase()
    ? 1
    : a.name.toLowerCase() > b.name.toLowerCase()
      ? -1
      : 0
}

function sortEffectAlphapeticallyASC(a, b) {
  return a.effectType.toLowerCase() < b.effectType.toLowerCase()
    ? -1
    : a.effectType.toLowerCase() > b.effectType.toLowerCase()
      ? 1
      : 0
}

function sortEffectAlphapeticallyDESC(a, b) {
  return a.effectType < b.effectType ? 1 : a.effectType > b.effectType ? -1 : 0
}

function sortStartDateASC(a, b) {
  return new Date(a.beginDate).getTime() < new Date(b.beginDate).getTime()
    ? -1
    : new Date(a.beginDate).getTime() > new Date(b.beginDate).getTime()
      ? 1
      : 0
}

function sortStartDateDESC(a, b) {
  return new Date(a.beginDate).getTime() < new Date(b.beginDate).getTime()
    ? 1
    : new Date(a.beginDate).getTime() > new Date(b.beginDate).getTime()
      ? -1
      : 0
}

function sortEndDateASC(a, b) {
  return new Date(a.endDate).getTime() < new Date(b.endDate).getTime()
    ? -1
    : new Date(a.endDate).getTime() > new Date(b.endDate).getTime()
      ? 1
      : 0
}

function sortEndDateDESC(a, b) {
  return new Date(a.endDate).getTime() < new Date(b.endDate).getTime()
    ? 1
    : new Date(a.endDate).getTime() > new Date(b.endDate).getTime()
      ? -1
      : 0
}

export function sortPromotions(promotions, { sortedBy, sortOrder }) {
  switch (sortedBy) {
    case 'name':
      return sortOrder === 'ASC'
        ? promotions.slice().sort(sortNameAlphapeticallyASC)
        : promotions.slice().sort(sortNameAlphapeticallyDESC)
    case 'effectType':
      return sortOrder === 'ASC'
        ? promotions.slice().sort(sortEffectAlphapeticallyASC)
        : promotions.slice().sort(sortEffectAlphapeticallyDESC)
    case 'beginDate':
      return sortOrder === 'ASC'
        ? promotions.slice().sort(sortStartDateASC)
        : promotions.slice().sort(sortStartDateDESC)
    case 'endDate':
      return sortOrder === 'ASC'
        ? promotions.slice().sort(sortEndDateASC)
        : promotions.slice().sort(sortEndDateDESC)
    default:
      return promotions
  }
}

export function paginate(promotions, { page, rowsPerPage }) {
  const from = (page - 1) * rowsPerPage
  const to = from + rowsPerPage
  return {
    items: promotions.slice(from, to),
    from,
    to,
  }
}
