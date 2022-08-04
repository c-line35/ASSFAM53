import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import staffList from '../data/staffList'
import Member from '../components/Member'

const Staff = () => {
  return (
    <div>
      <Header />
      <div className='memberList'>
      {staffList.map(member=>(<Member key={member.nom} member={member} />))}
      </div>
      <Footer />
    </div>
  )
}

export default Staff
