'use client';

import React, { useState, useEffect } from 'react';
import { Save, Info, CheckCircle2 } from 'lucide-react';
import FacebookIcon from '@/components/ui/FacebookIcon';
import { getStoredSettings, saveSettingsToStore } from '@/lib/settingsStore';

export default function AdminFacebookSettingsPage() {
  const [facebookPage, setFacebookPage] = useState('https://www.facebook.com/julymedia1.2/');
  const [messengerUrl, setMessengerUrl] = useState('https://www.facebook.com/julymedia1.2/');
  const [verifyToken, setVerifyToken] = useState('hatgiongnhavuon_secret_2026');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const settings = getStoredSettings();
    if (settings.facebook_page) setFacebookPage(settings.facebook_page);
    if (settings.messenger_url) setMessengerUrl(settings.messenger_url);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettingsToStore({
      facebook_page: facebookPage.trim(),
      messenger_url: messengerUrl.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
          <FacebookIcon className="w-6 h-6 text-blue-600" />
          <span>Cấu Hình Meta Messenger &amp; Fanpage</span>
        </h1>
        <p className="text-xs text-gray-500">
          Cấu hình liên kết Fanpage và nút Chat Messenger tư vấn trực tiếp ngoài Storefront.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 font-extrabold text-xs shadow-sm border border-emerald-200">
          ✅ Đã lưu cấu hình Facebook Messenger thành công!
        </div>
      )}

      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Hướng dẫn cấu hình Messenger:</p>
          <p className="mt-0.5">
            Tất cả các nút <strong>[💬 CHAT VỚI TƯ VẤN MESSENGER]</strong> trên thanh Menu, Di động và Trang Đơn Hàng sẽ tự động mở liên kết Fanpage bạn cấu hình tại đây.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-5 text-xs">
        <div>
          <label className="block font-bold text-emerald-950 mb-1">
            Đường dẫn Fanpage Facebook (Facebook Page URL) *
          </label>
          <input
            type="text"
            required
            placeholder="https://www.facebook.com/julymedia1.2/"
            value={facebookPage}
            onChange={(e) => setFacebookPage(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-bold"
          />
        </div>

        <div>
          <label className="block font-bold text-emerald-950 mb-1">
            Đường dẫn Chat Messenger Trực Tiếp (Messenger URL) *
          </label>
          <input
            type="text"
            required
            placeholder="https://www.facebook.com/julymedia1.2/"
            value={messengerUrl}
            onChange={(e) => setMessengerUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 font-bold"
          />
        </div>

        <div>
          <label className="block font-bold text-emerald-950 mb-1">META_VERIFY_TOKEN (Webhook Callback)</label>
          <input
            type="text"
            value={verifyToken}
            onChange={(e) => setVerifyToken(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono"
          />
        </div>

        <div>
          <label className="block font-bold text-emerald-950 mb-1">Webhook Callback URL:</label>
          <input
            type="text"
            readOnly
            value="https://hatgiongnhavuon.vn/api/messenger/webhook"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 font-mono font-bold text-emerald-900"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <Save className="w-4 h-4 text-white" />
          <span>LƯU CẤU HÌNH MESSENGER</span>
        </button>
      </form>
    </div>
  );
}
