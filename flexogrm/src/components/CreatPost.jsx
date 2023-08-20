import React, { useState, useEffect } from 'react'
import pic1 from "../assets/me1.jpg"
import upl from "../assets/upload.png"
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"
const CreatPost = () => {
    const [body, setbody] = useState("")
    const [imge, setimge] = useState("")
    const [url, seturl] = useState("")
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)
    const navigate = useNavigate();

    useEffect(() => {

        // saving post to mongodb
        if (url) {

            fetch("/createPost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error)
                    } else {
                        notifyB("Successfully Posted")
                        navigate("/")
                    }
                })
                .catch(err => console.log(err))
        }

    }, [url])

    const Postdetail = () => {
        if (typeof (body) == 'undefined' || typeof (url) == 'undefined') notifyA("Fill all the fields")
        const data = new FormData()
        data.append("file", imge)
        data.append("upload_preset", "flexogram")
        data.append("cloud_name", "subhashmeena")
        fetch("https://api.cloudinary.com/v1_1/subhashmeena/image/upload", {
            method: "post",
            body: data,

        }).then(res => res.json())
            .then(data => seturl(data.url))
            .catch(err => console.log(err))


    }





    let loadFile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    }
    return (






        <div className='creatpostdiv'>
            <div className="uploadpostbtn">
                <h1>Create New Post</h1>
                <button onClick={() => {
                    Postdetail();
                }}>Share Post</button>
            </div>


            <div className="uploadview" >
                <img src={upl} alt="pic" id="output" />

            </div>
            <div className="upload">
                <input type='file' accept='image/*' onChange={(e) => {
                    loadFile(e);
                    setimge(e.target.files[0])
                }} />

            </div>
            <div className="creatpostperson">
                <img src={pic1} alt="profilepic" />
                <p>Subhash</p>
            </div>
            <div className="txtarea" >
                <textarea type="text" placeholder='Write a Caption...'
                    value={body}
                    onChange={(e) => {
                        setbody(e.target.value)
                    }}
                />
            </div>


        </div>

    )
}

export default CreatPost