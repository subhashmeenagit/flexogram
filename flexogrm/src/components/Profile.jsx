import React, { useState, useEffect } from 'react'
import avtar from "../assets/avtar.png"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import Profilepic from './Profilepic';

const Profile = () => {
    const [mypost, setmypost] = useState([]);
    const [user, setuser] = useState([])
    const [show, setshow] = useState(false);
    const [comment, setcomment] = useState("")
    const [post, setPost] = useState([]);
    const [changePic, setChangePic] = useState(false)
    const [data, setdata] = useState([])
    const navigate = useNavigate()

    const togglepost = ((post) => {
        if (show) {
            setshow(false);
        } else {
            setshow(true);
            setPost(post);
        }
    })
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);


    const changeprofilepic = () => {
        if (changePic) {
            setChangePic(false)
        } else {
            setChangePic(true)
        }
    }
    useEffect(() => {

        fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")

            }
        }).then(res => res.json())
            .then((result) => {
                console.log(result)
                setmypost(result.post)
                setuser(result.user)
            })

            .catch(err => console.log(err))

    }, [])

    const removePost = (postId) => {
        if (window.confirm("Do you really want to delete this post ?")) {
            fetch(`http://localhost:5000/deletePost/${postId}`, {
                method: "delete",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    togglepost();
                    navigate("/");
                    notifyB(result.message);
                })
                .catch(err => notifyA(err))
        }
    };
    const makeComment = (text, id) => {
        fetch("http://localhost:5000/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text: text,
                postId: id
            })
        }).then(res => res.json())
            .then((result) => {
                const newdata = data.map((posts) => {
                    if (posts._id == result._id) {
                        return result
                    }
                    else {
                        return posts
                    }
                })
                //   data[0].likes = result.error.likes
                setdata(newdata)
                // console.log(result.error.likes, result, typeof (result), data, "unposedliked", data[0].likes, typeof (data))
            })
        setcomment("")
    }


    return (
        <>
            <div className='profile'>
                <div className="profilefram">

                    <div className="proflepic">
                        <img src={user.Photo ? user.Photo : avtar} alt="profilepic"

                            onClick={changeprofilepic}
                        />

                    </div>

                    <div className="profiledata">
                        <p>{JSON.parse(localStorage.getItem("user")).name}</p>
                        <div> <p>{mypost ? mypost.length : "0"}
                            <br /> Post
                        </p>
                            <p
                            >
                                {user.followers ? user.followers.length : "0"}
                                <br />
                                Follower</p>
                            <p>
                                {user.following ? user.following.length : "0"}
                                <br />
                                Following </p></div>
                    </div>
                </div>

                <div className="profilehistory">

                    {
                        mypost.map((e) => {
                            return <img src={e.photo} alt="pic" key={e._id}
                                onClick={() => {
                                    togglepost(e);
                                    setPost(e)

                                }}
                            />
                        })
                    }
                </div>

            </div>
            {
                show && (
                    <div className="showpost">
                        <div className="container">
                            <div className="postPic">
                                <img src={post.photo} alt="pic" />
                            </div>


                            <div className="details">
                                {/* card header */}
                                <div
                                    className="Xcardheader"
                                    style={{ borderBottom: "1px solid #00000029" }}
                                >

                                    <img
                                        src={user.Photo ? user.Photo : avtar}
                                        alt="pic"
                                    />
                                    <p>{user.name}</p>
                                    <div
                                        className="deletePost"

                                    >
                                        <span
                                            style={{ cursor: "pointer" }}
                                            className="material-symbols-outlined"
                                            onClick={() => {
                                                removePost(post._id);
                                                console.log(post._id)
                                            }}

                                        >delete</span>
                                    </div>
                                </div>

                                {/* commentSection */}
                                <div className="totalcomments tc"
                                    style={{ "background-color": "rgb(255, 255, 255, .9)" }}

                                >
                                    <h1> Total Comments: {post.comments.length}</h1>
                                    {post.comments.map((e) => {
                                        return <>
                                            <div className="personcmt ">

                                                <h1> {e.postedBy.name} : </h1>
                                                <p>{e.comment}</p>
                                            </div>


                                        </>
                                    })}
                                </div>

                                {/* card content */}
                                <div className="card-content">
                                    <p>{post.likes.length} Likes</p>
                                    <p>{post.body}</p>
                                </div>

                                {/* add Comment */}
                                <div className="Xaddcomment"
                                    style={{ "background-color": "rgb(255, 255, 255)" }}>
                                    <span class="material-symbols-outlined rxn">
                                        add_reaction
                                    </span>
                                    <div className="Xcmtinput">
                                        <input className='showcommentinput' type="text" placeholder='comment...'
                                            value={comment} onChange={(e) => {
                                                setcomment(e.target.value)
                                            }} />
                                    </div>
                                    <button
                                        onClick={() => {
                                            makeComment(comment, post._id)
                                            togglepost();

                                        }}
                                    >post</button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="close-comment"
                            onClick={() => {
                                togglepost();
                            }}
                        >
                            <span className="material-symbols-outlined material-symbols-outlined-comment clsbtn">
                                close
                            </span>
                        </div>
                    </div>
                )
            }

            {
                changePic &&
                <Profilepic changeprofilepic={changeprofilepic} />
            }


        </>
    )
}

export default Profile