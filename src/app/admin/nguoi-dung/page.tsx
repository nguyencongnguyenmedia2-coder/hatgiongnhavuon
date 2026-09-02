'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Edit, Trash2, X, Save, RefreshCw, UserCheck } from 'lucide-react';
import { AdminUser, getStoredAdminUsers, saveAdminUserToStore, deleteAdminUserFromStore } from '@/lib/userStore';

export default function AdminUserPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'super_admin' | 'admin' | 'staff'>('staff');
  const [isActive, setIsActive] = useState(true);

  const loadUsers = () => {
    setUsers(getStoredAdminUsers());
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openAddModal = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setPhone('');
    setRole('staff');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone || '');
    setRole(user.role);
    setIsActive(user.is_active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const userData: AdminUser = {
      id: editingUser ? editingUser.id : `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role,
      is_active: isActive,
      created_at: editingUser ? editingUser.created_at : new Date().toISOString(),
    };

    saveAdminUserToStore(userData);
    loadUsers();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn xóa tài khoản "${name}" không?`)) {
      deleteAdminUserFromStore(id);
      loadUsers();
    }
  };

  const toggleActive = (user: AdminUser) => {
    const updated = { ...user, is_active: !user.is_active };
    saveAdminUserToStore(updated);
    loadUsers();
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[11px]">👑 Super Admin</span>;
      case 'admin':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">🛡️ Manager Admin</span>;
      case 'staff':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-[11px]">📦 Nhân Viên Đóng Đơn</span>;
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <span>Quản Lý Người Dùng &amp; Phân Quyền Nhân Viên ({users.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Tạo tài khoản truy cập admin cho chủ shop, nhân viên đóng gói &amp; tư vấn.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadUsers}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-emerald-950 font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tải lại</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>+ Thêm Tài Khoản Nhân Viên</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Tên tài khoản</th>
                <th className="py-3.5 px-4">Email đăng nhập</th>
                <th className="py-3.5 px-4">Số điện thoại</th>
                <th className="py-3.5 px-4">Vai trò (Role)</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-black text-emerald-950">{u.name}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-900">{u.email}</td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono font-semibold">{u.phone || 'Chưa cập nhật'}</td>
                  <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleActive(u)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        u.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {u.is_active ? '🟢 Khả dụng' : '🔴 Tạm khóa'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(u)}
                      className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl font-bold transition-colors"
                      title="Chỉnh sửa tài khoản"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(u.id, u.name)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl font-bold transition-colors"
                      title="Xóa tài khoản"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-4 border border-emerald-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                <span>{editingUser ? 'Chỉnh Sửa Tài Khoản Nhân Viên' : 'Thêm Tài Khoản Nhân Viên Mới'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Họ và tên nhân viên *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Email đăng nhập *</label>
                <input
                  type="email"
                  required
                  placeholder="nhanvien@hatgiongnhavuon.vn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Số điện thoại</label>
                <input
                  type="text"
                  placeholder="0934811307"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Phân quyền (Role)</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold bg-white"
                  >
                    <option value="super_admin">👑 Super Admin</option>
                    <option value="admin">🛡️ Manager Admin</option>
                    <option value="staff">📦 Nhân Viên Đóng Đơn</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Trạng thái tài khoản</label>
                  <select
                    value={isActive ? 'true' : 'false'}
                    onChange={(e) => setIsActive(e.target.value === 'true')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold bg-white"
                  >
                    <option value="true">Hoạt động (Active)</option>
                    <option value="false">Tạm khóa (Disabled)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{editingUser ? 'LƯU THÔNG TIN' : 'TẠO TÀI KHOẢN'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
