import React, {useState} from "react"
import "./create.css"
// import { IoIosAddCircleOutline } from "react-icons/io"
import  { url }  from "../../assets/data/data"
// import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import swal from 'sweetalert'
const Create = () => {
  const userObj = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [form,setForm] = useState({
    title:'',
    desc:'',
    username:userObj,
    image:'',
    categories:''
  });
const handleImage = (e) =>{
  const file = e.target.files[0];
  setForm({...form ,image: file});
}

  const send = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('title',form.title);
    formData.append('desc',form.desc);
    formData.append('username',form.username);
    formData.append('image',form.image);
    formData.append('categories',form.categories);

    if(form.username !== ''){
      try {
        setLoading(true);
        const result =await fetch(`${url}/post/create`, {
                method: 'POST',
                body: formData,
              });
              await result.json();
              swal({
                text: 'post is created',
                icon: 'success',
                buttons: false,
                timer:3000,
              });
              setLoading(false);
              navigate('/')
      } catch (error) {
        swal({
          text: {error},
          icon: 'error',
          buttons: false,
          timer:3000,
        })
      }
    }else{
      // console.log('form.username :',form.username);
      swal({
        text: 'you need to login first',
        icon: 'error',
        buttons: false,
        timer:3000,
      })
      navigate('/login');
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
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='img'>
            <img src='https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='lo' className ='image-preview' />
          </div>
          <form onSubmit={send}>
            <div className='inputfile flexCenter'>
              <input
                 name="post"
                 type="file"
                //  accept='image/*'
                 required
                 alt='img'
                 onChange={handleImage}
                 />
            </div>
            <span> title * </span>
            <input
                name="title"
                type='text'
                required
                onChange={(e)=>setForm({...form,title:e.target.value})}
                />

            <span> description *</span>
            <input
                name="desc"
                type='text'
                required
                onChange={(e)=>setForm({...form,desc:e.target.value})}
                />
            <span>categories  *</span>
            <input
                name="categories"
                type='text'
                required
                onChange={(e)=>setForm({...form,categories:e.target.value})}
                />
            <div className="button-look">
              <input type="submit" value='create'/>
            </div>

            </form>
        </div>
      </section>
}
    </>
  )
}
export default Create;

