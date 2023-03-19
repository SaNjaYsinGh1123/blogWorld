import React, { useState,useContext } from "react"
import "./details.css"
import "../../components/header/header.css"
import img from "../../assets/images/b5.jpg"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { useParams,useNavigate} from "react-router-dom"
import { useEffect } from "react"
import  { url }  from "../../assets/data/data"
import { Appstate } from "../../App"
import {Oval} from 'react-loader-spinner'
import swal from 'sweetalert';

const DetailsPages = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(true);
  const [loading, setLoading] = useState(true);
  const [updateMode, setUpdateMode] = useState(false);
  const [picurl, setPicUrl] = useState('');
  const useAppstate = useContext(Appstate);
  const UserName = JSON.parse(localStorage.getItem('user'));
  
  // const [delform,setDelForm] = useState({
  //   username: UserName
  // })
  const delform = {
    username: UserName
  }
  const deletePost = async() =>{
    if(useAppstate.login === false){
      navigate('/login');
    }
    else{
      try {
        setLoading(true)
        const result =await fetch(`${url}/post/${id}`, {
                method: 'DELETE', 
                headers:{
                 'Content-Type': 'application/json'
                },
                body:JSON.stringify(delform)
              });
              if(result.status === 200){
                await result.json();
                setLoading(false);
                swal({
                  text: 'blog is deleted',
                  icon: 'success',
                  buttons: false,
                  timer:3000,
                })
                navigate('/');     
              }
      } catch (error) {
        setLoading(false);
        swal({
          text: 'you can delete only your blog ',
          icon: 'error',
          buttons: false,
          timer:3000,
        })
        navigate('/');  
      }
    }
    }

    const userObj = JSON.parse(localStorage.getItem('user'));
    // console.log(userObj)
    const [form,setForm] = useState(true);
    const handleImage = (e) =>{
      const file = e.target.files[0];
      setForm({...form ,image: file});
    }
    
      const updatepost = async(e) =>{
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
            const result =await fetch(`${url}/post/${id}`, {
                    method: 'PUT', 
                    body: formData,
                  });
                  await result.json();
                  setLoading(false);
                  swal({
                    text: 'blog is updated',
                    icon: 'success',
                    buttons: false,
                    timer:3000,
                  })
                  navigate('/');           
          } catch (error) {
            setLoading(false);
                  swal({
                    text: 'you can update only your blog',
                    icon: 'error',
                    buttons: false,
                    timer:3000,
                  })
                  navigate('/');    
          }
        }else{
          swal({
            text: 'you need to login first',
            icon: 'error',
            buttons: false,
            timer:3000,
          })
          navigate('/login');    
      }
        }

  useEffect(() => {
   
    const blogs = async() =>{
     
        try {
          const result =await fetch(`${url}/post/${id}`);
              
           if(result.status === 200){
             const datajson = await result.json();
              setLoading(false);
              setBlog(datajson);
              setPicUrl(datajson.image.url);
              setForm({
                title: datajson.title,
                desc:datajson.desc,
                username:userObj,
                image:'',
                categories:datajson.categories
              });
           }
                 
          
        } catch (error) {
          console.log(error);
        }
      }
    blogs();
  }, [])

  return (
    <>
     {!updateMode  ? (loading ?(<div className='loading'><Oval
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
    
    /></div>):
        <section className='singlePage'>
          <div className='container'>
            <div className='left'>
              <img src={picurl} alt='' />
            </div>
            <div className='right'>
              <div className='buttons'>
                <button className='button'
                  onClick={()=>setUpdateMode(true)}
                >

                    <BsPencilSquare />
                  </button>
               
                <button className='button' onClick={deletePost}>
                  <AiOutlineDelete />
                </button>
              </div>
              <h1>{blog.title}</h1>
              <p>{blog.desc}</p>
              {/* <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?" Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p> */}
              <p>Author: {blog.username}</p>
            </div>
          </div>
        </section>
       ):

       (  
        loading ?(<div className='loading'><Oval
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
      
      /></div>):    
          <section className='newPost'>
            <div className='container boxItems'>
              <div className='img'>
                <img src={picurl} alt='lo' className ='image-preview' />
              </div>
              <form onSubmit={updatepost}>
                <div className='inputfile flexCenter'>
                  <input 
                     name="post"
                     type="file" 
                    //  accept='image/*' 
                     alt='img' 
                     onChange={handleImage}
                     />
                </div>
                <span> title * </span>
                <input 
                    name="title"
                    type='text' 
                    value={form.title} 
                    placeholder={blog.title} 
                    onChange={(e)=>setForm({...form,title:e.target.value})}  
                    />
                
                <span> description *</span>
                <input 
                    name="desc"
                    type='text' 
                    value={form.desc} 
                    placeholder={blog.desc} 
                    onChange={(e)=>setForm({...form,desc:e.target.value})}  
                    />
                <span>categories  *</span>
                <input 
                    name="categories"
                    type='text' 
                    value={form.categories} 
                    placeholder={blog.categories} 
                    onChange={(e)=>setForm({...form,categories:e.target.value})}  
                    />
                <input value='Update'type="submit"/>
    
                </form>
            </div>
          </section>
          )
      }
    </>
  )
}

export default DetailsPages;
