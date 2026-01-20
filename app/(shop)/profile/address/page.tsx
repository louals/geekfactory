'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Home,
  Briefcase,
  Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  isDefault: boolean;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      isDefault: true,
      firstName: 'Alexandria',
      lastName: 'Smith',
      street: '123 Mystical Avenue',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
    },
    {
      id: '2',
      type: 'work',
      isDefault: false,
      firstName: 'Alexandria',
      lastName: 'Smith',
      street: '456 Business Plaza',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'United States',
      phone: '+1 (555) 987-6543',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-bismuth-magenta to-bismuth-cyan flex items-center justify-center">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-white">
                Saved Addresses
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Manage your shipping and billing addresses
              </p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-bismuth-cyan to-bismuth-magenta hover:opacity-90 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/95 border-white/10 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </DialogTitle>
                <DialogDescription className="text-white/60">
                  Fill in the details below to save your address
                </DialogDescription>
              </DialogHeader>
              <AddressForm
                address={editingAddress}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Address Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-all group"
              >
                {/* Default Badge */}
                {address.isDefault && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-bismuth-cyan to-bismuth-magenta border-0 text-white gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      Default
                    </Badge>
                  </div>
                )}

                {/* Address Type Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-bismuth-cyan">
                    {getAddressIcon(address.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white capitalize mb-1">
                      {address.type} Address
                    </h3>
                    <p className="text-white/60 text-sm">
                      {address.firstName} {address.lastName}
                    </p>
                  </div>
                </div>

                {/* Address Details */}
                <div className="space-y-2 text-white/70 text-sm mb-6">
                  <p>{address.street}</p>
                  {address.apartment && <p>{address.apartment}</p>}
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                  <p className="text-bismuth-cyan">{address.phone}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  {!address.isDefault && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSetDefault(address.id)}
                      className="text-white/60 hover:text-white hover:bg-white/10 text-xs"
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(address)}
                    className="text-white/60 hover:text-white hover:bg-white/10 ml-auto"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(address.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {addresses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-lg p-12 backdrop-blur-sm text-center"
          >
            <MapPin className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No addresses saved
            </h3>
            <p className="text-white/60 mb-6">
              Add your first address to speed up checkout
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function AddressForm({
  address,
  onClose,
}: {
  address: Address | null;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(
    address || {
      id: '',
      type: 'home' as const,
      isDefault: false,
      firstName: '',
      lastName: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save logic
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
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
            className="bg-white/5 border-white/10 text-white focus:border-bismuth-cyan"
            required
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
            className="bg-white/5 border-white/10 text-white focus:border-bismuth-cyan"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="street"
          className="text-white/80 text-sm uppercase tracking-wider"
        >
          Street Address
        </Label>
        <Input
          id="street"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          className="bg-white/5 border-white/10 text-white focus:border-bismuth-cyan"
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="apartment"
          className="text-white/80 text-sm uppercase tracking-wider"
        >
          Apartment, Suite, etc. (Optional)
        </Label>
        <Input
          id="apartment"
          value={formData.apartment}
          onChange={(e) =>
            setFormData({ ...formData, apartment: e.target.value })
          }
          className="bg-white/5 border-white/10 text-white focus:border-bismuth-cyan"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="bg-white/5 border-white/10 text-white focus:border-bismuth-cyan"
            required
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="state"
            className="text-white/80 text-sm uppercase tracking-wider"
          >
            State
          </Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            className="bg-white/5 border-white/10 text-white focus:border-bismuth-cyan"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="zipCode"
            className="text-white/80 text-sm uppercase tracking-wider"
          >
            ZIP Code
          </Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
            className="bg-white/5 border-white/10 text-white focus:border-bismuth-cyan"
            required
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-white/80 text-sm uppercase tracking-wider"
          >
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="bg-white/5 border-white/10 text-white focus:border-bismuth-cyan"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="text-white/60 hover:text-white hover:bg-white/5"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-bismuth-cyan to-bismuth-magenta hover:opacity-90 text-white"
        >
          Save Address
        </Button>
      </div>
    </form>
  );
}
