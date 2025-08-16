
import { Eye, EyeOff, Mail, Lock, User, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useAuth } from '@/contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '@/schemas/authSchemas';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  const handleSubmit = async (values) => {
    try {
      setError('');
      await register(values.fullName, values.email, values.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1.5">Create account</h2>
        <p className="text-gray-600">Join us to start your interview preparation</p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => {
          const passwordsMatch = values.password && values.confirmPassword && values.password === values.confirmPassword;
          const passwordsDontMatch = values.confirmPassword && values.password !== values.confirmPassword;

          return (
            <Form className="space-y-2">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative mt-1">
                  <Field
                    as={Input}
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 ${touched.fullName && errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                  <User className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <ErrorMessage name="fullName" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="relative mt-1">
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 ${touched.email && errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                  <Mail className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 pr-10 ${touched.password && errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Create a password"
                    disabled={isLoading}
                  />
                  <Lock className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {values.password && (
                  <PasswordStrengthMeter password={values.password} className="mt-2" />
                )}
                <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative mt-1">
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 pr-10 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : passwordsMatch ? 'border-green-300 focus:border-green-500 focus:ring-green-500' : ''}`}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <Lock className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {passwordsMatch && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    {passwordsDontMatch && (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-600" />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={values.acceptTerms}
                  onCheckedChange={(checked) => setFieldValue('acceptTerms', checked === true)}
                  className={touched.acceptTerms && errors.acceptTerms ? 'border-red-300' : ''}
                  disabled={isLoading}
                />
                <div className="flex-1">
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700 leading-5">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 hover:underline">
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                  <ErrorMessage name="acceptTerms" component="p" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterForm;
