import React from "react"
import logo from "../../assets/images/logo.svg"
// import logo from "../../assets/images/beast.png"
import "./header.css"
import  User  from "./User"
import { nav } from "../../assets/data/data"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { Appstate } from "../../App"
const Header = () => {
  const useAppState = useContext(Appstate);
   window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  }) 
  return (
    <>
      <header className='header'>
        <div className='scontainer flex'>
          <div className='logo'>
            <img src={logo} alt='logo' width='100px' onClick={()=>useAppState.setCatName('')}/>
          </div>
          <nav>
            <ul>
              {nav.map((link) => (
                <li key={link.id}>
                  <Link to={link.url} onClick={()=>useAppState.setCatName('')}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='account flexCenter'>
            <User />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;

