const SESSION_KEY = 'hnv_admin_session_token';
const PASSWORD_KEY = 'hnv_admin_password';
const FAILED_ATTEMPTS_KEY = 'hnv_admin_failed_attempts';
const LOCKOUT_UNTIL_KEY = 'hnv_admin_lockout_until';

const DEFAULT_ADMIN_EMAIL = 'admin@hatgiongnhavuon.vn';
const DEFAULT_ADMIN_PASSWORD = 'admin123@hatgiongnhavuon'; // Secure default password

export interface AuthStatus {
  isAuthenticated: boolean;
  email?: string;
}

export function getStoredAdminPassword(): string {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(PASSWORD_KEY);
      if (stored) return stored;
    } catch {
      // Fallback
    }
  }
  return DEFAULT_ADMIN_PASSWORD;
}

export function changeAdminPassword(newPassword: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PASSWORD_KEY, newPassword);
    } catch {
      // Ignore
    }
  }
}

export function checkLockoutStatus(): { isLocked: boolean; remainingMinutes: number } {
  if (typeof window !== 'undefined') {
    try {
      const lockoutUntil = localStorage.getItem(LOCKOUT_UNTIL_KEY);
      if (lockoutUntil) {
        const untilTime = parseInt(lockoutUntil, 10);
        const now = Date.now();
        if (now < untilTime) {
          const remainingMinutes = Math.ceil((untilTime - now) / (1000 * 60));
          return { isLocked: true, remainingMinutes };
        } else {
          // Lockout expired
          localStorage.removeItem(LOCKOUT_UNTIL_KEY);
          localStorage.setItem(FAILED_ATTEMPTS_KEY, '0');
        }
      }
    } catch {
      // Ignore
    }
  }
  return { isLocked: false, remainingMinutes: 0 };
}

export function recordFailedAttempt(): { failedCount: number; isLocked: boolean; remainingMinutes: number } {
  if (typeof window !== 'undefined') {
    try {
      const currentFailed = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10) + 1;
      localStorage.setItem(FAILED_ATTEMPTS_KEY, currentFailed.toString());

      if (currentFailed >= 5) {
        // Lockout for 15 minutes to prevent brute-force hacking
        const lockoutTime = Date.now() + 15 * 60 * 1000;
        localStorage.setItem(LOCKOUT_UNTIL_KEY, lockoutTime.toString());
        return { failedCount: currentFailed, isLocked: true, remainingMinutes: 15 };
      }
      return { failedCount: currentFailed, isLocked: false, remainingMinutes: 0 };
    } catch {
      // Ignore
    }
  }
  return { failedCount: 1, isLocked: false, remainingMinutes: 0 };
}

export function resetFailedAttempts(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(FAILED_ATTEMPTS_KEY, '0');
      localStorage.removeItem(LOCKOUT_UNTIL_KEY);
    } catch {
      // Ignore
    }
  }
}

export function loginAdmin(emailInput: string, passwordInput: string): { success: boolean; errorMsg?: string } {
  const lockout = checkLockoutStatus();
  if (lockout.isLocked) {
    return {
      success: false,
      errorMsg: `⛔ Tài khoản bị khóa do gõ sai quá 5 lần. Vui lòng thử lại sau ${lockout.remainingMinutes} phút!`,
    };
  }

  const storedPassword = getStoredAdminPassword();
  const validEmail = DEFAULT_ADMIN_EMAIL.toLowerCase();

  if (emailInput.trim().toLowerCase() === validEmail && passwordInput === storedPassword) {
    resetFailedAttempts();
    if (typeof window !== 'undefined') {
      try {
        const sessionToken = `hnv_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
        sessionStorage.setItem(SESSION_KEY, sessionToken);
        localStorage.setItem(SESSION_KEY, sessionToken);
      } catch {
        // Ignore
      }
    }
    return { success: true };
  }

  const attemptResult = recordFailedAttempt();
  if (attemptResult.isLocked) {
    return {
      success: false,
      errorMsg: `⛔ Đã sai mật khẩu 5 lần! Hệ thống tự động khóa đăng nhập 15 phút để chống tấn công dò mật khẩu.`,
    };
  }

  return {
    success: false,
    errorMsg: `❌ Mật khẩu hoặc Email không chính xác (Đã gõ sai ${attemptResult.failedCount}/5 lần).`,
  };
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore
    }
  }
}

export function isSessionValid(): boolean {
  if (typeof window !== 'undefined') {
    try {
      const sessionToken = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      return Boolean(sessionToken && sessionToken.startsWith('hnv_token_'));
    } catch {
      return false;
    }
  }
  return false;
}
