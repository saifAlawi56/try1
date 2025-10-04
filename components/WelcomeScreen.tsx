
import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-4">اختبار المهارات القيادية</h1>
      <p className="text-lg text-slate-600 mb-8">اكتشف قدراتك القيادية وحدد نقاط قوتك ومجالات التطوير.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="الرجاء إدخال اسمك هنا"
          className="w-full max-w-md p-3 border-2 border-slate-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />
        <button 
          type="submit"
          className="w-full max-w-md bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          ابدأ الاختبار
        </button>
      </form>
    </div>
  );
};

export default WelcomeScreen;
