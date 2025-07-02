
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import LoginForm from '@/components/LoginForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Login = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleLoginSuccess = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
      <Footer />
    </div>
  )
}

export default Login
