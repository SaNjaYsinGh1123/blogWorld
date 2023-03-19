import React, {useState } from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import  { url }  from "../../assets/data/data"
import swal from 'sweetalert'
import {Oval} from 'react-loader-spinner'
import {useNavigate,Link} from 'react-router-dom'


const Register = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    username:'',
    email:'',
    password:'',
    profilePicture:''
  });

  const [conf,setConf] =useState()
  const [loading,setLoading] = useState(false);
  const handleImage= (e)=>{
     const file = e.target.files[0];
     setForm({...form ,profilePicture: file}); 

    //  const reader = new FileReader();
    //  reader.readAsDataURL(file);
    //  reader.onloadend =()=>{
    //    setForm({...form ,profilePicture: reader.result}); 
    //  }
  }
  const send = async(e) =>{
    e.preventDefault();
  
    
    const formData = new FormData();
    formData.append('username',form.username);
    formData.append('email',form.email);
    formData.append('password',form.password);
    formData.append('profilePicture',form.profilePicture);
   
      if(form.password === conf){
        try {
          setLoading(true);
          const result =await fetch(`${url}/auth/register`, {
                  method: 'POST', 
                  body: formData,
                });
              if(result.status === 200){
                await result.json();
                setLoading(false);
                swal({
                  text: 'successfully registered',
                  icon: 'success',
                  buttons: false,
                  timer:3000,
                });
                navigate('/login')
              }        
              
          
        } catch (error) {
          swal({
            text: {error},
            icon: 'error',
            buttons: false,
            timer:3000,
          });
        }
      }else{
        swal({
          text: 'password and confirm password must be same',
          icon: 'error',
          buttons: false,
          timer:3000,
        });
      }
 
    
    //  return fetch(url, {
    //        method: 'post',  
    //        body:form
    //      }).then((res) => res.json()) 
    //      .then((data) => {    
    //           console.log(data);    
    //         })    
    //         .catch((error) => {    
    //           console.error(error);    
    //         });  
        // return fetch(url).then((res) => res.json())    
        //   .then((data) => {    
        //     console.log(data);    
        //   })    
        //   .catch((error) => {    
        //     console.error(error);    
        //   });    
       
    // }else{
    //   console.log(form.password +"is not equal to " + form.confirmPassword );
    // }
    }
  


  return (
    <div>
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
                <h3>Register</h3>
                <h1>My account</h1>
              </div>
            </div>

            <form onSubmit={send}>
              {/* <label htmlFor="email" >email</label> */}
              <span> image *</span>
              <input 
                name="lik"
                type='file' 
                alt='img' 
                onChange={handleImage}
              />  
            
              <span> email address *</span>
              <input 
              name="email"
                type='text' 
                onChange={(e)=>setForm({...form,email:e.target.value})}  
              />
            
            {/* <label htmlFor="username" >username</label> */}
            <span> username *</span>
              <input 
              name="username"
              type='text' 
              onChange={(e)=>setForm({...form,username:e.target.value})}  
              />
              {/* <label htmlFor="password" >password</label> */}
            <span> password *</span>
              <input 
              name="password"
              type='password'
              onChange={(e)=>setForm({...form,password:e.target.value})}  
              />
              {/* <label htmlFor="confirm-password" >confirmPassword</label> */}
              <span>confirm password *</span>
              <input 
              name="confirm-password"
              type='password'
              onChange={(e)=>setConf(e.target.value)}  
              />
              <div className="button-look">
                 <input type="submit" />
              </div>
              {/* <button className='button'
              onClick={send}>Register</button> */}
              <p>Already have an account ? <Link to='/login'>
                   <span>login</span>
                </Link>
            </p> 
            </form>
          </div>
        </section>
}
    </div>
  )
}

export default Register;
