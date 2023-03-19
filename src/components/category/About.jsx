import React from 'react'
import "./About.css"
const About = () => {
  return (
    <div className='newPost'>
    <div className='container boxItems'>
        <p className='bold'>Hi, My name is Sanjay Singh </p>
    <div className='container-about-inner'>
        <h5>I created this MERN STACK blog-website.</h5>
        <p>step 1: You need to signup for making blogs</p>
        <p>step 2:Then you need to login by username and password</p>
        <p>step 3:Then click on avator</p>
        <p><h5 className='bold'>features :</h5>
          <ol>
            <li>You can create blog(you need to upload image)</li>
            <li>You can update your blog</li>
            <li>You can delete your blog</li>
            <li>You can change you username,password and avator</li>
          </ol>
          </p>
     </div>
    </div>
    </div>
  )
}

export default About;
