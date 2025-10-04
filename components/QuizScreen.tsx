
import React, { useMemo } from 'react';
import { Skill } from '../types';

interface QuizScreenProps {
  skill: Skill;
  skillIndex: number;
  totalSkills: number;
  answers: number[];
  onAnswerChange: (skillIndex: number, questionIndex: number, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  skill,
  skillIndex,
  totalSkills,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  onFinish,
}) => {
  const currentTotal = useMemo(() => {
    return answers.reduce((sum, current) => sum + (current || 0), 0);
  }, [answers]);

  const handleInputChange = (questionIndex: number, value: string) => {
    let numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
        numericValue = 0;
    }
    numericValue = Math.max(0, Math.min(10, numericValue));
    onAnswerChange(skillIndex, questionIndex, numericValue);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 animate-fade-in">
      <div className="mb-6 border-b pb-4">
        <p className="text-sm text-slate-500 font-bold">المهارة {skillIndex + 1} من {totalSkills}</p>
        <h2 className="text-3xl font-black text-blue-600 mt-1">{skill.title}</h2>
        <p className="text-slate-600 mt-2 text-justify">{skill.description}</p>
      </div>
      
      <div className="space-y-4">
        {skill.questions.map((question, qIndex) => (
          <div key={qIndex} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-50 rounded-lg border">
            <label htmlFor={`q-${skillIndex}-${qIndex}`} className="flex-1 text-slate-700">
                <span className="font-bold">{qIndex + 1}.</span> {question}
            </label>
            <input
              id={`q-${skillIndex}-${qIndex}`}
              type="number"
              min="0"
              max="10"
              value={answers[qIndex] || ''}
              onChange={(e) => handleInputChange(qIndex, e.target.value)}
              className="w-24 p-2 border-2 border-slate-300 rounded-md text-center font-bold text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0-10"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-bold">
          المجموع: <span className="text-blue-600">{currentTotal} / 100</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onPrevious}
            disabled={skillIndex === 0}
            className="bg-slate-200 text-slate-700 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            السابق
          </button>
          
          {skillIndex < totalSkills - 1 ? (
            <button 
              onClick={onNext}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              التالي
            </button>
          ) : (
            <button 
              onClick={onFinish}
              className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition"
            >
              إنهاء الاختبار
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
