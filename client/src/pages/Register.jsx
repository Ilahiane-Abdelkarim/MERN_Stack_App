import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate} from "react-router-dom"
import { toast} from "react-toastify"
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

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

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)

  useEffect (() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setformData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Password do not match')
    }else {
      const userData = {
        first_name,
        last_name,
        email,
        password,
        password2,
        location
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
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
                <button type="submit" className="btn btn-block" >Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register