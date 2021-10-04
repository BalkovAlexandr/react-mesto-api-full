import React from 'react'
import { Link } from 'react-router-dom'

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegister(password, email)
  }

  return (
    <section className='login page__center'>
      <div className='login__container'>
        <h3 className='login__title'>Регистрация</h3>
        <form className='login__form' onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={handleChangeEmail}
            className='login__input'
            type='email'
            name='email'
            placeholder='Email'
            minLength='2'
            maxLength='40'
            required
            autoComplete='username'
          ></input>
          <input
            value={password}
            onChange={handleChangePassword}
            className='login__input'
            type='password'
            name='password'
            placeholder='Пароль'
            minLength='6'
            maxLength='20'
            required
            autoComplete='current-password'
          ></input>
          <button className='login__submit-btn' type='submit'>
            Зарегистрироваться
          </button>
          <Link to='sign-in' className='login__link'>
            Уже зарегестрированы? Войти
          </Link>
        </form>
      </div>
    </section>
  )
}

export default Register
