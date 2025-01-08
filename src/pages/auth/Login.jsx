import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import { userExist, userNotExist } from '../../store/slices/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();


    // Prepare the credentials to send
    const body = {
      email: email,
      password: password,
    };
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', 
        body, 
        {
            headers: {
                'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });

      if (response.status === 200) {
        dispatch(userExist(response.data))
        toast.success(response.data.message);
      }
    } catch (err) {
      dispatch(userNotExist());
      toast.error('Login failed. Please check your credentials.');
     
    }
  };
  const {user} = useSelector(state=>state.auth)
  useEffect(() => {
    

  }, [user]);  


  return (<>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </>);
};

export default Login;
