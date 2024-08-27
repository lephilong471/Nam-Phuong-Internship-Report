import { useState, useEffect } from 'react'
import { returnPaginationRange, getTableData } from './global'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  
    // Table pagination
    const [pageData, setPageData] = useState(null)
    const [page, setPage] = useState(1)
    const limit = 3
    const [totalPage, setTotalPage] = useState(1)
    const [paginate, setPaginate] = useState(null)

    const handlePageChange = (pageChange) => {
      setPage(pageChange)
      setPageData(getTableData(data, pageChange, limit))
      setPaginate(returnPaginationRange(totalPage, pageChange, limit, 1))
    }

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users/1/posts"
    fetch(url,{
      method: "GET",
    }).then(res => res.json())
      .then(resData => {
        setPageData(getTableData(resData, page, limit))
        setPaginate(returnPaginationRange(Math.ceil(resData.length / limit), page, limit, 1))
        setTotalPage(Math.ceil(resData.length / limit))
        setData(resData)
      })
      .catch(error => console.log(error))
  }, [page])

  return (
    <>
      <table border={1} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {pageData && pageData.map((item, index) => {
            if(item)
            return (
              <tr key={index}>
                <td>
                  {item.userId}
                </td>
                <td>
                  {item.id}
                </td>
                <td>
                  {item.title}
                </td>
                <td>
                  {item.body}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        {paginate &&
            paginate.map((item, key) => {
              if (item === page) {
                return (
                  <li key={key} className="active">
                    <span>{item}</span>
                  </li>
                )
              }
              return (
                <li key={key}>
                  <span
                    onClick={() => handlePageChange(item)}
                  >
                    {item}
                  </span>
                </li>
              )
            })}
      </div>

    </>
  )
}

export default App
