import React, { useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Member from '../components/Member'
import { staffContext } from '../context/StaffContext'

const Staff = () => {
  const { allStaff }=useContext(staffContext)
 
  return (
    <div>
      <Header />
      <div className='memberList'>
      {
      allStaff.length>0
      ?allStaff.map(member=>(<Member key={member._id} member={member} />))
    :''
    }
      </div>
      <Footer />
    </div>
  )
}

export default Staff
