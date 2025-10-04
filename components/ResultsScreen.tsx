
import React from 'react';
import { Skill } from '../types';

interface ResultsScreenProps {
  userName: string;
  answers: number[][];
  skillsData: Skill[];
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ userName, answers, skillsData, onRestart }) => {
  const skillScores = skillsData.map((skill, index) => {
    const score = answers[index].reduce((sum, current) => sum + (current || 0), 0);
    return { title: skill.title, score };
  });

  const totalScore = skillScores.reduce((sum, current) => sum + current.score, 0);
  const maxScore = skillsData.length * 10 * 10;
  
  const getGrade = (score: number, max: number): { grade: string, color: string } => {
      const percentage = (score / max) * 100;
      if (percentage >= 90) return { grade: 'ممتاز', color: 'text-green-600' };
      if (percentage >= 80) return { grade: 'جيد جداً', color: 'text-emerald-600' };
      if (percentage >= 70) return { grade: 'جيد', color: 'text-yellow-600' };
      if (percentage >= 60) return { grade: 'مقبول', color: 'text-orange-600' };
      return { grade: 'ضعيف', color: 'text-red-600' };
  };

  const finalGrade = getGrade(totalScore, maxScore);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 animate-fade-in text-center">
        <h1 className="text-4xl font-black text-blue-600 mb-2">نتائج الاختبار</h1>
        <p className="text-xl text-slate-700 mb-8">مرحباً <span className="font-bold">{userName}</span>، هذه هي نتائج تقييمك.</p>
        
        <div className="mb-8 p-6 bg-slate-50 rounded-lg border">
            <h3 className="text-2xl font-bold">الدرجة النهائية</h3>
            <p className="text-5xl font-extrabold text-blue-600 my-2">{totalScore} <span className="text-3xl text-slate-500">/ {maxScore}</span></p>
            <p className={`text-3xl font-bold ${finalGrade.color}`}>{finalGrade.grade}</p>
        </div>

        <div className="text-right">
            <h3 className="text-2xl font-bold mb-4">تفاصيل الدرجات لكل مهارة:</h3>
            <div className="overflow-x-auto border rounded-lg">
                 <table className="min-w-full bg-white">
                    <thead className="bg-slate-200">
                        <tr>
                            <th className="py-3 px-4 border-b text-right font-bold">المهارة</th>
                            <th className="py-3 px-4 border-b text-center font-bold">الدرجة (من 100)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skillScores.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50 even:bg-slate-100">
                                <td className="py-3 px-4 border-b">{item.title}</td>
                                <td className="py-3 px-4 border-b text-center font-bold text-lg">{item.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <button 
            onClick={onRestart}
            className="mt-10 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
            إعادة الاختبار
        </button>
    </div>
  );
};

export default ResultsScreen;
