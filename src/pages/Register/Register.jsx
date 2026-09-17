import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

import './Register.css'

function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError(null)

    if (password.length < 6) {
      setError(
        'Password must be at least 6 characters'
      )

      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      const loginResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const loginData = await loginResponse.json()

      if (!loginResponse.ok) {
        throw new Error(loginData.message)
      }

      login(loginData.token)

      navigate('/')
    } catch (error) {
      console.error(error)

      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            Job Tracker
          </div>

          <h1>Create your account</h1>

          <p>
            Start tracking your job applications
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="register-email">
              Email
            </label>

            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="your@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">
              Password
            </label>

            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="At least 6 characters"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? 'Creating account...'
              : 'Create account'}
          </button>
        </form>

        <div className="auth-footer">
          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Register