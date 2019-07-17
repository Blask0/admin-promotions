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

export function filterPromotions(promotions, statements = []) {
  return statements.reduce((filteredPromotions, st) => {
    if (!st.object) {
      return filteredPromotions
    }
    switch (st.subject) {
      case 'effect':
        return filteredPromotions.filter(promo => {
          if (promo.effectType) {
            return !!st.object[promo.effectType]
          } else { // legacy type
            return !!st.object[promo.type]
          }
        })
      case 'status':
        return filteredPromotions.filter(promo => {
          const now = new Date()
          const beginDate = new Date(promo.beginDate)
          const endDate = promo.endDate ? new Date(promo.endDate) : null
          if (
            !st.object.completed &&
            endDate && endDate.getTime() < now.getTime()
          ) {
            return false
          }
          if (promo.isActive) {
            if (!st.object.scheduled && beginDate.getTime() > now.getTime()) {
              return false
            }
            if (!st.object.running && beginDate.getTime() < now.getTime()) {
              return false
            }
          } else if (!st.object.paused) {
            return false
          }
          return true
        })
      case 'startDate':
        switch (st.verb) {
          case 'is':
            return filteredPromotions.filter(
              promo =>
                new Date(promo.beginDate).getFullYear() ===
                  st.object.getFullYear() &&
                new Date(promo.beginDate).getMonth() === st.object.getMonth() &&
                new Date(promo.beginDate).getDate() === st.object.getDate()
            )
          case 'is after':
            return filteredPromotions.filter(
              promo => new Date(promo.beginDate).getTime() > st.object.getTime()
            )
          case 'is before':
            return filteredPromotions.filter(
              promo => new Date(promo.beginDate).getTime() < st.object.getTime()
            )
          case 'is within':
            return filteredPromotions.filter(
              promo =>
                new Date(promo.beginDate).getTime() < st.object.to.getTime() &&
                new Date(promo.beginDate).getTime() > st.object.to.getTime()
            )
          case 'is not within':
            return filteredPromotions.filter(
              promo =>
                new Date(promo.beginDate).getTime() > st.object.to.getTime() ||
                new Date(promo.beginDate).getTime() > st.object.to.getTime()
            )
          default:
            return filteredPromotions
        }
      case 'endDate':
        switch (st.verb) {
          case 'is':
            return filteredPromotions.filter(
              promo =>
                new Date(promo.endDate).getFullYear() ===
                  st.object.getFullYear() &&
                new Date(promo.endDate).getMonth() === st.object.getMonth() &&
                new Date(promo.endDate).getDate() === st.object.getDate()
            )
          case 'is after':
            return filteredPromotions.filter(
              promo => promo.endDate > st.object.toISOString()
            )
          case 'is before':
            return filteredPromotions.filter(
              promo => promo.endDate < st.object.toISOString()
            )
          case 'is within':
            return filteredPromotions.filter(
              promo =>
                promo.endDate < st.object.to.toISOString() &&
                promo.endDate > st.object.to.toISOString()
            )
          case 'is not within':
            return filteredPromotions.filter(
              promo =>
                promo.endDate > st.object.to.toISOString() ||
                promo.endDate > st.object.to.toISOString()
            )
          default:
            return filteredPromotions
        }
      case 'active':
        if (st.object.active && st.object.inactive) {
          return filteredPromotions
        } else if (st.object.active) {
          return filteredPromotions.filter(promo => !!promo.isActive)
        } else if (st.object.inactive) {
          return filteredPromotions.filter(promo => !promo.isActive)
        }
        return [] // y tho? all unmarked
      default:
        return filteredPromotions
    }
  }, promotions)
}
