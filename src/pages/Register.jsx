import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, AtSign, Mail } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import PasswordInput from '../components/auth/PasswordInput';
import AuthButton from '../components/auth/AuthButton';
import AuthDivider from '../components/auth/AuthDivider';
import SocialAuthButton from '../components/auth/SocialAuthButton';
import { registerUser } from '../services/authService';

/**
 * Register Page Component
 * Faithfully matches the Register UI reference design.
 */
export default function Register() {
  const navigate = useNavigate();

  // Form Field States
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  // Validation & Submission States
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
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

  // Frontend Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    setServerSuccess(null);

    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      await registerUser({
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        agreeToTerms: formData.agreeToTerms,
      });

      setServerSuccess('Account created successfully! Redirecting to login...');
      
      // Smooth redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social Auth Handlers
  const handleGoogleSignup = () => {
    console.log('Initiating Google OAuth registration...');
  };

  const handleGitHubSignup = () => {
    console.log('Initiating GitHub OAuth registration...');
  };

  return (
    <AuthLayout
      title="Create Account ✨"
      subtitle="Join us and start watching amazing videos"
      serverError={serverError}
      serverSuccess={serverSuccess}
      onClearServerError={() => setServerError(null)}
      onClearServerSuccess={() => setServerSuccess(null)}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <AuthInput
          id="register-fullName"
          name="fullName"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          icon={User}
          error={errors.fullName}
          autoComplete="name"
          required
          disabled={isSubmitting}
        />

        {/* Username */}
        <AuthInput
          id="register-username"
          name="username"
          label="Username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a username"
          icon={AtSign}
          error={errors.username}
          autoComplete="username"
          required
          disabled={isSubmitting}
        />

        {/* Email */}
        <AuthInput
          id="register-email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          icon={Mail}
          error={errors.email}
          autoComplete="email"
          required
          disabled={isSubmitting}
        />

        {/* Password */}
        <PasswordInput
          id="register-password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
          autoComplete="new-password"
          required
          disabled={isSubmitting}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="register-confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          autoComplete="new-password"
          required
          disabled={isSubmitting}
        />

        {/* Terms of Service Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-4 h-4 rounded-[4px] bg-[#121020] border border-zinc-700 checked:bg-purple-600 checked:border-purple-600 focus:ring-1 focus:ring-purple-500 focus:ring-offset-0 focus:outline-none transition-all cursor-pointer accent-purple-600"
              />
            </div>
            <span className="text-xs sm:text-[13px] text-zinc-400 font-normal leading-tight">
              I agree to the{' '}
              <Link
                to="/terms"
                className="text-purple-400 hover:text-purple-300 transition-colors underline focus:outline-none"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="text-purple-400 hover:text-purple-300 transition-colors underline focus:outline-none"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-xs text-rose-400 mt-1 pl-6">{errors.agreeToTerms}</p>
          )}
        </div>

        {/* Main Create Account CTA Button */}
        <div className="pt-2">
          <AuthButton type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Create Account
          </AuthButton>
        </div>

        {/* Divider */}
        <AuthDivider text="OR" />

        {/* Social Authentication Buttons */}
        <div className="space-y-3">
          <SocialAuthButton
            provider="google"
            label="Sign up with Google"
            onClick={handleGoogleSignup}
            disabled={isSubmitting}
          />
          <SocialAuthButton
            provider="github"
            label="Sign up with GitHub"
            onClick={handleGitHubSignup}
            disabled={isSubmitting}
          />
        </div>

        {/* Bottom Switch to Login Link */}
        <div className="pt-4 text-center">
          <p className="text-xs sm:text-sm text-zinc-400 font-normal">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-purple-400 hover:text-purple-300 transition-colors focus:outline-none focus:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
