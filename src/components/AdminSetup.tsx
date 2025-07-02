
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Shield, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const AdminSetup = () => {
  const [loading, setLoading] = useState(false)
  const [adminCreated, setAdminCreated] = useState(false)
  const { createAdminUser } = useAuth()
  const { toast } = useToast()

  const handleCreateAdmin = async () => {
    setLoading(true)
    try {
      const { error } = await createAdminUser()
      
      if (error) {
        if (error.message.includes('already registered')) {
          setAdminCreated(true)
          toast({
            title: "Admin User Already Exists",
            description: "You can now log in with admin@admin.com",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Error Creating Admin",
            description: error.message,
          })
        }
      } else {
        setAdminCreated(true)
        toast({
          title: "Admin User Created!",
          description: "You can now log in with admin@admin.com / admin123",
        })
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Admin Setup</CardTitle>
        <CardDescription>
          Create your admin credentials to access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {adminCreated ? (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Admin credentials created!</strong><br />
              Email: admin@admin.com<br />
              Password: admin123
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertDescription>
              This will create an admin user with the email <strong>admin@admin.com</strong> and password <strong>admin123</strong>
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleCreateAdmin} 
          className="w-full" 
          disabled={loading || adminCreated}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Admin...
            </>
          ) : adminCreated ? (
            'Admin Created ✓'
          ) : (
            'Create Admin User'
          )}
        </Button>

        <div className="text-center">
          <a 
            href="/admin/login" 
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Go to Admin Login
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminSetup
