'use client';

import { useState } from 'react';

export type UserFormData = {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  permanentAddress?: string;
  age?: number;
  birthDate?: string;
  emergencyContactName?: string;
  emergencyContactDetails?: string;
  phoneNumber?: string;
  role: 'RESIDENT' | 'RESCUER' | 'ADMIN';
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
      birthDate: '',
      emergencyContactName: '',
      emergencyContactDetails: '',
      phoneNumber: '',
      role: 'RESIDENT',
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? Number(value) : name === 'role' ? value.toUpperCase() : value,
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
          <label className="flex flex-col">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            <span>First Name</span>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            <span>Middle Name</span>
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            <span>Last Name</span>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            <span>Permanent Address</span>
            <input
              type="text"
              name="permanentAddress"
              placeholder="Permanent Address"
              value={formData.permanentAddress}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            <span>Age</span>
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
          </label>
          <label className="flex flex-col">
            <span>Birth Date</span>
            <input
              type="date"
              name="birthDate"
              placeholder="Birth Date"
              value={formData.birthDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            <span>Emergency Contact Name</span>
            <input
              type="text"
              name="emergencyContactName"
              placeholder="Emergency Contact Name"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </label>
          <label className="flex flex-col">
            <span>Emergency Contact Details</span>
            <input
              type="text"
              name="emergencyContactDetails"
              placeholder="Emergency Contact Details"
              value={formData.emergencyContactDetails}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            <span>Phone Number</span>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            <span>Role</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="RESIDENT">Resident</option>
              <option value="RESCUER">Rescuer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>

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
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
