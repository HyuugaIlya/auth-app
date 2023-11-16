import { ReactElement } from 'react'

import { RegisterForm } from '../../components/RegisterForm/RegisterForm'
import { Link } from 'react-router-dom'

function Register(): ReactElement {
  return (
    <div className='container'>
      <div className="form">
        <div className='btn-back'>
          <Link to='/'>
            ← Home
          </Link>
        </div>
        <div className="auth">
          <div className="text_b">Sign Up</div>
          <div className="underline"></div>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register