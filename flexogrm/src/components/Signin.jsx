import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { LoginContext } from '../context/LoginContext';
const Signin = () => {

    const { setuserLogin } = useContext(LoginContext);
    const Navigate = useNavigate();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")



    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;




    const postData = (e) => {
        if (!emailRegex.test(email)) {
            toast.error("Please use a valid Email Id")
            return;
        }
        // Sending data to server
        fetch("http://localhost:5000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json())
            .then(data => {

                if (data.error) {
                    notifyA(data.error)
                } else {
                    notifyB(data.message)
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    setuserLogin(true);
                    Navigate("/")
                }
            })
    }






    return (
        <div className='signinform'>

            <div className="form">
                <h1>Flexogram</h1>
                <form action=''>
                    <input type="email" placeholder='Email@gmail.com' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    <input type="submit" className='formsubmitbrn' onClick={(e) => {
                        e.preventDefault();
                        postData();
                    }} value={"SignIn"} />
                </form>
            </div>
            <div className='signinoption'><p>Don't have account? {" "}</p>
                <Link to={'/signup'} > {" "} SignUp</Link>  </div>
        </div>
    )
}

export default Signin