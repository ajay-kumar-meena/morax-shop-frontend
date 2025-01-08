import React from 'react'
import { Link } from 'react-router-dom'


function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-[40vh]'>
        <div>Page Not Foundd</div>
        <Link to='/' className='mt-4 bg-blue-600 p-3 border-round text-white hover:bg-blue-800'>Back to Home</Link> 
    </div>
  )
}

export default NotFound