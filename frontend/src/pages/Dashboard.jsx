import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Dashboard() {
  const { user, logout, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [resendStatus, setResendStatus] = useState(null);
  const [resending, setResending] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  async function handleResend() {
    setResending(true);
    setResendStatus(null);
    try {
      const message = await resendVerification();
      setResendStatus(message);
    } catch {
      setResendStatus('Could not send verification email. Please try again shortly.');
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="dashboard">
      {!user?.email_verified_at && (
        <div className="verify-banner">
          <p>Please verify your email address.</p>
          <button onClick={handleResend} disabled={resending}>
            {resending ? 'Sending…' : 'Resend verification email'}
          </button>
          {resendStatus && <p className="verify-status">{resendStatus}</p>}
        </div>
      )}

     {user?.email_verified_at && (
      <>
      <h1>Welcome, {user?.name}</h1>
      <p>{user?.email}</p>
      </>
       )}
      {user?.avatar && <img src={user.avatar} alt="avatar" className="avatar" />}
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
