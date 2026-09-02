export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'super_admin' | 'admin' | 'staff';
  is_active: boolean;
  created_at?: string;
}

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'u-1',
    name: 'Chủ Shop Admin',
    email: 'admin@hatgiongnhavuon.vn',
    phone: '0934811307',
    role: 'super_admin',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'u-2',
    name: 'Nhân Viên Đóng Hàng',
    email: 'nhanvien1@hatgiongnhavuon.vn',
    phone: '0901234567',
    role: 'staff',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const STORAGE_KEY = 'hnv_store_users';

export function getStoredAdminUsers(): AdminUser[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: AdminUser[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
  }
  return INITIAL_USERS;
}

export function saveAdminUserToStore(user: AdminUser): void {
  const current = getStoredAdminUsers();
  const existingIdx = current.findIndex((u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());

  let updated: AdminUser[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = user;
  } else {
    updated = [user, ...current];
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}

export function deleteAdminUserFromStore(userId: string): void {
  const current = getStoredAdminUsers();
  const updated = current.filter((u) => u.id !== userId);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
}
