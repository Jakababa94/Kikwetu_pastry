import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';

const Auth = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      if (type === 'login') {
        const { email, password } = data;
        await signIn(email, password);
      } else {
        const { email, password, fullName, phone, adminCode } = data;
        await signUp(email, password, fullName, phone, adminCode);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">🥐</span>
            </div>
            <h2 className="text-3xl font-bold text-amber-900">
              {type === 'login' ? 'Welcome Back' : 'Join Kikwetu Pastries'}
            </h2>
            <p className="text-gray-600 mt-2">
              {type === 'login'
                ? 'Sign in to your account'
                : 'Create your account to start ordering'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {type === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register('fullName', { required: 'Full name is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Code (Optional)
                  </label>
                  <input
                    {...register('adminCode')}
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter admin code if registering as admin"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty to register as a customer
                  </p>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {type === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {type === 'login' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : type === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {type === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <Link
                to={type === 'login' ? '/signup' : '/login'}
                className="ml-1 text-amber-600 hover:text-amber-700 font-medium"
              >
                {type === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
