import { ReactElement } from 'react'
import { LoginForm } from "../../components/LoginForm/LoginForm"
import { Link } from 'react-router-dom'

function Login(): ReactElement {

  return (
    <div className='container'>
      <div className='form'>
        <div className='btn-back'>
          <Link to='/'>
            ← Home
          </Link>
        </div>
        <div className="auth">
          <span className="text_b">Sign In</span>
          <div className="underline"></div>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
