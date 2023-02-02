import React, { useContext } from 'react';
import { authContext } from '../context/AuthContext';


const Member = ({member}) => {

  const { token }=useContext(authContext)

    return (
        <>
        {member&&
            <div key={member._id} className="member">
              <div className='member__identity'>
                <div className = "member__identity__name">{member.user.lastName}</div>
                <div className = "member__identity__firstname">{member.user.firstName}</div>
              </div>
              {token
              ?<div className = "member__photo"><img src={member.imageUrl} alt={member.grade}/></div>
              :<div className='member__photo'><img src='./assets/images/profil-homme.jpg' alt='profil'/></div>
              }
              
              <div className = "member__grade">{member.grade}</div>
              <div className = "member__missions">{member.mission.map(mission=>(
                <p key = {mission}>{mission} </p>
              ))}</div>
          
          </div>
          }
          </>
    );
};

export default Member;