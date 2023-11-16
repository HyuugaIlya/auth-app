import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AppDispatch } from '../../store/store'
import { useDispatch } from 'react-redux'
import { removeUser } from '../../store/slices/userSlice'
import { ReactElement } from 'react'

export function Home(): ReactElement {
  const {
    isAuth,
    email,
    name
  } = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  return <>
    <div className="container">
      <div className="home">
        <div className="text_b">Home</div>
        <div className="underline"></div>
        {isAuth ? <>
          <span className='home_text'>
            Successfully Login!
          </span>
          <span className='home_text'>
            Your e-mail is <b>{email}</b>
          </span>
          <span className='home_text'>
            Your name is <b>{name}</b>
          </span>
          <div onClick={() => dispatch(removeUser())} className='btn-logout'>
            <button>
              Log Out
            </button>
          </div>
        </> : <div className='home_auth'>
          <span className='home_text'>
            If you want to see the content u need to <br /> <Link to='/signin'>
              <b>
                Sign In
              </b>
            </Link> or <Link to='/signup'>
              <b>
                Sign Up
              </b>
            </Link> first
          </span>
        </div>}
      </div>

    </div >

  </>
}