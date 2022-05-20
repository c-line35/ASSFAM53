import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import staffList from '../data/staffList'

const Staff = () => {
  return (
    <div>
      <Header />
      
        <div  className="memberList">
          {staffList.map(member=>(
          <div key={member.nom} className="member">
            <div className='member__identity'>
              <div className = "member__identity__name">{member.nom}</div>
              <div className = "member__identity__firstname">{member.prenom}</div>
            </div>
            <div className = "member__photo"><img src={member.photo} alt={member.grade}/></div>
            <div className = "member__grade">{member.grade}</div>
            <div className = "member__missions">{member.missions.map(mission=>(
              <p key = {mission}>{mission} </p>
            ))}</div>
          </div> 
          ))}
        </div>
     
      <Footer />
    </div>
  )
}

export default Staff
