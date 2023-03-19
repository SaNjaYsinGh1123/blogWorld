import React from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import  { url }  from "../../assets/data/data"
import { useContext,useState } from "react"
import {Appstate} from "../../App"
import {useNavigate,Link} from 'react-router-dom'
import swal from 'sweetalert';
import {Oval} from 'react-loader-spinner'

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form,setForm] = useState({
    username:'',
    password:'',
  });
  const [loading,setLoading] = useState(false);
  const send = async() =>{
    // console.log('hi');
      try {
        setLoading(true);
        const result =await fetch(`${url}/auth/login`, {
                method: 'POST', 
                headers:{
                 'Content-Type': 'application/json'
                },
                body:JSON.stringify(form)
              });
              if(result.status === 200){
                const datajson = await result.json();
                setLoading(false);
                useAppstate.setUserId(datajson._id);
                console.log(datajson.username);
                console.log(datajson._id);
                useAppstate.setUser(datajson.username);
                useAppstate.setProfilePic(datajson.profilePicture.url);
                swal({
                  text: 'successfully login',
                  icon: 'success',
                  buttons: false,
                  timer:3000,
                })
                navigate('/');
              }
          
      } catch (error) {
        setLoading(false);
        swal({
          text: "username or password is wrong",
          icon: 'error',
          buttons: false,
          timer:3000,
        });
        // console.log(error);
      }
    }
  return (
    <>
    {
     loading ?<div className='loading'><Oval
     height={40}
     width={40}
     color='black'
     wrapperStyle={{}}
     wrapperClass=""
     visible={true}
     ariaLabel='oval-loading'
     secondaryColor="black"
     strokeWidth={4}
     strokeWidthSecondary={4}
   
   /></div>:
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>
          <div className="form">
              <span> username *</span>
                <input 
                name="username"
                type='text' 
                onChange={(e)=>setForm({...form,username:e.target.value})}  
                />
              <span> password *</span>
                <input 
                name="password"
                type='password'
                onChange={(e)=>setForm({...form,password:e.target.value})}  
                />
              
                <button className='button'
                onClick={send}>Login</button>
                 <p className="register-option">Don't have account ? <Link to='/register'>
                   <span>Sign Up</span>
                </Link>
            </p> 
          </div>
        </div>
      </section>
}
    </>
  )
}

export default Login;
