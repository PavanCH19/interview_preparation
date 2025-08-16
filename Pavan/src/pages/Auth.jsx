import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 p-4 sm:p-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-center p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <h2 className="text-3xl font-bold text-white">Account</h2>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Form Container */}
          <div>
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {activeTab === 'login'
                ? "Don't have an account?"
                : "Already have an account?"}{' '}
              <button
                onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                className="text-indigo-600 font-semibold hover:underline"
              >
                {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
