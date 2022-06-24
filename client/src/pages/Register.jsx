import { useState,useEffect } from "react"
import {FaUser} from 'react-icons/fa'

function Register() {
  const [formData, setformData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    location: ''
  })
  const {first_name,last_name,email,password,password2,location} = formData

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
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <input type="text" className="form-control" name="first_name" id="first_name" value={first_name} placeholder='Enter your first name'
                onChange={onChange} />
                </div>
                <div className="form-group">
                <input type="text" className="form-control" name="last_name" id="last_name" value={last_name} placeholder='Enter your last name'
                onChange={onChange} />
                </div>
                <div className="form-group">
                <input type="email" className="form-control" name="email" id="email" value={email} placeholder='Email'
                onChange={onChange} />
                </div>
                <div className="form-group">
                <input type="password" className="form-control" name="password" id="password" value={password} placeholder='Enter Password'
                onChange={onChange} />
                </div>
                <div className="form-group">
                <input type="password" className="form-control" name="password2" id="password2" value={password2} placeholder='Confirm password'
                onChange={onChange} />
                </div>
                <div className="form-group">
                <input type="text" className="form-control" name="location" id="location" value={location} placeholder='Location'
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

export default Register