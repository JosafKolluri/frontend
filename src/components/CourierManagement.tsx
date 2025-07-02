
import { useState } from 'react';
import { Users, MapPin, Phone, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const CourierManagement = () => {
  const [couriers] = useState([
    {
      id: 'C001',
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      area: 'North Delhi',
      status: 'active',
      rating: 4.8,
      deliveries: 245,
      vehicleType: 'Bike'
    },
    {
      id: 'C002',
      name: 'Priya Sharma',
      phone: '+91 9876543211',
      area: 'South Mumbai',
      status: 'active',
      rating: 4.9,
      deliveries: 189,
      vehicleType: 'Car'
    },
    {
      id: 'C003',
      name: 'Amit Singh',
      phone: '+91 9876543212',
      area: 'Central Bangalore',
      status: 'offline',
      rating: 4.6,
      deliveries: 167,
      vehicleType: 'Bike'
    },
    {
      id: 'C004',
      name: 'Neha Patel',
      phone: '+91 9876543213',
      area: 'West Chennai',
      status: 'busy',
      rating: 4.7,
      deliveries: 203,
      vehicleType: 'Van'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Available';
      case 'busy': return 'On Delivery';
      case 'offline': return 'Offline';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courier Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Courier
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Couriers</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On Delivery</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-blue-600">4.8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex space-x-4">
        <Input placeholder="Search couriers..." className="flex-1" />
        <Button variant="outline">Search</Button>
      </div>

      {/* Couriers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Couriers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Courier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Deliveries</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {couriers.map((courier) => (
                <TableRow key={courier.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{courier.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{courier.name}</p>
                        <p className="text-sm text-gray-500">{courier.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {courier.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {courier.area}
                    </div>
                  </TableCell>
                  <TableCell>{courier.vehicleType}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(courier.status)}>
                      {getStatusText(courier.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {courier.rating}
                    </div>
                  </TableCell>
                  <TableCell>{courier.deliveries}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourierManagement;
