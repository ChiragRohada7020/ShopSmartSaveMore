import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    form: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!value) return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          return "Invalid email address";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Must contain at least one uppercase letter";
        if (!/[0-9]/.test(value)) return "Must contain at least one number";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      username: validateField("username", formData.username),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setErrors((prev) => ({ ...prev, form: "Please fix the errors below" }));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setRegisteredEmail(formData.email);
      setShowOTPModal(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors((prev) => ({ ...prev, email: "Email already registered" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Registration failed. Please try again.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setErrors((prev) => ({
        ...prev,
        form: "Please enter a valid 6-digit OTP",
      }));
      return;
    }

    try {
      const response = await axios.post("auth/verify", {
        email: registeredEmail,
        otp_code: otp,
      });

      navigate("/login", { state: { registrationSuccess: true } });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors((prev) => ({ ...prev, form: "Invalid or expired OTP" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Verification failed. Please try again.",
        }));
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post('auth/resend-otp', {
        email: registeredEmail
      });
      setErrors((prev) => ({ ...prev, form: "New OTP sent to your email" }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: "Failed to resend OTP. Please try again.",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">
              Verify Your Email
            </h2>
            <p className="text-center mb-6">
              We've sent a 6-digit verification code to{" "}
              <span className="font-semibold">{registeredEmail}</span>
            </p>

            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                maxLength="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            {errors.form && (
              <div className="mb-4 text-sm text-red-600 text-center">
                {errors.form}
              </div>
            )}

            <div className="flex flex-col space-y-4">
              <button
                onClick={handleVerifyOTP}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md"
              >
                Verify Account
              </button>

              <button
                onClick={handleResendOTP}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-indigo-100 mt-2">Join our community today</p>
          </div>

          <div className="p-8">
            {errors.form && !showOTPModal && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  <p>Password requirements:</p>
                  <ul className="list-disc list-inside">
                    <li
                      className={
                        formData.password.length >= 8 ? "text-green-500" : ""
                      }
                    >
                      Minimum 8 characters
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(formData.password) ? "text-green-500" : ""
                      }
                    >
                      One uppercase letter
                    </li>
                    <li
                      className={
                        /[0-9]/.test(formData.password) ? "text-green-500" : ""
                      }
                    >
                      One number
                    </li>
                  </ul>
                </div>
              </div>

              {/* Confirm Password field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 px-8 py-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
