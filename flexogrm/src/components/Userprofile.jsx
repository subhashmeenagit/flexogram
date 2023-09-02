import React, { useState, useEffect } from 'react'
import avtar from '../assets/avtar.png'
import { useParams } from 'react-router-dom'

import { toast } from 'react-hot-toast'
const Userprofile = () => {

    const pass = (msg) => toast.success(msg)
    const fail = (msg) => toast.error(msg)
    const [user, setuser] = useState("")
    const [posts, setposts] = useState([])
    const [isfollow, setisfolow] = useState(false)

    const { userid } = useParams()






    const unfollowuser = (userId) => {
        fetch("http://localhost:5000/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                followId: userId,
            }),
        })
            .then((res) => {
                res.json();
            })
            .then((data) => {
                console.log(data);
                pass("unfollowed")
                setisfolow(false);
            })
        //   .catch(err => fail(err));
    };




    const followuser = (userId) => {
        fetch("http://localhost:5000/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                followId: userId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                pass("followed");
                setisfolow(true);
            })
        //  .catch(err => fail(err));
    };



    useEffect(() => {

        fetch(`http://localhost:5000/user/${userid}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")

            }
        }).then(res => res.json())
            .then((result) => {
                console.log(result)
                setposts(result.post)
                setuser(result.user)

                if (
                    result.user.followers.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                    )
                ) {
                    setisfolow(true)
                }
            })
            .catch(err => console.log(err));



    }, [isfollow])

    return (
        <div className='profile'>
            <div className="profilefram">

                <div className="proflepic">
                    <img src={user.Photo ? user.Photo : avtar} alt="profilepic" />

                </div>

                <div className="profiledata">
                    <div className="follow">
                        <p>{user.name}</p>
                        <button
                            onClick={() => {
                                if (isfollow) {
                                    unfollowuser(user._id)

                                }
                                else followuser(user._id)
                            }}


                        >

                            {
                                isfollow ? "UnFollow" : "Follow"
                            }</button>
                    </div>

                    <div> <p>{posts.length}<br />  Post</p>
                        <p> {user.followers ? user.followers.length : "0"} <br /> followers </p>
                        <p> {user.following ? user.following.length : "0"} <br /> following</p></div>
                </div>
            </div>

            <div className="profilehistory">

                {
                    posts.map((e) => {
                        return <img src={e.photo} alt="pic" key={e._id}
                            onClick={() => {
                                // togglepost(e);
                                // setPost(e)
                                console.log(e);
                            }}
                        />
                    })
                }

            </div>

        </div>
    )
}

export default Userprofile