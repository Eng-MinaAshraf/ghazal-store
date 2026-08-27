import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { validateSchema } from '@/lib/validation';

const accountSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Invalid email address'),
});

export default function AccountPage() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const validationResult = validateSchema(accountSchema, formData);

    if (!validationResult.success && validationResult.errors) {
      setErrors(validationResult.errors);
      return;
    }

    // Success simulation
    setErrors({});
    setSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600 mb-6">Update your account information below.</p>
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded" role="alert">
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input 
            id="name"
            name="name"
            label="Name" 
            value={formData.name} 
            onChange={handleChange} 
            error={errors.name}
            aria-invalid={!!errors.name}
          />
          <Input 
            id="email"
            name="email"
            label="Email" 
            type="email"
            value={formData.email} 
            onChange={handleChange} 
            error={errors.email}
            aria-invalid={!!errors.email}
          />
          
          <Button type="submit" className="mt-4">
            Save Settings
          </Button>
        </form>
      </div>
    </div>
  );
}
