'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { DEFAULT_SITE_SETTINGS } from '@/lib/demoData';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <nav className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
        <Link href="/" className="hover:underline">Trang chủ</Link> / <span>Liên hệ</span>
      </nav>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="md:col-span-5 bg-emerald-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div>
            <h1 className="text-2xl font-extrabold text-amber-300">Liên Hệ Nhà Vườn</h1>
            <p className="text-xs text-emerald-100 mt-1">{DEFAULT_SITE_SETTINGS.slogan}</p>
          </div>

          <ul className="space-y-4 text-xs">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="text-emerald-300 font-bold block">Địa chỉ shop:</span>
                <span>{DEFAULT_SITE_SETTINGS.address}</span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="text-emerald-300 font-bold block">Hotline tư vấn:</span>
                <a href={`tel:${DEFAULT_SITE_SETTINGS.hotline.replace(/\s+/g, '')}`} className="font-extrabold text-white hover:underline text-sm">
                  {DEFAULT_SITE_SETTINGS.hotline}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="text-emerald-300 font-bold block">Email:</span>
                <span>{DEFAULT_SITE_SETTINGS.email}</span>
              </div>
            </li>
          </ul>

          <div className="pt-4 border-t border-emerald-800 flex items-center gap-3">
            <a
              href={DEFAULT_SITE_SETTINGS.messenger_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Messenger</span>
            </a>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-card">
          <h2 className="font-extrabold text-emerald-950 text-xl mb-4">Gửi Tin Nhắn Cho Chúng Tôi</h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-base">Gửi Yêu Cầu Thành Công!</h3>
              <p className="text-xs text-emerald-800">
                Shop đã nhận được lời nhắn và sẽ liên hệ lại quý khách qua số điện thoại sớm nhất.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Họ tên của bạn *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0901234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Email (Không bắt buộc)</label>
                <input
                  type="email"
                  placeholder="nguyenvana@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Nội dung câu hỏi / tư vấn *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Bạn muốn hỏi về loại hạt giống hay hướng dẫn gieo trồng..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>GỬI LỜI NHẮN</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
