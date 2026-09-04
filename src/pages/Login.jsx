import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import PasswordInput from '../components/auth/PasswordInput';
import AuthButton from '../components/auth/AuthButton';
import AuthDivider from '../components/auth/AuthDivider';
import SocialAuthButton from '../components/auth/SocialAuthButton';
import { loginUser } from '../services/authService';

/**
 * Login Page Component
 * Faithfully matches the Login UI reference design.
 */
export default function Login() {
  const navigate = useNavigate();

  // Form Field States
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  // Validation & Submission States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-level error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (serverError) {
      setServerError(null);
    }
  };

  // Basic Frontend Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Please enter your email or username';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const response = await loginUser({
        emailOrUsername: formData.emailOrUsername.trim(),
        password: formData.password,
      });

      // Handle successful authentication according to future backend contract
      // (e.g. backend token stored if returned)
      if (response && response.token) {
        // Example: localStorage.setItem('token', response.token);
      }

      // Navigate to /home on successful login
      navigate('/home');
    } catch (err) {
      setServerError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social Auth Handlers (for future OAuth integration)
  const handleGoogleLogin = () => {
    // Backend OAuth endpoint will be hooked here
    console.log('Initiating Google OAuth login...');
  };

  const handleGitHubLogin = () => {
    // Backend OAuth endpoint will be hooked here
    console.log('Initiating GitHub OAuth login...');
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue watching amazing videos"
      serverError={serverError}
      onClearServerError={() => setServerError(null)}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email or Username */}
        <AuthInput
          id="login-emailOrUsername"
          name="emailOrUsername"
          label="Email or Username"
          type="text"
          value={formData.emailOrUsername}
          onChange={handleChange}
          placeholder="Enter email or username"
          icon={User}
          error={errors.emailOrUsername}
          autoComplete="username"
          required
          disabled={isSubmitting}
        />

        {/* Password */}
        <div>
          <PasswordInput
            id="login-password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            autoComplete="current-password"
            required
            disabled={isSubmitting}
          />

          {/* Forgot Password Link */}
          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              className="text-xs sm:text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors focus:outline-none focus:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Main Login CTA Button */}
        <div className="pt-2">
          <AuthButton type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Login
          </AuthButton>
        </div>

        {/* Divider */}
        <AuthDivider text="OR" />

        {/* Social Authentication Buttons */}
        <div className="space-y-3">
          <SocialAuthButton
            provider="google"
            label="Continue with Google"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
          />
          <SocialAuthButton
            provider="github"
            label="Continue with GitHub"
            onClick={handleGitHubLogin}
            disabled={isSubmitting}
          />
        </div>

        {/* Bottom Switch to Register Link */}
        <div className="pt-4 text-center">
          <p className="text-xs sm:text-sm text-zinc-400 font-normal">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-purple-400 hover:text-purple-300 transition-colors focus:outline-none focus:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
