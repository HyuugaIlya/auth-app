import {
    FC,
    useState
} from 'react'
import {
    SubmitHandler,
    useForm
} from 'react-hook-form'
import {
    Link,
    useNavigate
} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store'
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth"
import { setUser } from '../../store/slices/userSlice'

import clsx from 'clsx'

import user_icon from '../../assets/img/person.png'
import email_icon from '../../assets/img/email.png'
import password_icon from '../../assets/img/password.png'

type TForm = {
    name: string
    email: string
    password: string
}
export const RegisterForm: FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true)

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
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(({ user }) => {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        // Можно ли?
                        name: data.name,
                    }))
                })
                .then(() => {
                    if (auth.currentUser) {
                        updateProfile(auth.currentUser, { displayName: data.name })
                            .catch(() => console.log(errors))
                    }
                    navigate('/')
                })
                .catch(() => alert('Something went wrong!'))

            reset()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs">
                <div className={clsx("input", errors?.name && 'error')}>
                    <img src={user_icon} alt="user" />
                    <input {...register('name',
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
                        })} placeholder={"Enter your name"} onFocus={() => clearErrors('name')}
                    />
                </div>
                <div className="errors">
                    {errors?.name && (
                        <span>{errors?.name.message || 'Error!'}</span>
                    )}
                </div>
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
                        onMouseEnter={() => setIsVisible(!isVisible)}
                        onMouseLeave={() => setIsVisible(!isVisible)}
                    >
                        <button>
                            Sign Up
                        </button>
                    </div>
                    <div className={clsx('switch', isVisible && 'visible')}>
                        <div className='switch_text'>Already have an account?</div> <Link to='/signin'>
                            <b>Sign In</b>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}