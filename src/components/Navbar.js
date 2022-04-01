import { React } from 'react'
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom"
function Navbar() {
  let history=useHistory();
  const handlelogout = ()=>{
    localStorage.removeItem('token');
    history.push('login');
  }
  let location = useLocation();
  

  return (

    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
              </li>

            </ul>
            {!localStorage.getItem('token')?<form className="d-flex">
              
            <Link class="btn btn-primary mx-3" to="/login" role="button">Login</Link>
            <Link class="btn btn-primary" to="/signup" role="button">Signup</Link>
            </form>:<button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
          </div>
        </div>
      </nav>
    </>

  )
}

export default Navbar
