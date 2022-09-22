//racfe
import React from 'react'
import Layout from './Layout';
import { GeneralProvider } from "../context/GeneralContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ViewUsers from '../pages/ViewUsers';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PageNotFound from '../pages/PageNotFound';
import Navbar from '../helpers/Navbar';
import Home from '../pages/Home';
import Groups from '../pages/Groups';
import Items from '../pages/Items';
import WishList from '../pages/WishList';
import Notifications from '../pages/Notifications';
import IsAuth from './IsAuth';
import IsAuth_log from './IsAuth_log';
const Main = () => {
  return (
    <Layout>
      <GeneralProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />

            <Route element={<IsAuth_log/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            </Route>

            <Route element={<IsAuth/>}>
              <Route path='/users' element={<ViewUsers />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/items' element={<Items />} />
              <Route path='/wishlists' element={<WishList />} />
              <Route path='/groups' element={<Groups />} />
              <Route path='/profile/notifications' element={<Notifications />} />
            </Route>

            
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </GeneralProvider >
    </Layout>
  )
}

export default Main