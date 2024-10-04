import { BsEmojiExpressionless } from 'react-icons/bs'
import config from './config'
import _ from 'lodash'

import UsersDB from './database/UsersDB'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const bank = {
  'Ngân hàng TMCP Á Châu': 'ACB.jpg',
  'Ngân hàng TMCP Tiên Phong': 'TPBANK.jpg',
  'Ngân hàng TMCP Đông Á': 'DAB.jpg',
  'Ngân Hàng TMCP Đông Nam Á': 'SEABANK.jpg',
  'Ngân hàng TMCP An Bình': 'ABBANK.jpg',
  'Ngân hàng TMCP Bắc Á': 'BACABANK.jpg',
  'Ngân hàng TMCP Bản Việt': 'VIETCAPITALBANK.jpg',
  'Ngân hàng TMCP Hàng hải Việt Nam': 'MSB.jpg',
  'Ngân hàng TMCP Kỹ Thương Việt Nam': 'TCB.jpg',
  'Ngân hàng TMCP Quốc Dân': 'NCB.jpg',
  'Ngân hàng TMCP Quốc tế Việt Nam': 'VIB.jpg',
  'Ngân hàng TMCP Sài Gòn': 'SCB.jpg',
  'Ngân hàng TMCP Sài Gòn - Hà Nội': 'SHB.jpg',
  'Ngân hàng TMCP Sài Gòn Thương Tín': 'STB.jpg',
  'Ngân hàng TMCP Việt Á': 'VAB.jpg',
  'Ngân hàng TMCP Bảo Việt': 'BVB.jpg',
  'Ngân hàng TMCP Việt Nam Thương Tín': 'VIETBANK.jpg',
  'Ngân Hàng TMCP Xuất Nhập khẩu Việt Nam': 'EIB.jpg',
  'Ngân Hàng TMCP Bưu điện Liên Việt': 'LPB.jpg',
  'Ngân Hàng TMCP Ngoại thương Việt Nam': 'VCB.jpg',
  'Ngân Hàng TMCP Công Thương Việt Nam': 'CTG.jpg',
  'Ngân Hàng TMCP Đầu tư và Phát triển Việt Nam': 'BIDV.jpg',
  'Ngân hàng Chính sách xã hội': 'VBSP.jpg',
  'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh': 'HDBANK.png',
  'Ngân hàng TMCP Kiên Long': 'KIENLONGBANK.png',
  'Ngân hàng TMCP Quân đội': 'MB.png',
  'Ngân hàng TMCP Nam Á': 'NAMABANK.png',
  'Ngân hàng TMCP Phương Đông': 'OCB.png',
  'Ngân Hàng TMCP Xăng Dầu Petrolimex': 'PGBANK.png',
  'Ngân hàng TMCP Đại chúng': 'PVCOMBANK.png',
  'Ngân hàng TMCP Việt Nam Thịnh Vượng': 'VPBANK.png',
  'Ngân hàng TMCP Sài Gòn Công Thương': 'SGB.jpg',
  'Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam': 'CB.jpg',
  'Ngân hàng Thương mại TNHH MTV Đại Dương': 'OCEANBANK.jpg',
  'Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu': 'GPBANK.jpg',
  'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam': 'AGRIBANK.jpg',
  'Ngân hàng Phát triển Việt Nam': 'VDB.png',
}

export const RegisteredDateFormat = (data) => {
  const obj = new Date(data)
  const m = months[obj.getMonth()]
  const d = obj.getDate()
  const y = obj.getFullYear()
  return m + ' ' + d + ', ' + y
}

export const getBankImage = (name) => {
  return `/images/bank/${bank[name]}`
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

export const getTableData = (data, pageNumber, rowLimit) => {
  let result = []
  for (let i = (pageNumber - 1) * rowLimit; i < pageNumber * rowLimit; i++) {
    result.push(data[i])
  }
  return result
}

export const getRangeTotalMoney = (from, to) => {
  if (from === config.initTotalRange[0] && to === config.initTotalRange[1]) return 0
  else if (0 <= from && to < 50) return 1
  else if (50 <= from && to < 100) return 2
  else if (100 <= from && to < 500) return 3
  else if (500 <= from && to < 1000) return 4
  else if (1000 <= from) return 5
}

export const convertToISO = (value) => {
  const obj = new Date(value)
  return obj.toISOString()
}

export const getRequestParams = (information) => {
  let params = ''
  for (const p in information) {
    if (information[p] !== '') params += `&${p}=${information[p]}`
  }
  return params
}

export const formatNumber = (num, decimals = 0, decPoint = '.', thousandsSep = ',') => {
  num = parseFloat(num).toFixed(decimals)
  let parts = num.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep)
  return parts.join(decPoint)
}

export const getCurrentTime = () => {
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()
  const second = new Date().getSeconds()
  return (hour > 9 ? hour : '0' + hour) + ':' + (minute > 9 ? minute : '0' + minute)
}

const filterData = (data, key, operator, value) => {
  let result = []
  data.forEach((objectItem) => {
    for (const prop in objectItem) {
      if (prop === key) {
        let t = objectItem[prop]
        if (t.toString().includes(value)) result.push(objectItem)
      } else {
        if (key.match(prop) && key.match(/From/) && objectItem[prop] >= value)
          result.push(objectItem)
        else if (key.match(prop) && key.match(/To/) && objectItem[prop] <= value)
          result.push(objectItem)
      }
    }
  })
  return result
}

export const getRequestData = (data, params) => {
  // console.log(params)
  const p = params.split('&').slice(1)
  const operator = ['>', '=', '<']
  let express = []
  let result = data

  p.forEach((x) => {
    operator.forEach((y) => {
      if (x.match(y)) {
        express.push([x.split(y)[0], y, x.split(y)[1]])
      }
    })
  })

  express.forEach((ex) => {
    result = filterData(result, ex[0], ex[1], ex[2])
  })

  return result
}

export const searchByKeyword = (data, keyword) => {
  let result = []
  data.forEach((objectItem) => {
    for (const prop in objectItem) {
      if (objectItem[prop] && objectItem[prop].toString().includes(keyword)) {
        result.push(objectItem)
        break
      }
    }
  })
  return result
}
