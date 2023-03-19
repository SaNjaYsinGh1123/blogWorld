import React, { useState ,useContext, useEffect} from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
// import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { Appstate } from "../../App"
import { useNavigate } from "react-router-dom"
const User = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }
  const logout =async()=>{
    localStorage.clear();
    await useAppstate.setUserId('');
    await useAppstate.setUser('');
    await useAppstate.setProfilePic('');
    navigate('/')
  }
  // console.log('in user');
  let pic;
  if(useAppstate.profilePic === '')
  {
    pic = 'https://static.thenounproject.com/png/1081856-200.png';
  }
  else{
    pic = useAppstate.profilePic;
  }
  useEffect(()=>{

  },[])
 
  return (
    <>
      <div className='profile'>
        {useAppstate.login? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              {/* <img src='https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' /> */}
              <img src={pic} alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to='/account'>
                  <div className='image'>
                    <div className='img'>
                      <img src={pic} alt='' />
                    </div>
                    <div className='text'>
                      <h3 style={{marginTop:2}}>{useAppstate.user}</h3>
                      {/* <label>Los Angeles, CA</label> */}
                    </div>
                  </div>
                </Link>
                <Link to='/create'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to='/account'>
                  <button className='box'>
                    <IoSettingsOutline className='icon' />
                    <h4>My Account</h4>
                  </button>
                </Link>
                <Link to='/my-posts'>
                <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Posts</h4>
                </button>
                </Link>
                {/* <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button> */}
                <button className='box'>
                  <GrHelp className='icon' />
                  <h4>Help</h4>
                </button>
                <button className='box' onClick={logout}>
                  <BiLogOut className='icon' />
                  <h4>Log Out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}
      </div>
    </>
  )
}

export default User;
