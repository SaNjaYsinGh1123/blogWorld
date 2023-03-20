import React from "react"
import image from "../../assets/images/input.png"
import "./account.css"
import { useContext,useState,useEffect } from "react"
import  { url }  from "../../assets/data/data"
import {Appstate} from "../../App"
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import {Oval} from 'react-loader-spinner'
const Account = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const userIdObj = JSON.parse(localStorage.getItem('userId'));

  
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState({
    username:'',
    email:''
  }
  );
  let pic;
  if(useAppstate.profilePic === '')
  {
    pic = {image}
  }
  else{
    pic = useAppstate.profilePic;
    console.log('pic',pic);
  }

  // const userObj = JSON.parse(localStorage.getItem('user'));
  // console.log(userObj)
  const [form,setForm] = useState(true);
  const handleImage = (e) =>{
    const file = e.target.files[0];
    setForm({...form ,profilePicture:file});
  }

    const updateUser = async() =>{
      console.log('form',form);
      const formData = new FormData();
      formData.append('username',form.username);
      formData.append('email',form.email);
      formData.append('profilePicture',form.profilePicture);
      formData.append('userId',form.userId);
      
     if(form.username){
        try {
          setLoading(true);
          const result =await fetch(`${url}/auth/${userIdObj}`, {
                  method: 'PUT',
                  body: formData,
                });
                if(result.status === 200){
                  const datajson = await result.json();
                  setLoading(false);
                  useAppstate.setUserId(datajson._id);
                  useAppstate.setUser(datajson.username);
                  useAppstate.setProfilePic(datajson.profilePicture.url);
                  swal({
                    text: 'account is updated',
                    icon: 'success',
                    buttons: false,
                    timer:3000,
                  })
                  navigate('/')
                }
                if(result.status === 401){
                  const message = await result.json();
                  setLoading(false);
                  swal({
                    text: `${message}`,
                    icon: 'error',
                    buttons: false,
                    timer:3000,
                  });
                }   
               
        } catch (error) {
          // console.log(error);
          setLoading(false);
          swal({
            text: {error},
            icon: 'error',
            buttons: false,
            timer:3000,
          });
          
        }
      }else{
        console.log('form.username :',form.username);
    }
      }


  useEffect(() => {

    const userData = async() =>{
        try {
          const result1 =await fetch(`${url}/auth/${userIdObj}`);
           if(result1.status === 200){
             const datajson1 = await result1.json();
              setData(datajson1);
              setLoading(false);
              setForm({
                username: datajson1.username,
                email:datajson1.email,
                userId:userIdObj,
                profilePicture:''
              });
           }


        } catch (error) {
          console.log(error);
        }
      }
    userData();
  }, [])

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
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <input type='file' accept='image/*' alt='img'  onChange={handleImage}/>
                <img src={pic} alt="file-pic" className='image-preview' />
              </div>
            </div>
            <div className='right'>
              <label htmlFor=''>Username</label>
              <input
                name="username"
                type='text'
                placeholder={data.username}
                onChange={(e)=>setForm({...form,username:e.target.value})}
                />
              <label htmlFor=''>Email</label>
              <input
                name="email"
                type='email'
                placeholder={data.email}
                onChange={(e)=>setForm({...form,email:e.target.value})}
                />
                <button className='button'
                onClick={updateUser}>update</button>
            </div>
          </div>
        </div>
      </section>
}
    </>
  )
}

export default Account;
