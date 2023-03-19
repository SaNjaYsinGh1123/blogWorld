import React, {useContext,useEffect,useState}from "react"
import "./blog.css"
// import { imgsrc } from "../../assets/data/data"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from "react-router-dom"
import  { url }  from "../../assets/data/data"
import {Oval} from 'react-loader-spinner'
import {Appstate} from "../../App";

const MyPosts = () => {
  const useAppstate = useContext(Appstate);
  const [blog,setBlog] = useState([]);   
  const [loading,setLoading] =useState(true);     
  useEffect(()=>{
    console.log('in posts')
    console.log('search id', useAppstate.user);
    const blogs = async() =>{
      console.log('hi');
        try {
          const result =await fetch(`${url}/post?username=${useAppstate.user}`);
  
                const datajson = await result.json();
                console.log(datajson);
                setBlog(datajson);
                setLoading(false);
          
        } catch (error) {
          console.log(error);
        }
      }
   blogs();
  },[])
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
      <section className='blog'>
        <div className='container grid3'>
           {blog.map((item,i) => (
            <div className='box boxItems' key={i}>
              <div className='img'>
                <img src={item.image.url} alt='' />
              </div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  <a href='/'>#{item.categories}</a>
                </div>
                <Link to={`/details/${item._id}`} className='link'>
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.desc.slice(0, 180)}...</p>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{item.date}</label>
                  <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
                  <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
                </div>
              </div>
            </div>
          ))} 
        </div>
      </section>
}
    </div>
  )
}

export default MyPosts;


