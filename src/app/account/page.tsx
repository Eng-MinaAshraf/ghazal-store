import React, { useState } from 'react';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }
    if (!name) {
      setError('Name is required');
      return;
    }
    setError('');
    alert('Saved');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600 mb-6">Update your account information below.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 mt-4 rounded">Save Settings</button>
        </form>
      </div>
    </div>
  );
}
