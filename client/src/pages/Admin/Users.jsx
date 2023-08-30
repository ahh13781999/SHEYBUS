import { useEffect, useState } from "react"
import PageTitle from "../../components/PageTitle"
import { useDispatch } from "react-redux"
import { HideLoading, ShowLoading } from "../../redux/alertsSlice"
import axios from "axios"
import { Table, Tag } from "antd"

const Users = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    dispatch(ShowLoading())
    try {
      const { data } = await axios.post("/api/users/getAll", {
        withCredentials: true,
      })
      setUsers(data)
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  const updateUserPermissions = async (userId, action) => {
    dispatch(ShowLoading())
    try {
      await axios.post("/api/users/updateUserPermissions",{
        userId,
        action
      }, {
        withCredentials: true,
      })
      dispatch(HideLoading())
      getUsers()
    } catch (error) {
      dispatch(HideLoading())
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "",
      render: (data) => {
        return data.isBlocked ? "Blocked" : "Active"
      }
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        if (data?.isAdmin) {
          return "Admin"
        } else {
          return "User"
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className='flex flex-row space-x-1'>
          <Tag
            onClick={() =>
              updateUserPermissions(
                record?._id,
                record?.isBlocked ? "unblock" : "block"
              )
            }
            color='orange'
            className='cursor-pointer text-base hover:opacity-50'
          >
            {record?.isBlocked ? "Unblock" : "Block"}
          </Tag>
          <Tag
            onClick={() =>
              updateUserPermissions(
                record?._id,
                record?.isAdmin ? "remove-admin" : "make-admin"
              )
            }
            color='green'
            className='cursor-pointer text-base hover:opacity-50'
          >
            {record?.isAdmin ? "Remove Admin" : "Make Admin"}
          </Tag>
        </div>
      ),
    },
  ]

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <div className='flex justify-between my-4'>
        <PageTitle title='Users' />
      </div>
      <Table columns={columns} dataSource={users} className='my-16' />
    </div>
  )
}

export default Users
