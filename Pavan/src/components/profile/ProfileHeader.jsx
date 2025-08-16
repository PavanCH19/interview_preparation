import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone } from 'lucide-react';

const ProfileHeader = ({ data, isEditing, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            disabled={!isEditing}
            className={!isEditing ? 'bg-gray-50' : ''}
            data-testid="profile-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            disabled={!isEditing}
            className={!isEditing ? 'bg-gray-50' : ''}
            data-testid="profile-email"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            disabled={!isEditing}
            className={!isEditing ? 'bg-gray-50' : ''}
            data-testid="profile-phone"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 