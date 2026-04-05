import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = isRegister
        ? await api.register({ name, email, password, role })
        : await api.login({ email, password });
      if (!['admin', 'owner'].includes(data.role)) {
        setError('Only admin/owner can access admin dashboard.');
        setLoading(false);
        return;
      }
      setSession(data);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border border-gray-100 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isRegister ? 'Create Admin Credentials' : 'Admin Login'}
        </h1>
        <p className="text-sm text-gray-500 mb-5">
          {isRegister ? 'Create admin/owner account and access dashboard.' : 'Use admin or owner credentials.'}
        </p>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <div className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5"
            required
          />
          {isRegister && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5"
            >
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </select>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 font-medium"
            disabled={loading}
          >
            {loading ? 'Please wait...' : isRegister ? 'Create Credentials' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister((prev) => !prev);
              setError('');
            }}
            className="w-full text-sm text-green-700 hover:text-green-800"
          >
            {isRegister ? 'Already have credentials? Login' : 'No credentials? Create admin account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
