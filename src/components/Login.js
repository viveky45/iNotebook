import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
  let history = useHistory();
  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    
    console.log(json);
  
    if(json.success){ 
      localStorage.setItem('token',json.authtoken);
      history.push('/');
      props.showalert("Logged in Successfully", "success")
      
    }
    else{
      props.showalert("invalid credentials", "danger")
    }
  }

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
        <div id="emailHelp" className="form-text"></div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={credentials.password} onChange={onchange} name="password" />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login
