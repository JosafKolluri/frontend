
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminSetup from '@/components/AdminSetup'

const AdminSetupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AdminSetup />
      </div>
      <Footer />
    </div>
  )
}

export default AdminSetupPage
