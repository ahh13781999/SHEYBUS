import { useNavigate } from "react-router-dom"

const Bus = ({ bus }) => {
  const { _id: id, name, from, to, fare, journeyDate } = bus
  const navigate = useNavigate()
  return (
    <div className='flex flex-1 flex-col w-full border-solid border-2 hover:bg-gray-100'>
      <h1 className='text-lg p-2'>{name}</h1>
      <hr />
      <div className='flex items-center justify-between border p-2'>
        <div className='flex flex-col'>
          <p className='text-sm font-semibold'>From:</p>
          <p className='text-sm'>{from}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm font-semibold'>To:</p>
          <p className='text-sm'>{to}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm font-semibold'>Fare</p>
          <p className='text-sm'>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(fare)}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between border p-2'>
        <div>
          <p className='text-sm font-semibold'>Journey Date</p>
          <p className='test-sm'>
            {new Date(journeyDate).toLocaleDateString("en-US")}
          </p>
        </div>
        <button
          onClick={() => {
            navigate(`/bookNow/${id}`)
          }}
          className='text-lg  py-2 px-2 rounded-md bg-green-600 text-white hover:opacity-80'
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default Bus
