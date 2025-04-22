'use client';

import { logoutAction } from '@/actions/auth';
import { useState } from 'react';

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    try {
      await logoutAction();
    } catch (error) {
      console.error('ログアウトエラー:', error);
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 text-white rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          ログアウト中...
        </div>
      ) : (
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9.707 1.293L11 5.586V7h1.5a.5.5 0 010 1h-8a.5.5 0 010-1H6V4.5A.5.5 0 016.5 4h3.293l1.207-1.207a2 2 0 012.914 0L16.5 5.5V17a2 2 0 01-2 2h-9a2 2 0 01-2-2V4a2 2 0 012-2h6.5a2 2 0 011.5.5z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M10 9.293l1.146-1.147a.5.5 0 01.708.708L10.707 10l1.147 1.146a.5.5 0 01-.708.708L10 10.707l-1.146 1.147a.5.5 0 01-.708-.708L9.293 10 8.146 8.854a.5.5 0 11.708-.708L10 9.293z" clipRule="evenodd" />
          </svg>
          ログアウト
        </div>
      )}
    </button>
  );
}
