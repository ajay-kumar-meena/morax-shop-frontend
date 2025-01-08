import React, { useState, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/slices/auth'; // Ensure the `signUp` action supports FormData
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Default form values
const initialValue = {
  name: '',
  email: '',
  gender: '',
  dob: '',
  password: '',
  photo: null,
};

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to handle form data
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({}); // For validation errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'A valid email is required.';
    if (!formData.gender) newErrors.gender = 'Please select your gender.';
    if (!formData.dob) newErrors.dob = 'Date of birth is required.';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long.';
    if (!formData.photo) newErrors.photo = 'A profile photo is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Prepare FormData
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('gender', formData.gender);
      data.append('dob', formData.dob);
      data.append('password', formData.password);
      if (formData.photo) data.append('photo', formData.photo);

      // Dispatch action
      const response = await dispatch(signUp(data)).unwrap();

      if (response?.success) {
        toast.success('User registered successfully.');
        setFormData(initialValue); // Reset form
        setErrors({});
        navigate('/'); // Redirect after successful registration
      } else {
        toast.error(response?.message || 'Something went wrong with your registration.');
      }
    } catch (error) {
      toast.error(error?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="flex justify-center h-[100vh] items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[500px] h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="absolute mt-2 top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            className={`w-full p-2 border ${errors.photo ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
