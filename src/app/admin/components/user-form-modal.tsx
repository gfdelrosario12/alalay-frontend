'use client';

import { useState } from 'react';

export type UserFormData = {
  id?: number;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  permanentAddress: string;
  age: number;
  birthdate: string;
  emergencyContact: string;
  role: string;
  createdAt?: string; // Do not edit in form
};

type UserFormModalProps = {
  initialData?: UserFormData;
  mode: 'add' | 'edit';
  onSubmit: (data: UserFormData) => void;
  onDelete?: () => void;
  onCancel: () => void;
};

export default function UserFormModal({
  initialData,
  mode,
  onSubmit,
  onDelete,
  onCancel,
}: UserFormModalProps) {
  const [formData, setFormData] = useState<UserFormData>(
    initialData ?? {
      email: '',
      firstName: '',
      middleName: '',
      lastName: '',
      permanentAddress: '',
      age: 0,
      birthdate: '',
      emergencyContact: '',
      role: '',
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? Number(value) : value, // convert age to number
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {mode === 'add' ? 'Add User' : 'Edit User'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="permanentAddress"
            placeholder="Permanent Address"
            value={formData.permanentAddress}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border p-2 rounded"
            required
            min={0}
          />
          <input
            type="date"
            name="birthdate"
            placeholder="Birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="resident">Resident</option>
            <option value="rescuer">Rescuer</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <div className="flex gap-2">
              {mode === 'edit' && onDelete && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {mode === 'add' ? 'Add' : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
