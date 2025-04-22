import LogoutButton from '@/components/LogoutButton';
import { requireAuth } from '@/lib/auth';

export default async function DashboardPage() {
  // Fetch the authenticated user's email
  const userEmail = await requireAuth();

  // Extract the username from the email
  const userName = userEmail.split('@')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Section */}
      {/* Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 10-2 0v1a1 1 0 102 0V4z" clipRule="evenodd" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">ようこそ</h1>
            <h1 className="text-xl font-bold text-gray-800">ダッシュボード</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2 font-medium text-gray-700">{userEmail}</span>
                </div>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* ������ */}
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* ������ */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-5">
                <h2 className="text-xl font-semibold text-white mb-1">
                  ようこそ、{userName}さん
                  ようこそ、{userName}さん
                  <p className="text-blue-100">
                    パーソナライズされたダッシュボードを探索し、アカウントを管理してください。
                    パーソナライズされたダッシュボードを探索し、アカウントを管理してください。
                  </p>
                </h2>
              </div>
            </div>
          </div>

          {/* �÷���ɫ�� */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ���1 */}
            <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6">
              <a>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">機能1</h3>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">機能1</h3>
                <p className="text-gray-600 mb-4">
                  最初の機能の説明がここに入ります。
                </p>
                詳細 &rarr;
              </a>
            </div>

            {/* ���2 */}
            <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">機能2</h3>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">機能2</h3>
              <p className="text-gray-600 mb-4">
                2番目の機能の説明がここに入ります。
              </p>
              詳細 &rarr;
            </div>

            {/* ���3 */}
            <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">機能3</h3>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">機能3</h3>
              <p className="text-gray-600 mb-4">
                3番目の機能の説明がここに入ります。
              </p>
              詳細 &rarr;
            </div>
          </div >
        </main >

        {/* �ÿ� */}
        < footer className="bg-white border-t border-gray-200 mt-12" >
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; 2025 株式会社〇〇. All rights reserved.
              &copy; 2025 株式会社〇〇. 無断複写・転載を禁じます。
            </p>
          </div>
        </footer >
      </div >
    </div>
  );
}