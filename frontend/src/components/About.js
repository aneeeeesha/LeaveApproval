import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const About = () => {

  const history = useHistory();
  let data;
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const approveLeave = 
    async (email,index) => {

      // const { name, email, phone, room_no, course, year, password, cpassword } = user;

      const response = await fetch("/approveLeave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ name, email, phone, room_no, course, year, password, cpassword })
        body:JSON.stringify({email, index})
        
  
  
      });
  }

  const callAboutPage= async ()=>{
   try{ const res = await fetch('/activity',{
      method:"GET",
      headers:{
        "Content-type":"application/json",
      },
      credentials:"include"
    })
    console.log(res);
   data=await res.json();
    console.log("fffffffffff");
  console.log(data);
   setUserData(data);
   setLoading(false);
  
  
  }catch(error){
    console.log(error);
    history.push('/signin');}
}
  useEffect(() => {
    
    callAboutPage();
  }, [])
  
  return (
    <>
    <form >
      <h1>Leave Reqs</h1>
      {console.log(userData)}
     
    </form>
    {loading ? (
          <p>Loading...</p>
        ) : ((userData.length)>1? (
        <div>{userData.map((user)=>(user.leave_reqs.map((leave_data,index) => (
        <div key={leave_data.leave_req._id}>
                  <p>NAME: {user.name}</p>
         
          <p>From: {leave_data.leave_req.from}</p>
          <p>To: {leave_data.leave_req.to}</p>
          <p>Reason: {leave_data.leave_req.reason}</p>
          <p style={{color : leave_data.leave_req.approved  ? 'green' : 'red'}}>Status: {leave_data.leave_req.approved?"Yes":"No"}</p>
          <button onClick = {()=>approveLeave(user.email,index)}>Approve</button>
          {/* Render other leave request data */}
       </div>
      ))))} </div>
        ):(
          <div>{userData.leave_reqs.map((leave_data) => (
          <div key={leave_data.leave_req._id}>
            <p>From: {leave_data.leave_req.from}</p>
            <p>To: {leave_data.leave_req.to}</p>
            <p>Reason: {leave_data.leave_req.reason}</p>
            <p style={{color : leave_data.leave_req.approved  ? 'green' : 'red'}}>Status: {leave_data.leave_req.approved?"Yes":"No"}</p>
            {/* Render other leave request data */}
         </div>
        ))} </div>
          ))}
        
    </>
  )
}

export default About;