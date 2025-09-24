
import React, { useState } from 'react';

interface InitialFormProps {
  onStart: (topic: string, level: string) => void;
  isLoading: boolean;
}

const InitialForm: React.FC<InitialFormProps> = ({ onStart, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Absolute Beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onStart(topic, level);
    }
  };

  const knowledgeLevels = ["Absolute Beginner", "I know the basics", "Intermediate", "Advanced"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
        <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome to Helix AI Tutor</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">What would you like to learn today?</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Topic</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Quantum Computing"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-200"
              required
            />
          </div>
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">My Knowledge Level</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900 dark:text-gray-200"
            >
              {knowledgeLevels.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Starting...' : 'Start Learning'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InitialForm;
