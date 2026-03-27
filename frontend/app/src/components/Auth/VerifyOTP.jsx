import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyOTP = () => {
  const { state } = useLocation();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      // Send both OTP and new password to verify endpoint
      await axios.post('auth/reset-password', {
        otp,
        newPassword  // Added new password to the request
      });
      
      toast.success('Password reset successfully!');
      navigate('/login');  // Redirect to login after successful reset
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <p className="text-center mb-6">Enter the OTP sent to {state?.email} and your new password</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* OTP Field (kept the same) */}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
          </div>

          {/* Added New Password Field */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;