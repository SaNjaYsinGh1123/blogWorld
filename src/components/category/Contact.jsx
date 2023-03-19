import React from 'react'
import pic from '../../assets/images/pic-back4.png'
import "./Contact.css"
const About = () => {
  return (
    <div className='container-about'>
        <div className='logopic'>
           <img src={pic} alt='developer'/>
        </div>
        <div>
            <h1>Sanjay Singh</h1>
        </div>
        <a href='https://sanjay-singh.vercel.app/' target="_blank" rel="noopener noreferrer">
           <button className='button-about'>MY Website</button>
        </a>
        
    </div>
  )
}

export default About;
