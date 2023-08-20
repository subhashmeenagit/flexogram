import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
const Navbar = ({ login }) => {

    const { setmodal } = useContext(LoginContext)
    const navigate = useNavigate()

    const loginstatusmob = () => {
        const token = localStorage.getItem("jwt");
        if (token || login) {
            return [
                <>
                    <Link to={"/"}><span class="material-symbols-outlined">
                        home
                    </span></Link>
                    <Link to={'/profile'}><span class="material-symbols-outlined">
                        person
                    </span></Link>
                    <Link to={'/createpost'}>
                        <span class="material-symbols-outlined">
                            add_box
                        </span>

                    </Link>
                    <Link to={'/myfollowingpost'}> <span class="material-symbols-outlined">
                        explore
                    </span></Link>
                    <Link to={"/signin"}
                        onClick={() => setmodal(true)}>
                        <span class="material-symbols-outlined"
                        >
                            logout
                        </span>

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

            {/* <img className='logoh' src={logo} alt="Flexogram"
                onClick={() => {
                    navigate("/")
                }}
            /> */}
            <h1 className='logoh' onClick={() => {
                navigate("/")
            }}>Flexogram</h1>
            <div className='nav-menu'>


                <ul className='nav-web'> {loginStatus()}</ul>
                <ul className="nav-mobile"> {loginstatusmob()} </ul>


            </div>





        </div>
    )
}

export default Navbar