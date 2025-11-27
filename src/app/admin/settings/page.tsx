'use client';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/app/universal-components/protected-route';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return;
    const payload = parseJwt(token);
    if (!payload?.sub) return;
    const userId = payload.sub;
    const query = `query { getUser(id: "${userId}") { id email firstName middleName lastName permanentAddress age birthDate emergencyContactName emergencyContactDetails phoneNumber role } }`;
    fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.data?.getUser);
        setPhone(data.data?.getUser?.phoneNumber || '');
        setLoading(false);
      });
  }, []);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e: any) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const mutation = `mutation UpdateUser($input: UpdateUserInput!) { updateUser(input: $input) { id } }`;
    const variables = { input: { ...user } };
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    });
    const data = await res.json();
    setSaving(false);
    setMessage(data.errors ? 'Failed to update settings.' : 'Settings updated!');
  };
  const handlePasswordSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const payload = parseJwt(token || '');
    const userId = payload?.sub;
    const mutation = `mutation ChangePassword($userId: ID!, $oldPassword: String!, $newPassword: String!) { changePassword(userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword) }`;
    const variables = { userId, oldPassword: passwords.oldPassword, newPassword: passwords.newPassword };
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    });
    const data = await res.json();
    setSaving(false);
    setMessage(data.errors ? 'Failed to change password.' : 'Password changed!');
  };
  const handlePhoneSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const payload = parseJwt(token || '');
    const userId = payload?.sub;
    const mutation = `mutation UpdateUserPhoneNumber($userId: ID!, $phoneNumber: String!) { updateUserPhoneNumber(userId: $userId, phoneNumber: $phoneNumber) }`;
    const variables = { userId, phoneNumber: phone };
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables }),
    });
    const data = await res.json();
    setSaving(false);
    setMessage(data.errors ? 'Failed to update phone number.' : 'Phone number updated!');
  };

  if (loading || !user) return <div className='flex justify-center items-center h-64'>Loading settings...</div>;

  return (
    <ProtectedRoute roles={['ADMIN', 'RESIDENT', 'RESCUER']}>
      <div className='p-4 max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Account Settings</h1>
        {message && <div className={`mb-4 text-center rounded p-2 ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}
        <div className='bg-white rounded-lg shadow p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4 text-blue-700'>Profile Information</h2>
          <form onSubmit={handleSave} className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <label>Email<input name='email' value={user.email} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>First Name<input name='firstName' value={user.firstName} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Middle Name<input name='middleName' value={user.middleName} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Last Name<input name='lastName' value={user.lastName} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Permanent Address<input name='permanentAddress' value={user.permanentAddress} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Age<input name='age' type='number' value={user.age} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Birth Date<input name='birthDate' type='date' value={user.birthDate} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Emergency Contact Name<input name='emergencyContactName' value={user.emergencyContactName} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Emergency Contact Details<input name='emergencyContactDetails' value={user.emergencyContactDetails} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Phone Number<input name='phoneNumber' value={user.phoneNumber} onChange={handleChange} className='border p-2 rounded w-full' /></label>
              <label>Role<input name='role' value={user.role} onChange={handleChange} className='border p-2 rounded w-full' /></label>
            </div>
            <button type='submit' disabled={saving} className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4 disabled:opacity-50'>
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>
        <div className='bg-white rounded-lg shadow p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4 text-blue-700'>Change Password</h2>
          <form onSubmit={handlePasswordSave} className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <label>Old Password<input name='oldPassword' type='password' value={passwords.oldPassword} onChange={handlePasswordChange} className='border p-2 rounded w-full' /></label>
              <label>New Password<input name='newPassword' type='password' value={passwords.newPassword} onChange={handlePasswordChange} className='border p-2 rounded w-full' /></label>
            </div>
            <button type='submit' disabled={saving} className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4 disabled:opacity-50'>
              {saving ? 'Saving...' : 'Change Password'}
            </button>
          </form>
        </div>
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold mb-4 text-blue-700'>Update Phone Number</h2>
          <form onSubmit={handlePhoneSave} className='flex flex-col gap-4'>
            <label>Phone Number<input name='phoneNumber' value={phone} onChange={e => setPhone(e.target.value)} className='border p-2 rounded w-full' /></label>
            <button type='submit' disabled={saving} className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4 disabled:opacity-50'>
              {saving ? 'Saving...' : 'Update Phone'}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
