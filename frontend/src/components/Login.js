import React,{useState} from 'react'
import './Login.css'
const Login = () => {
  const [user, setUser] = useState({
    email: "null",
    password: "null"
  })

  // const [user, setUser] = useState({
  //     email: "",
  //     password:""
  //     })

  let name, value;
  const PostData = async (e) => {
    e.preventDefault();
    // const { name, email, phone, room_no, course, year, password, cpassword } = user;
    const {email, password}=user;
    const response = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ name, email, phone, room_no, course, year, password, cpassword })
      body:JSON.stringify({email, password})



    });

    console.log(JSON.stringify({email, password}));
    const data = await response.json();
    if (data.status === 422 || !data) {
      window.alert("EDDA?");
      console.log("EDDA?");
    }
    else {
      window.alert("YAYYY!");
      console.log("YAYYY!");

      // history.push("/signin");
    }

  }


  const handleInputs = (e) => {

    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  return (
  
    <>
    <form method="POST">
  
  <div class="segment">
    <h1>Sign up</h1>
  </div>
  
  <label>
    <input name="email" type="email" value={user.email} onChange={handleInputs} placeholder="Email Address"/>
  </label>
  <label>
    <input name="password" type="password" value={user.password} onChange={handleInputs} placeholder="Password"/>
  </label>
  <button class="red" onClick={PostData} type="submit"><i class="icon ion-md-lock"></i> Log in</button>
  
  
  
</form></>
  )
}

export default Login