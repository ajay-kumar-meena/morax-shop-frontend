import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../../components/admin/DashboardNavbar';
import { useDispatch } from 'react-redux';
import { fetchAllUsers, makeAdmin, deleteUser } from '../../store/slices/admin/AdminUser';  // Assuming you have these actions


function ViewUsers() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  // Fetch users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    dispatch(fetchAllUsers()).then(({ payload }) => {
      if (payload?.success) {
        setUsers(payload.users);
      }
    });
  };

  // Handler to make a user an admin
  const makeAdminHandler = (userId) => {
     dispatch(
        makeAdmin(userId)
     ).then(data =>{
          if(data?.payload?.success){
              toast.success("User made admin successfully");
              loadUsers();
          }
          else{
             toast.error("Something went wrong")
          }
     })
  };

  // Handler to delete a user
  const deleteUserHandler = (userId) => {
    dispatch(
       deleteUser(userId)
    ).then(data => {
        if(data?.payload.success){
            toast.success("User deleted successfully");
            loadUsers();
        } 
        else{
           toast.error("SomeThing went Wrong")
        }
    }); 

  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNavbar />

      <div className="overflow-y-auto max-h-[80vh] w-full px-4">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCart
              key={user._id}
              _id={user._id}
              name={user.name}
              photo={user.photo.url}
              email={user.email}
              role={user.role}
              makeAdminHandler={makeAdminHandler}  
              deleteUserHandler={deleteUserHandler}  
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;

const UserCart = ({ _id, name, photo, email, role, makeAdminHandler, deleteUserHandler }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={photo} alt={name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-center">{name}</h3>
      <p className="text-center text-gray-600">{email}</p>
      <p className={`text-center ${role === 'admin' ? 'text-red-500 font-bold' : 'text-gray-500'}`}>{role}</p>
      
      {/* Always show the delete button */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => deleteUserHandler(_id)}  // Pass userId to deleteUserHandler
          className="bg-red-500 text-white py-1 px-4 rounded-lg"
        >
          Delete User
        </button>

        {/* Conditionally show the "Make Admin" button based on role */}
        {role !== 'admin' && (
          <button
            onClick={() => makeAdminHandler(_id)}  // Pass userId to makeAdminHandler
            className="bg-blue-500 text-white py-1 px-4 rounded-lg"
          >
            Make Admin
          </button>
        )}
      </div>
    </div>
  );
};

