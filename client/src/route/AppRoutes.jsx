import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProtectedRoute from './UserProtectedRoute';
import Home from '../pages/user/Home';

import PartnerProtectedRoute from './PartnerProtectedRoute';
import Reels from '../components/user-components/ReelsComponent';
import MainLayout from '../layout/MainLayout';
import {  User } from 'lucide-react';
import ProfilePage from '../pages/user/ProfilePage';
import CreateOrder from '../pages/user/CreateOrder';
import PreLoginPage from '../pages/user/PreLoginPage';
import OrderHistory from '../pages/user/OrderHistory';
import UserLogin from '../pages/auth/UserLogin';
import UserRegister from '../pages/auth/UserRegister';
import PartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Dashboard from '../pages/partner/Dashboard';
import Menu from '../pages/partner/Menu';
import CreateFoodForm from '../pages/partner/CreateFood';
import LikeFoods from '../pages/user/LikeFoods';
import Restaurants from '../pages/user/Restaurants';
import CartPage from '../pages/user/CartPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/Restaurant" element={<Restaurants />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/like-foods" element={<LikeFoods />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path='/reels' element={<Reels />} />
          <Route path="/create-order" element={<CreateOrder restaurant={"Pizza Heaven"} items={["Pizza"]} />} />
          <Route path="/order" element={<Home />} />
        </Route>
      </Route>
      
      <Route path="/cart" element={<CartPage />} />
      <Route path='/prelogin' element={<PreLoginPage />} /> 
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<PartnerRegister />} />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

      <Route element={<PartnerProtectedRoute />}>
        <Route path="/food-partner/dashboard" element={<Dashboard />} />
        <Route path="/food-partner/menu" element={<Menu/>} />
        <Route path="/food-partner/create-food" element={<CreateFoodForm/>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes