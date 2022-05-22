import React from 'react';

const Member = ({member}) => {
    return (
        
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
    );
};

export default Member;