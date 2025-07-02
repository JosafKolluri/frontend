import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Menu, X, User, Phone, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const navigation = [{
    name: 'Home',
    href: '/'
  }, {
    name: 'Services',
    href: '/services'
  },
   {
    name: 'Careers',
    href: '/careers'
  }, {
    name: 'Contact',
    href: '/contact'
  }, ...(isAdmin ? [{
    name: 'Admin',
    href: '/admin'
  }] : [])];
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  return <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Arudhra Logistics</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map(item => <Link key={item.name} to={item.href} className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group">
                {item.name}
                <span className="absolute inset-x-0 -bottom-px h-px bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>)}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
              <Phone className="h-4 w-4 mr-2" />
              Support
            </Button>
            
            {user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <User className="h-4 w-4 mr-2" />
                    {isAdmin ? 'Admin' : 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-sm text-gray-600">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAdmin && <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/login">Admin</Link>
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-lg" asChild>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              </>}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="space-y-4">
              {navigation.map(item => <Link key={item.name} to={item.href} className="block text-gray-700 hover:text-blue-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
              <div className="px-4 pt-4 space-y-3 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Support
                </Button>
                {user ? <div className="space-y-2">
                    <div className="text-sm text-gray-600 px-2">{user.email}</div>
                    {isAdmin && <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/admin">Admin Dashboard</Link>
                      </Button>}
                    <Button size="sm" variant="outline" className="w-full" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div> : <>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/admin/login">Admin Login</Link>
                    </Button>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <Link to="/login">
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                  </>}
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;