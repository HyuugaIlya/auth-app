import {
  ReactElement,
  Suspense,
  lazy
} from 'react'
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { Home } from './pages/Home/Home'
import Preloader from './components/Common/Preloader/Preloader';

import './assets/scss/app.scss'
import { NotFound } from './pages/NotFound/NotFound';

const Register = lazy(() => import( /* webpackChunkName: "Register" */ './pages/Register/Register'));
const Login = lazy(() => import( /* webpackChunkName: "Login" */ './pages/Login/Login'));

function App(): ReactElement {
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={
          <Suspense fallback={<Preloader />}>
            <Register />
          </Suspense>
        } />
        <Route path='/signin' element={
          <Suspense fallback={<Preloader />}>
            <Login />
          </Suspense>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App