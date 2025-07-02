import { useState } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Clock, DollarSign, Users, Truck, Target, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
// import { Footer } from "react-day-picker";

const jobOpenings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / New York",
    type: "Full-time",
    salary: "$120k - $150k",
    description: "Join our engineering team to build next-generation courier tracking solutions.",
    requirements: ["5+ years React/Node.js experience", "Experience with real-time systems", "Database design skills"],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Product Manager - Logistics",
    department: "Product",
    location: "San Francisco",
    type: "Full-time",
    salary: "$110k - $140k",
    description: "Drive product strategy for our courier tracking platform and logistics optimization.",
    requirements: ["3+ years product management", "Logistics industry experience", "Data-driven mindset"],
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Chicago",
    type: "Full-time",
    salary: "$70k - $90k",
    description: "Help our clients maximize value from our courier tracking solutions.",
    requirements: ["Customer-facing experience", "SaaS background preferred", "Excellent communication"],
    posted: "3 days ago"
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $130k",
    description: "Scale our infrastructure to handle millions of package tracking events daily.",
    requirements: ["AWS/Cloud experience", "Docker/Kubernetes", "CI/CD pipelines"],
    posted: "5 days ago"
  },
  {
    id: 5,
    title: "UX/UI Designer",
    department: "Design",
    location: "Los Angeles",
    type: "Full-time",
    salary: "$85k - $110k",
    description: "Design intuitive interfaces for complex logistics workflows.",
    requirements: ["3+ years UI/UX design", "Figma proficiency", "B2B software experience"],
    posted: "1 week ago"
  },
  {
    id: 6,
    title: "Sales Development Representative",
    department: "Sales",
    location: "Austin",
    type: "Full-time",
    salary: "$50k - $70k + Commission",
    description: "Generate qualified leads and build relationships with potential clients.",
    requirements: ["1-2 years sales experience", "CRM proficiency", "Hunter mentality"],
    posted: "4 days ago"
  }
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance plus wellness programs"
  },
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Market-leading salaries with equity options and performance bonuses"
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Remote work options and flexible hours to maintain work-life balance"
  },
  {
    icon: Target,
    title: "Growth Opportunities",
    description: "Learning budget, conference attendance, and clear career advancement paths"
  }
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
    resume: null
  });

  const filteredJobs = filterDepartment === "all" 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department.toLowerCase() === filterDepartment.toLowerCase());

  const departments = [...new Set(jobOpenings.map(job => job.department))];

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll review your application and get back to you soon.",
    });
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
      resume: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Join Our Team 
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Help us revolutionize courier tracking and logistics with cutting-edge technology
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>50+ Team Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span>20K+ Packages Tracked</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <span>20+ Enterprise Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building the future of logistics technology with a team-first culture
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Find your perfect role and grow with us</p>
          </div>

          {/* Filter */}
          <div className="mb-8 flex justify-center">
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-64 bg-white">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Listings */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{job.department}</Badge>
                    <span className="text-sm text-gray-500">{job.posted}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {job.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        View Details & Apply
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                        <DialogDescription className="text-lg">
                          {job.department} • {job.location} • {job.type}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                          <p className="text-gray-600">{job.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Apply for this position</h3>
                          <form onSubmit={handleApplicationSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                  id="name"
                                  value={applicationData.name}
                                  onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={applicationData.email}
                                  onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  value={applicationData.phone}
                                  onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="position">Position</Label>
                                <Input
                                  id="position"
                                  value={job.title}
                                  readOnly
                                  className="bg-gray-50"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="cover">Cover Letter</Label>
                              <Textarea
                                id="cover"
                                placeholder="Tell us why you're interested in this role..."
                                value={applicationData.coverLetter}
                                onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                                className="min-h-32"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="resume">Resume (PDF)</Label>
                              <Input
                                id="resume"
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setApplicationData({...applicationData, resume: e.target.files[0]})}
                              />
                            </div>
                            
                            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              Submit Application
                            </Button>
                          </form>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No positions found in this department.</p>
              <Button 
                onClick={() => setFilterDepartment("all")} 
                variant="outline" 
                className="mt-4"
              >
                Show All Positions
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Culture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in fostering innovation, collaboration, and personal growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Innovation First</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop" 
                  alt="Innovation workspace"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600">
                  We encourage creative thinking and provide the tools to turn ideas into reality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop" 
                  alt="Team collaboration"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600">
                  Cross-functional teams working together to solve complex logistics challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl mb-4">Work-Life Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop" 
                  alt="Remote work setup"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600">
                  Flexible remote work options and unlimited PTO to recharge and stay productive.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't see the perfect role? We're always looking for exceptional talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600">
              View All Positions
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Careers;
