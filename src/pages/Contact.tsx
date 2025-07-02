import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Smile,
  Heart,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your adorable message! 💌");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-rose-100 flex flex-col">
      <Header />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        {/* Decorative Bubble */}
        <div className="absolute w-36 h-36 bg-pink-200 opacity-50 rounded-full -top-12 -left-12 blur-2xl animate-[fade-in_1s_ease-out]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 bg-white/70 rounded-3xl px-6 py-2 mb-4 shadow-sm">
            <Smile className="text-pink-400 animate-bounce w-7 h-7" />
            <span className="font-semibold text-blue-700 text-lg">
              We're Here for You!
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white-900 mb-4 font-playfair tracking-tight drop-shadow-lg">
            Contact&nbsp;
            <span className="bg-white/20 text-white border-white/30">Arudhra Logistics</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
           Have questions about our courier tracking solutions? Need support? We're here to help you succeed.
          </p>
        </div>
        {/* Decorative hearts / sparkles */}
       
      </div>

      {/* Contact Content */}
      <div className="flex-1 py-10 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Illustration and Contact Information */}
          <div className="flex flex-col items-center md:items-start gap-8">
            {/* Illustration */}
            <div className="w-full flex justify-center md:block">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80"
                alt="Friendly support illustration"
                className="w-72 h-72 rounded-2xl shadow-2xl object-cover border-4 border-pink-200 transition-transform hover:scale-105 animate-fade-in"
                draggable={false}
              />
            </div>
            <div className="bg-white/60 rounded-2xl shadow-lg px-6 py-6 w-full">
              <h2 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <Smile className="text-pink-400 w-6 h-6" />
                Get In Touch
              </h2>
              <p className="text-base text-gray-700 mb-6">
                Send us a message or say hello through any channel below. We can’t
                wait to chat with you!
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  <span className="bg-blue-100 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </span>
                  <div>
                    <span className="block text-gray-800 font-medium">
                      +91 9123456789
                    </span>
                    <span className="block text-xs text-gray-500">
                      Toll-free, Mon-Sun
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="bg-green-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                  </span>
                  <div>
                    <span className="block text-gray-800 font-medium">
                      support@arudhra.com
                    </span>
                    <span className="block text-xs text-gray-500">
                      24/7 email support
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="bg-pink-100 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-pink-600" />
                  </span>
                  <div>
                    <span className="block text-gray-800 font-medium">
                      123 Logistics Avenue
                    </span>
                    <span className="block text-xs text-gray-500">
                      Hyderabad, India 10001
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="bg-purple-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </span>
                  <div>
                    <span className="block text-gray-800 font-medium">
                      Mon-Sat: 8AM - 8PM
                    </span>
                    <span className="block text-xs text-gray-500">
                      Sun: 10AM - 8PM
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-4 justify-center">
            <Card className="bg-white/85 shadow-2xl rounded-3xl border-2 border-pink-100 animate-fade-in transition-shadow hover:shadow-pink-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-700 font-extrabold text-3xl">
                  <Mail className="w-7 h-7 text-blue-500 animate-bounce" />
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  We’ll reply within 24 hours and can’t wait to help!
                </p>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  autoComplete="off"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your Name"
                        className="rounded-xl bg-pink-50/50 focus:bg-white transition shadow-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="email@example.com"
                        className="rounded-xl bg-blue-50/50 focus:bg-white transition shadow-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="How can we help you?"
                      className="rounded-xl bg-purple-50/40 focus:bg-white transition shadow-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="We love details! Type your adorable message here..."
                      className="rounded-xl bg-pink-50/40 focus:bg-white min-h-[120px] transition shadow-xs"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-400 to-blue-500 hover:from-pink-500 hover:to-blue-600 text-lg py-4 rounded-2xl shadow-xl hover:shadow-2xl font-bold flex items-center justify-center gap-2 animate-bounce hover:scale-105 transition-all"
                  >
                    <Send className="h-5 w-5 mr-1" />
                    Send Message
                  </Button>
                </form>
                <div className="pt-4 text-center text-pink-500 text-xs opacity-80">
                  We believe in adorable support 🐻💕
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
