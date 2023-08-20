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

        fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
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
            fetch(`/deletePost/${postId}`, {
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
                                    console.log(e);
                                }}
                            />
                        })
                    }
                </div>

            </div>
            {
                show && (
                    <div className="showComment">
                        <div className="container">
                            <div className="postPic">
                                <img src={post.photo} alt="pic" />
                            </div>
                            <div className="details">
                                {/* card header */}
                                <div
                                    className="ppcardheader"
                                    style={{ borderBottom: "1px solid #00000029" }}
                                >

                                    <img
                                        src={user.Photo ? user.Photo : avtar}
                                        alt="pic"
                                    />
                                    <p>{post.postedBy.name}</p>
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
                                <div
                                    className="comment-section"
                                    style={{ borderBottom: "1px solid #00000029" }}
                                >
                                    {post.comments.map((comment) => {
                                        return (
                                            <p className="comm">
                                                <span className="commenter" style={{ fontWeight: "bolder" }}>
                                                    {comment.postedBy.name}{": "}
                                                </span>
                                                <span className="commentText">{comment.comment}</span>
                                            </p>
                                        );
                                    })}
                                </div>

                                {/* card content */}
                                <div className="card-content">
                                    <p>{post.likes.length} Likes</p>
                                    <p>{post.body}</p>
                                </div>

                                {/* add Comment */}
                                <div className="add-comment">
                                    <span className="material-symbols-outlined">mood</span>
                                    <input
                                        type="text"
                                        placeholder="Add a comment"
                                    //   value={comment}
                                    //   onChange={(e) => {
                                    //     setComment(e.target.value);
                                    //   }}
                                    />
                                    <button
                                        className="comment"
                                    //   onClick={() => {
                                    //     makeComment(comment, item._id);
                                    //     toggleComment();
                                    //   }}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="close-comment"
                            onClick={() => {
                                togglepost();
                            }}
                        >
                            <span className="material-symbols-outlined material-symbols-outlined-comment">
                                close
                            </span>
                        </div>
                    </div>
                    // <div className="pppicdetail">

                    //     <div className="ppcontainerpost">
                    //         <div className="pppostpic">
                    //             <img src={item.photo} alt="pic" />
                    //         </div>

                    //         <div className="pppostdetail">
                    //             <button className='togglecmt' onClick={() => {
                    //                 togglepost()
                    //             }}>
                    //                 <AiOutlineClose />


                    //             </button>

                    //             <div className='postdeletbtn'>
                    //                 <button >
                    //                     <IconContext.Provider value={{ className: "deleteicon" }}>  <AiOutlineDelete /> </IconContext.Provider>


                    //                 </button>
                    //                 <p>     Delete Post</p>
                    //             </div>

                    //             <div className="ppcardheader">
                    //                 <img src={pic1} alt="profilepic" />
                    //                 <p>{item.postedBy.name}</p>
                    //             </div>
                    //             <div className="totalcomments"
                    //                 style={{ height: "80vh", "margin-bottom": "1.5rem" }}

                    //             >
                    //                 <h1> Total Comments: {item.comments.length}</h1>
                    //                 {item.comments.map((e) => {
                    //                     return <>
                    //                         <div className="personcmt">

                    //                             <h1> {e.postedBy.name} : </h1>
                    //                             <p>{e.comment}</p>
                    //                         </div>


                    //                     </>
                    //                 })}
                    //             </div>
                    //             <div className="likecomaddcoom"
                    //                 style={{
                    //                     padding: ".1rem 0 .1rem 0"
                    //                 }}


                    //             >
                    //                 <div className='likecap'>
                    //                     <p
                    //                     >{item.likes.length} {item.likes.length > 1 ? "Likes" : "Like"}</p>
                    //                     <p>{item.body}</p>
                    //                 </div>
                    //                 <div className="addcomment addcomment-new">
                    //                     <span class="material-symbols-outlined rxn">
                    //                         add_reaction
                    //                     </span>
                    //                     <div className="cmtinput">
                    //                         <input className='showcommentinput' type="text" placeholder='comment...'
                    //                             value={comment} onChange={(e) => {
                    //                                 setcomment(e.target.value)
                    //                             }} />
                    //                     </div>
                    //                     <button
                    //                         onClick={() => {
                    //                             //    makeComment(comment, item._id)
                    //                             togglepost();

                    //                         }}
                    //                     >post</button>
                    //                 </div>
                    //             </div>

                    //         </div>
                    //     </div>

                    // </div>
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