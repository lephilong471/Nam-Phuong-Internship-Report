import _ from 'lodash'

export const getTableData = (data, pageNumber, rowLimit) => {
    let result = []
    for (let i = (pageNumber - 1) * rowLimit; i < pageNumber * rowLimit; i++) {
      result.push(data[i])
    }
    return result
  }

  
export const returnPaginationRange = (totalPage, page, limit, siblings) => {
    let totalPageNoInArray = 7 + siblings
    if (totalPageNoInArray >= totalPage) {
      return _.range(1, totalPage + 1)
    }
    let leftSiblingIndex = Math.max(page - siblings, 1)
    let rightSiblingIndex = Math.min(page + siblings, totalPage)
  
    let showLeftDots = leftSiblingIndex > 2
    let showRightDots = rightSiblingIndex < totalPage - 2
  
    if (!showLeftDots && showRightDots) {
      let leftItemsCount = 3 + 2 * siblings
      let leftRange = _.range(1, leftItemsCount + 1)
      return [...leftRange, ' ...', totalPage]
    } else if (showLeftDots && !showRightDots) {
      let rightItemsCount = 3 + 2 * siblings
      let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1)
      return [1, '... ', ...rightRange]
    } else {
      let middleRange = _.range(leftSiblingIndex, rightSiblingIndex + 1)
      return [1, '... ', ...middleRange, ' ...', totalPage]
    }
  }