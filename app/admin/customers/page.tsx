'use client';

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Mail, User as UserIcon } from 'lucide-react';
import { userService } from '@/lib/services/users';
import { User } from '@/types/api';
import { toast } from 'sonner';

export default function CustomersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        role: 'user',
        discountPercentage: 0,
        password: '',
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to load customers');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingUser) {
                // Remove password if empty during update
                const updateData = { ...userForm };
                if (!updateData.password) delete updateData.password;

                await userService.updateUser(editingUser._id, updateData);
                toast.success('User updated successfully');
            } else {
                if (!userForm.password) {
                    toast.error('Password is required for new users');
                    return;
                }
                await userService.createUser(userForm);
                toast.success('User created successfully');
            }
            setIsDialogOpen(false);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to save user');
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await userService.deleteUser(id);
            toast.success('User deleted');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const openEditUser = (user: User) => {
        setEditingUser(user);
        setUserForm({
            name: user.name,
            email: user.email,
            role: user.role,
            discountPercentage: user.discountPercentage || 0,
            password: '',
        });
        setIsDialogOpen(true);
    };

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white">Customer Management</h1>
                    <p className="text-gray-400">Manage user accounts and company discounts</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-white text-black hover:bg-gray-100" onClick={() => { setEditingUser(null); setUserForm({ name: '', email: '', role: 'user', discountPercentage: 0, password: '' }); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/95 border-white/10 text-white">
                        <DialogHeader>
                            <DialogTitle>{editingUser ? 'Edit User' : 'Create New User'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUserSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    required
                                    value={userForm.name}
                                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    required
                                    type="email"
                                    value={userForm.email}
                                    disabled={!!editingUser}
                                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                    className="bg-white/5 border-white/10"
                                />
                            </div>
                            {!editingUser && (
                                <div className="space-y-2">
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        required
                                        value={userForm.password}
                                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Select
                                        value={userForm.role}
                                        onValueChange={(value) => setUserForm({ ...userForm, role: value })}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black border-white/10 text-white">
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="company">Company</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Discount %</Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={userForm.discountPercentage}
                                        onChange={(e) => setUserForm({ ...userForm, discountPercentage: parseInt(e.target.value) })}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100 mt-4">
                                {editingUser ? 'Update User' : 'Create User'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                    placeholder="Search by name or email..."
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-gray-400">Customer</TableHead>
                            <TableHead className="text-gray-400">Role</TableHead>
                            <TableHead className="text-gray-400 text-center">Discount</TableHead>
                            <TableHead className="text-center text-gray-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-gray-500">Loading customers...</TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-gray-500">No customers found</TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user._id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-bismuth-cyan/20 to-bismuth-purple/20 flex items-center justify-center border border-white/10">
                                                <UserIcon className="h-5 w-5 text-bismuth-cyan" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white">{user.name}</span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Mail className="h-3 w-3" /> {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            user.role === 'admin' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                user.role === 'company' ? 'bg-bismuth-magenta/10 text-bismuth-magenta border-bismuth-magenta/20' :
                                                    'bg-white/5 text-gray-400 border-white/10'
                                        }>
                                            {user.role.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {user.discountPercentage ? (
                                            <span className="text-bismuth-cyan font-bold">-{user.discountPercentage}%</span>
                                        ) : (
                                            <span className="text-gray-600">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditUser(user)}
                                                className="h-8 w-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
