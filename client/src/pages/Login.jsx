import { useState,useEffect } from "react"
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setformData] = useState({
    email: '',
    password: ''
  })
  const {email,password} = formData

  const onChange = (e) => {
    console.log(e.target.name)
    setformData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>LogIn and start setting goals</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input type="email" className="form-control" name="email" id="email" value={email} placeholder='Email'
                onChange={onChange} />
                </div>
                <div className="form-group">
                <input type="password" className="form-control" name="password" id="password" value={password} placeholder='Enter Password'
                onChange={onChange} />
                </div>
                <div className="form-group">
                <buttom type="submit" className="btn btn-block" >Submit</buttom>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login