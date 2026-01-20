'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Alexandria',
    lastName: 'Smith',
    email: 'alexandria.smith@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    country: 'United States',
    city: 'New York',
  });

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#141414] flex items-center justify-center">
              <UserCircle className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-white">
                Personal Information
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Manage your account details
              </p>
            </div>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleCancel}
                variant="ghost"
                className="text-white/60 hover:text-white hover:bg-white/5 gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-bismuth-cyan to-bismuth-magenta hover:opacity-90 text-white gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm space-y-8"
        >
          {/* Personal Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-white flex items-center gap-2 pb-4 border-b border-white/10">
              <UserCircle className="w-5 h-5 text-white" />
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-white/80 text-sm uppercase tracking-wider"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-white/5 border-white/10 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-bismuth-cyan"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-white/80 text-sm uppercase tracking-wider"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-white/5 border-white/10 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-bismuth-cyan"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="dateOfBirth"
                  className="text-white/80 text-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-white/5 border-white/10 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-bismuth-cyan"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-white flex items-center gap-2 pb-4 border-b border-white/10">
              <Mail className="w-5 h-5 text-white" />
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-white/80 text-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-white" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-white/5 border-white/10 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-bismuth-cyan"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-white/80 text-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-white" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-white/5 border-white/10 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-bismuth-cyan"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-white flex items-center gap-2 pb-4 border-b border-white/10">
              <MapPin className="w-5 h-5 text-white" />
              Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="country"
                  className="text-white/80 text-sm uppercase tracking-wider"
                >
                  Country
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-white/5 border-white/10 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-bismuth-cyan"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-white/80 text-sm uppercase tracking-wider"
                >
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-white/5 border-white/10 text-white disabled:opacity-60 disabled:cursor-not-allowed focus:border-bismuth-cyan"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Account Security */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
          <h2 className="text-xl font-medium text-white mb-6">
            Account Security
          </h2>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full md:w-auto border-white/10 text-white hover:bg-white/5"
            >
              Change Password
            </Button>
            <p className="text-white/60 text-sm">
              Last password change: December 15, 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
