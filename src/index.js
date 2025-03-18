import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes ,Navigate} from 'react-router-dom';
import '../src/App.css';
import Sidebar from './global_component/Sidebar';
import  Home  from '../src/components/Home';
import SliderCrud from './components/SliderCrud';
import'../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Blog from './components/blog';
import AdminLoginForm from './components/admin_login';
import EditBlog from './components/pages/editBlog';
import './css/App.css';
import AdminRegistration from './components/admin_registration';
import EditSlider from './components/pages/editSlider';
import Protectedroutes from './components/Protected';
// import Logout from './components/logout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>

  <BrowserRouter>
  <Routes>
       
       
    <Route path='/admin-registration' element={<AdminRegistration/>}></Route>
    <Route path="/admin-login" element={<AdminLoginForm />} />

       
        <Route path='/'  element={<Protectedroutes Component={Home}></Protectedroutes>}></Route>     
        <Route path="/blog/edit/:id" element={<Protectedroutes Component={EditBlog}> </Protectedroutes>} />
        <Route path="/slider/edit/:id" element={<Protectedroutes Component={EditSlider}> </Protectedroutes>} />
        <Route path='/blog' element={<Protectedroutes  Component={Blog}> </Protectedroutes>}></Route>
        <Route path='/slider' element={<Protectedroutes Component={SliderCrud}> </Protectedroutes>}></Route>
      

    
    {/* <Route path="/admin-logout" element={<Logout />} /> */}
    
  </Routes>
  </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
