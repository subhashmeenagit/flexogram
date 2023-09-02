import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
const Signup = () => {


    const Navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const [userName, setuserName] = useState("")

    // Toster
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/




    const postData = (e) => {
        // console.log({ name, email, userName, password })
        // emailauth

        if (!emailRegex.test(email)) {
            toast.error("Please use a valif Email Id")
            return;
        }
        else if (!passwordRegex.test(password)) {
            toast.error("Pick A Strong Passsword ex:use at least one ('0-9'&'A-Z'&'a-z'&'@&!$')")
            return;
        }
        else if (password !== cpassword) {
            toast.error("confirm password  and password doesn't match ")
            return;
        }
        else if (name.length < 3) {
            notifyA("Please Write A valid Name");
            return;
        }
        // Sending data to server
        fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                userName: userName,
                email: email,
                password: password

            })
        }).then(res => res.json())
            .then(data => {

                if (data.error) {
                    notifyA(data.error)
                } else {
                    notifyB(data.message)
                    Navigate("/signin")
                }
                console.log(data)
            })
    }



    return (
        <div className='signupform'>

            <div className="form">
                <h1>Flexogram</h1>
                <form action=''>
                    <input type="email" placeholder='Email@gmail.com' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <input type="text" name="" id="" placeholder='Full Name' value={name} onChange={(e) => { setname(e.target.value) }} />
                    <input type="text" placeholder='UserName' value={userName} onChange={(e) => { setuserName(e.target.value) }} />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    <input type="password" placeholder='Confirm Password'
                        value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                    <input type="submit" value={"SignUp"} className='formsubmitbrn' onClick={(e) => {
                        e.preventDefault();
                        postData();
                    }} />
                </form>
            </div>
            <div className='signupoption'><p>Already have account? {" "}</p>
                <Link to={'/signin'} > {" "} SignIn</Link>  </div>
        </div>
    )
}

export default Signup