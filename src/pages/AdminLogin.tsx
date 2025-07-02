
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import LoginForm from '@/components/LoginForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Settings } from 'lucide-react'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin')
    } else if (user && !isAdmin) {
      navigate('/')
    }
  }, [user, isAdmin, navigate])

  const handleLoginSuccess = () => {
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg text-center">
              <div className="mx-auto mb-2 p-2 bg-blue-500 rounded-full w-fit">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-semibold">Administrator Access</CardTitle>
              <CardDescription className="text-blue-100">
                Sign in to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <LoginForm onSuccess={handleLoginSuccess} isAdmin={true} />
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Settings className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Need admin credentials?</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/admin/setup')}
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                Set up admin account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLogin
