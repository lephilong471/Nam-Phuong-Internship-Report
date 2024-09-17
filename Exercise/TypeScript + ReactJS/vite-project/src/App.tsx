import { ChangeEvent, useState } from 'react'
import { returnPaginationRange, getTableData } from './global'
import './App.css'
import { useQuery, useMutation} from '@tanstack/react-query';

interface TableDataProps {
  userId: number,
  id: number,
  title: string,
  body: string
}

function App() {
  // const [pageData, setPageData] = useState<Array<TableDataProps>>([])

  // const [page, setPage] = useState<number>(1)
  const limit = 3
  const [allRows, setAllRows] = useState<number>(10)
  // const [totalPage, setTotalPage] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [allData, setAllData] = useState<Array<TableDataProps>>([])

  // Table pagination
  // const {data} = useQuery('getTableData', fetchData)
  // console.log(data)

  const [modal, setModal] = useState<boolean>(false)

  const getDataFromAPI = async (): Promise<TableDataProps[]> => {
    const url = "http://localhost:3000/posts"
    const res = await fetch(url)
    return res.json()
  }
  const fetchData = async (pageNumber: number, rowLimit: number): Promise<TableDataProps[]> => {
    const data: TableDataProps[] = await getDataFromAPI()
    setAllRows(data.length)
    return getTableData(data, pageNumber, rowLimit )
  }

  
  const { data } = useQuery<TableDataProps[]>(
    {
      queryKey: ['getTableData', currentPage],
      queryFn: () => fetchData(currentPage, limit),
      staleTime: 30000, // Data is considered fresh for 30 seconds
      refetchOnWindowFocus: false, // Don't refetch on window focus
      // Additional options can be added here
      enabled: true
    }
  );

  const deletePost = async (postId: number): Promise<void> => {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  };

  const deletePostMutation = useMutation(
    {
      mutationFn: (postId: number) => deletePost(postId),
      onSuccess: () => {
        alert('Delete Post Successfully!')
        window.location.reload()
      },
      onError: () => {
        alert('Error!')
      },
    }
  );

  const handleDelete = (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  };

  const [paginate, setPaginate] = useState<Array<number | string>>(returnPaginationRange(Math.ceil(20 / limit), currentPage, 1))

    const handlePageChange = (pageChange: number) => {
      setCurrentPage(pageChange)
      // setPageData(getTableData(data, pageChange, limit))
      setPaginate(returnPaginationRange(Math.ceil(20 / limit), pageChange, 1))
    }
  



    // setPageData(getTableData(data, page, limit))
  // setPaginate(returnPaginationRange(Math.ceil(20 / limit), currentPage, 1))
    // setTotalPage(Math.ceil(data.length / limit)) 


  // setAllData(data)
  const [createInfo, setcreateInfo] = useState({
    title: '',
    body: '' 
  })

  const changeFormCreate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {value, name} = event.target
      setcreateInfo(prev => ({
          ...prev, [name]: value
      }))
  }

  const createPost = async () => {
    const response = await fetch(`http://localhost:3000/posts`, {
      method: 'POST',
      body:JSON.stringify({
        "id": (allRows + 1).toString(),
        "userId": 1,
        "title": createInfo.title,
        "body": createInfo.body
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  }
  const createPostMutation = useMutation(
    {
      mutationFn: () => createPost(),
      onSuccess: () => {
        alert('Create Post Successfully!')
        setAllRows(prev => prev + 1)
      },
      onError: () => {
        alert('Error!')
      },
    }
  );

  const handleCreate = () => {
    createPostMutation.mutate()
  }

  const [edit, setEdit] = useState({
    id: 0,
    edit_title: '',
    edit_body: ''
  })

  const handleUpdate = (postInfo: TableDataProps) => {
    const {id, title, body} = postInfo
    setEdit({
      id: id,
      edit_title: title,
      edit_body: body
    })
    setModal(true)
  }
  const changeFormEdit = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = event.target
    setEdit(prev => ({
        ...prev, [name]: value
    }))
  }

  const updatePostMutation = useMutation(
    {
      mutationFn: (postId: number) => updatePost(postId),
      onSuccess: () => {
        alert('Update Post Successfully!')
      },
      onError: () => {
        alert('Error!')
      },
    }
  );

  const updatePost = async (postId: number) => {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'PATCH',
      body:JSON.stringify({
        "title": edit.edit_title,
        "body": edit.edit_body
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  }

  return (
    <>
    {modal && (
    <div id="myModal" className="modal">
      <div className="modal-content">
          <span className="close-btn" onClick={() => setModal(false)}>&times;</span>
          <h2>Update Information</h2>
          <form onSubmit={() => updatePostMutation.mutate(edit.id)}>
            Title: <input type="text" name="edit_title" value={edit.edit_title} onChange={changeFormEdit} required/> <br/>
            Body: <textarea name="edit_body" value={edit.edit_body} onChange={changeFormEdit} required/> <br />
          <button type="submit">Submit</button>
          </form>
      </div>
    </div>
    )}

    <form onSubmit={handleCreate}>
        Title: <input name="title" value={createInfo.title} onChange={(event: ChangeEvent<HTMLInputElement>): void => changeFormCreate(event)} required /> <br/>
        Body: <textarea name="body" value={createInfo.body} onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => changeFormCreate(event)} required/> <br/>
        <button type="submit">Create Post</button>
        </form>
      <table border={1} cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item: TableDataProps, index) => {
            if (item)
              return (
                <tr key={index}>
                  <td>
                    {item.id}
                  </td>
                  <td>
                    {item.userId}
                  </td>
              
                  <td>
                    {item.title}
                  </td>
                  <td>
                    {item.body}
                  </td>
                  <td>
                    <button onClick = {() => handleUpdate(item)}>Update</button>
                    <button onClick = {() => handleDelete(item.id)}> Delete </button>
                  </td>
                </tr>
              )
          })}
        </tbody>
      </table>
      <div className="pagination">
        {paginate &&
          paginate.map((item, key) => {
            if (typeof item === "number") {
              if (item === currentPage) {
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
            }
          })}
      </div>

    </>
  )
}

export default App
