import React, { useState, useHistory } from 'react'


const Signup = () => {
  // const history = useHistory();
  const [user, setUser] = useState({
    name: "null",
    email: "null",
    phone: "0",
    room_no: "0",
    course: "",
    year: "null",
    password: "null",
    cpassword: "null"
  })

  // const [user, setUser] = useState({
  //     email: "",
  //     password:""
  //     })

  let name, value;
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, room_no, course, year, password, cpassword } = user;
    // const {email, password}=user;
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, room_no, course, year, password, cpassword })
      // body:JSON.stringify({email, password})



    });

    console.log(JSON.stringify({ name, email, phone, room_no, course, year, password, cpassword }));
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
        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="text" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.name} onChange={handleInputs} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email} onChange={handleInputs} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Phone</label>
          <input type="number" name="phone" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.phone} onChange={handleInputs} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Room No.</label>
          <input type="number" name="room_no" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.room_no} onChange={handleInputs} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Year</label>
          <input type="number" name="year" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.year} onChange={handleInputs} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">course</label>
          <input type="text" name="course" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.course} onChange={handleInputs} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={user.password} onChange={handleInputs} placeholder="Password" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" name="cpassword" className="form-control" id="exampleInputPassword1" value={user.cpassword} onChange={handleInputs} placeholder="Password" />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button onClick={PostData} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Signup