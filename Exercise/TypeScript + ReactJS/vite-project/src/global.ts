import _ from 'lodash'

interface TableDataProps {
  userId: number,
  id: number,
  title: string,
  body: string
}

export const getTableData = (data: Array<TableDataProps> | undefined, pageNumber: number, rowLimit: number) => {
    
  const result = []
  if(data){
    for (let i = (pageNumber - 1) * rowLimit; i < pageNumber * rowLimit; i++) {
      result.push(data[i])
    }
  }
 return result
  }

  
export const returnPaginationRange = (totalPage: number, page: number, siblings:number) => {
    const totalPageNoInArray: number = 7 + siblings
    if (totalPageNoInArray >= totalPage) {
      return _.range(1, totalPage + 1)
    }
    const leftSiblingIndex: number = Math.max(page - siblings, 1)
    const rightSiblingIndex: number = Math.min(page + siblings, totalPage)
  
    const showLeftDots: boolean = leftSiblingIndex > 2
    const showRightDots: boolean = rightSiblingIndex < totalPage - 2
  
    if (!showLeftDots && showRightDots) {
      const leftItemsCount: number = 3 + 2 * siblings
      const leftRange: number[] = _.range(1, leftItemsCount + 1)
      return [...leftRange, ' ...', totalPage]
    } else if (showLeftDots && !showRightDots) {
      const rightItemsCount: number = 3 + 2 * siblings
      const rightRange: number[] = _.range(totalPage - rightItemsCount + 1, totalPage + 1)
      return [1, '... ', ...rightRange]
    } else {
      const middleRange: number[] = _.range(leftSiblingIndex, rightSiblingIndex + 1)
      return [1, '... ', ...middleRange, ' ...', totalPage]
    }
  }