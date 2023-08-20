import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
const Navbar = ({ login }) => {

    const { setmodal } = useContext(LoginContext)
    const navigate = useNavigate()
    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (token || login) {
            return [
                <>
                    <Link to={'/profile'}>Profile</Link>
                    <Link to={'/createpost'}>Creat Post</Link>
                    <Link to={'/myfollowingpost'}>My Following Post</Link>
                    <Link to={""}>
                        <button className='logoutbtn'
                            onClick={() => setmodal(true)}
                        > Logout</button>
                    </Link>
                </>
            ]
        }
        else {
            return [
                <>
                    <Link to={'/signup'}>SignUp</Link>
                    <Link to={'/signin'}>SignIn</Link></>
            ]
        }
    }










    return (
        <div className='navbar'>
            <div>
                <img src={logo} alt="Flexogram"
                    onClick={() => {
                        navigate("/")
                    }}
                />
                <h1 onClick={() => {
                    navigate("/")
                }}>Flexogram</h1>
            </div>

            <div className='nav-menu'>

                {
                    loginStatus()
                }
            </div>





        </div>
    )
}

export default Navbar