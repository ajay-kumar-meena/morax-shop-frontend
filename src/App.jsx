import React,{lazy, useEffect, Suspense} from 'react'
import {BrowserRouter  as Router  ,Routes,Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast'

// import components from the component
import Navbar from  './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userExist, userNotExist } from './store/slices/auth.js';


// import components
import Loader from './components/Loader.jsx'

// import page of usig lazzing loading concepts
const Home = lazy(()=>import('./pages/Home.jsx'));
const Cart = lazy(()=>import('./pages/Cart.jsx'));
const Search = lazy(()=>import('./pages/Search.jsx'));
const Contact = lazy(()=>import('./pages/Contact.jsx'));
const Login  = lazy(()=>import('./pages/auth/Login.jsx'));
const Shipping = lazy(()=> import('./pages/Shipping.jsx'));
const Logout = lazy(()=> import('./pages/Logout.jsx'));
const MyOrders = lazy(()=> import('./pages/MyOrder.jsx'));
const PaymentSuccess = lazy(()=> import('./pages/PaymentSuccess.jsx')); 
const PaymentFailed = lazy(()=> import('./pages/PaymentFailed.jsx')); 
const ProductDetails = lazy(()=> import('./pages/ProductDeatils.jsx')); 
const NotFound = lazy(()=> import('./pages/NotFound.jsx')); 
const Profile = lazy(()=> import('./pages/Profile.jsx')); 
const SignUp = lazy(()=> import('./pages/auth/SignUp.jsx')); 
const AboutUs = lazy(()=> import('./pages/AboutUs.jsx')); 


// admin pages...
const Dashboard = lazy(()=>import('./pages/admin/Dashboard.jsx'));
const AddProduct = lazy(()=>import('./pages/admin/AddProduct.jsx'));
const AddFeatureImage = lazy(()=>import('./pages/admin/AddFeatureImage.jsx'));
const ViewProducts = lazy(()=>import('./pages/admin/ViewProducts.jsx'));
const ViewFeatureImages = lazy(()=>import('./pages/admin/ViewFeatureImages.jsx'));
const ViewUsers = lazy(()=>import('./pages/admin/ViewUsers.jsx'));
const ViewOrders = lazy(()=>import('./pages/admin/ViewOrders.jsx'));





const  App = ()=>{

  const {user,isAuthenticated} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  
  useEffect(()=>{
      const fetchUser = async ()=>{
        try{
          const { data } = await axios.get('http://localhost:3000/api/v1/user/me',{
              headers: {
                  'Content-Type': 'application/json',
              },
               withCredentials: true, 
           })
          dispatch(userExist(data))
          toast.success("fetching user successfully")
        }catch(err){
            userNotExist();
        }
      }
      fetchUser();
  },[])

  return (<>
   <Router>
     <Navbar />
     <Suspense fallback={ <Loader /> }>
      <Routes>

        {/* All user access these rout */}
          <Route path="/"  element={<Home />} />  
          <Route path="/shop"  element={<Home />} />
          <Route path="/search"  element={<Search />} />  
          <Route path="/contact-us"  element={<Contact />} />  
          <Route path="/about-us"  element={<AboutUs /> } />    
          <Route path="/signup"  element={<SignUp />} />  
          <Route path="/product/:productId"  element={<ProductDetails />} />  
          
          


          {/* Authenticated user Route */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/cart"  element={<Cart />} />  
              <Route path="/shipping"  element={<Shipping />} />  
              <Route path="/my-orders"  element={<MyOrders />} />
              <Route path="/profile"  element={<Profile />} />  
              <Route path="/paymentsuccess"  element={<PaymentSuccess />} />  
              <Route path="/paymentfailed"  element={<PaymentFailed />} />      
          </Route>

          

          {/* Admin user Only Route */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user?.role === 'admin' ? true : false} />}>
               <Route path="/admin/dashboard"  element={<Dashboard />} />  
               <Route path="/admin/dashboard/addproduct"  element={<AddProduct /> } />  
               <Route path="/admin/dashboard/addfeatureimages"  element={<AddFeatureImage /> } />  
               <Route path="/admin/dashboard/viewproducts" element={<ViewProducts />} />
               <Route path="/admin/dashboard/viewfeatureimages" element={<ViewFeatureImages />} />
               <Route path="/admin/dashboard/vieworders" element={<ViewOrders />} />
               <Route path="/admin/dashboard/viewusers" element={<ViewUsers />} />
               <Route path="/logout"  element={<Logout />} />  
          </Route>


          {/* Login Route */}
          <Route path="/login"  element=
              {<ProtectedRoute isAuthenticated={!isAuthenticated} redirect={'/'} >
                  <Login />
             </ProtectedRoute>} />
          
          <Route path={"*"} element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-center" />
    </Suspense>
   </Router>
   
   </>)
}
export default App