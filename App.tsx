
import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { SKILLS_DATA } from './constants';

type AppState = 'welcome' | 'quiz' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [userName, setUserName] = useState<string>('');
  const [currentSkillIndex, setCurrentSkillIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<number[][]>(() => 
    Array(SKILLS_DATA.length).fill(0).map(() => Array(10).fill(0))
  );

  const startQuiz = useCallback((name: string) => {
    setUserName(name);
    setAppState('quiz');
  }, []);

  const handleAnswerChange = useCallback((skillIndex: number, questionIndex: number, value: number) => {
    setAnswers(prevAnswers => {
      const newAnswers = prevAnswers.map(skillAnswers => [...skillAnswers]);
      newAnswers[skillIndex][questionIndex] = value;
      return newAnswers;
    });
  }, []);

  const goToNextSkill = useCallback(() => {
    if (currentSkillIndex < SKILLS_DATA.length - 1) {
      setCurrentSkillIndex(prev => prev + 1);
    }
  }, [currentSkillIndex]);

  const goToPreviousSkill = useCallback(() => {
    if (currentSkillIndex > 0) {
      setCurrentSkillIndex(prev => prev - 1);
    }
  }, [currentSkillIndex]);
  
  const finishQuiz = useCallback(() => {
    setAppState('results');
  }, []);
  
  const restartQuiz = useCallback(() => {
    setUserName('');
    setAppState('welcome');
    setCurrentSkillIndex(0);
    setAnswers(Array(SKILLS_DATA.length).fill(0).map(() => Array(10).fill(0)));
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'welcome':
        return <WelcomeScreen onStart={startQuiz} />;
      case 'quiz':
        return (
          <QuizScreen 
            skill={SKILLS_DATA[currentSkillIndex]}
            skillIndex={currentSkillIndex}
            totalSkills={SKILLS_DATA.length}
            answers={answers[currentSkillIndex]}
            onAnswerChange={handleAnswerChange}
            onNext={goToNextSkill}
            onPrevious={goToPreviousSkill}
            onFinish={finishQuiz}
          />
        );
      case 'results':
        return <ResultsScreen userName={userName} answers={answers} skillsData={SKILLS_DATA} onRestart={restartQuiz} />;
      default:
        return <WelcomeScreen onStart={startQuiz} />;
    }
  };
  
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col items-center justify-center p-4 text-slate-800">
      <main className="container mx-auto max-w-4xl w-full">
        {renderContent()}
      </main>
       <footer className="text-center p-4 text-sm text-slate-500 mt-4">
        تطبيق "اختبار المهارات القيادية"
      </footer>
    </div>
  );
};

export default App;
