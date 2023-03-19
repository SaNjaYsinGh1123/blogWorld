import React, { useEffect } from 'react';
import {Routes,Route} from 'react-router-dom';
import  Footer from "./components/footer/Footer"
import Header  from "./components/header/Header"
import  Home  from "./pages/home/Home"
import  Login  from "./pages/login/Login"
import Register  from "./pages/login/Register"
import  DetailsPages  from "./pages/details/DetailsPages"
import  Account  from "./pages/account/Account"
import  Create  from "./components/post/Create"
import  MyPosts  from "./components/blog/MyPosts"
import About from './components/category/About'
import Contact from './components/category/Contact'
import {createContext,useState} from 'react'
const Appstate = createContext();
const App = ()=>{
  const getLocalDataUser=()=>{
    let localDataUser = localStorage.getItem('user');
    if(localDataUser === null ||localDataUser === 'undefined'){
      return '';
    }
    else{
      return  JSON.parse(localDataUser);
    }
  }
  const getLocalDataUserId=()=>{
    let localDataUserId = localStorage.getItem('userId');
    if(localDataUserId === null || localDataUserId ===  'undefined'){
      return '';
    }
    else{
      return JSON.parse(localDataUserId);
    }
  }
  const getLocalDataPic=()=>{
    let localDataPic = localStorage.getItem('Pic');
    if(localDataPic === null || localDataPic === 'undefined'){
      return '';
    }
    else{
      return JSON.parse(localDataPic);
    }
  }
  const [userId,setUserId] = useState(getLocalDataUserId());
  const [user,setUser] = useState(getLocalDataUser());
  const [profilePic,setProfilePic] = useState(getLocalDataPic());
  const [login,setLogin] = useState(false);
  const [catName,setCatName] = useState('');
  // const [userId,setUserId] = useState((JSON.parse(localStorage.getItem('userId'))).userId||'');
  // const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');
  useEffect(()=>{

    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('userId',JSON.stringify(userId));
    localStorage.setItem('Pic',JSON.stringify(profilePic));
    // if(true){
    //   let newUser = localStorage.getItem('user');
    //   console.log('newUser',newUser);
    // }
    // if(true){
    //   let newUserId = localStorage.getItem('userId');  
    //   console.log('newUserId',newUserId);
    // }
    // localStorage.clear();
    if(userId === '')
    {
      setLogin(false);
    }
    else{
      setLogin(true);
    }
    
  },[user,userId,profilePic,login])

  return (
   <Appstate.Provider value={{userId,setUserId,user,setUser,login,setLogin,profilePic,setProfilePic,catName,setCatName}}>
        <div>
            <Header />
        <Routes>
              <Route  path='/' element={<Home/>} />
              <Route  path='/login' element={<Login/>} />
              <Route  path='/register' element={<Register/>} />
              <Route  path='/details/:id' element={<DetailsPages/>} />
              <Route  path='/account' element={<Account/>} />
              <Route  path='/create' element={<Create/>} />
              <Route  path='/my-posts' element={<MyPosts/>} />
              <Route  path='/about' element={<About/>} />
              <Route  path='/contact' element={<Contact/>} />
          </Routes>

            <Footer />
        </div>
   </Appstate.Provider>
  )
}

export {Appstate};

export default App;