import {
    FC,
    useState
} from 'react'
import {
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import {
    getAuth,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { setUser } from '../../store/slices/userSlice'

import clsx from 'clsx'

import email_icon from '../../assets/img/email.png'
import password_icon from '../../assets/img/password.png'

type TForm = {
    email: string
    password: string
}
export const LoginForm: FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true)

    const visibilityHandler = () => {
        setIsVisible(!isVisible)
    }

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        clearErrors,
        reset
    } = useForm<TForm>({
        mode: 'all'
    })

    const onSubmit: SubmitHandler<TForm> = (data) => {
        if (isValid) {
            const auth = getAuth()
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then(({ user }) => {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        name: user.displayName
                    }))
                    navigate('/')
                })
                .catch(() => alert('Invalid User! Try to Sign Up, please'))

            reset()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs">
                <div className={clsx("input", errors?.email && 'error')}>
                    <img src={email_icon} alt="email" />
                    <input {...register('email',
                        {
                            required: 'This field is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                message: 'Please enter valid e-mail!'
                            }
                        })} placeholder={"example@type.com"} onFocus={() => clearErrors('email')}
                    />
                </div>
                <div className="errors">
                    {errors?.email && (
                        <span>{errors?.email.message || 'Error!'}</span>
                    )}
                </div>
                <div className={clsx("input", errors?.password && 'error')}>
                    <img src={password_icon} alt="password" />
                    <input {...register('password',
                        {
                            required: 'This field is required',
                            minLength: {
                                value: 6,
                                message: 'Min length is 6 symbols'
                            },
                            maxLength: {
                                value: 50,
                                message: 'Max length exceeded'
                            }
                        })}
                        placeholder={"..."} type={'password'} onFocus={() => clearErrors('password')}
                    />
                </div>
                <div className="errors">
                    {errors?.password && (
                        <span>{errors?.password.message || 'Error!'}</span>
                    )}
                </div>
                <div className='buttons'>
                    <div
                        className='btn-submit'
                        onMouseEnter={visibilityHandler}
                        onMouseLeave={visibilityHandler}
                    >
                        <button>
                            Sign In
                        </button>
                    </div>
                    <div className={clsx('switch', isVisible && 'visible')}>
                        <div className='switch_text'>Have no account yet?</div>
                        <Link to='/signup'>
                            <b>Sign Up</b>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}