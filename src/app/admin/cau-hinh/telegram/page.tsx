'use client';

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, RefreshCw, Save } from 'lucide-react';
import { getStoredSettings, saveSettingsToStore } from '@/lib/settingsStore';

export default function AdminTelegramSettingsPage() {
  const [botToken, setBotToken] = useState('8363856015:AAHaTRy7xtv7CM-EbuJZI6IZxWlhGZLYe80');
  const [chatId, setChatId] = useState('8093505246');
  const [enabled, setEnabled] = useState(true);

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const settings = getStoredSettings();
    if (settings.telegram_bot_token) setBotToken(settings.telegram_bot_token);
    if (settings.telegram_chat_id) setChatId(settings.telegram_chat_id);
  }, []);

  const handleTestConnection = async () => {
    if (!botToken || !chatId) {
      setTestResult({ success: false, message: '🔴 Vui lòng điền đủ Bot Token và Chat ID trước khi test.' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botToken, chatId }),
      });
      const data = await res.json();

      if (data.success) {
        setTestResult({ success: true, message: '🟢 Kết nối thành công! Đã gửi tin nhắn thông báo thử nghiệm tới Telegram của bạn.' });
      } else {
        setTestResult({ success: false, message: `🔴 Kết nối thất bại: ${data.error}` });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi kết nối';
      setTestResult({ success: false, message: `🔴 Kết nối thất bại: ${message}` });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettingsToStore({
      telegram_bot_token: botToken.trim(),
      telegram_chat_id: chatId.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
          <Send className="w-6 h-6 text-sky-600" />
          <span>Cấu Hình Thông Báo Telegram Bot</span>
        </h1>
        <p className="text-xs text-gray-500">
          Mỗi khi khách hàng chốt đơn trên website, Telegram Bot sẽ tự động nhắn tin thông báo chi tiết đơn về máy điện thoại của bạn.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 font-extrabold text-xs shadow-sm border border-emerald-200">
          ✅ Đã lưu thành công cấu hình Telegram Bot vào hệ thống!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-5 text-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="font-extrabold text-emerald-950 text-sm">Trạng Thái Thông Báo Tự Động</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 accent-emerald-700"
            />
            <span className="font-bold text-emerald-900">Bật tự động gửi thông báo Telegram</span>
          </label>
        </div>

        <div>
          <label className="block font-bold text-emerald-950 mb-1">
            TELEGRAM_BOT_TOKEN *
          </label>
          <input
            type="text"
            required
            placeholder="8363856015:AAHaTRy7xtv7CM-EbuJZI6IZxWlhGZLYe80"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono font-bold"
          />
          <p className="text-[10px] text-gray-400 mt-1">Lấy token từ @BotFather trên Telegram.</p>
        </div>

        <div>
          <label className="block font-bold text-emerald-950 mb-1">
            TELEGRAM_CHAT_ID *
          </label>
          <input
            type="text"
            required
            placeholder="8093505246"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono font-bold"
          />
          <p className="text-[10px] text-gray-400 mt-1">Lấy Chat ID nhận đơn từ @userinfobot.</p>
        </div>

        {/* Test connection result alert */}
        {testResult && (
          <div
            className={`p-4 rounded-2xl border text-xs font-bold ${
              testResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {testResult.message}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Đang kiểm tra...' : 'KIỂM TRA KẾT NỐI MÁY CHỦ TELEGRAM'}</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Save className="w-3.5 h-3.5 text-amber-300" />
            <span>LƯU CẤU HÌNH TELEGRAM</span>
          </button>
        </div>
      </form>
    </div>
  );
}
