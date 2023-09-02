import React, { useEffect, useState } from 'react'
import avtar from "../assets/avtar.png";
import cardpic from "../assets/avtar.png";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
const Home = () => {


    const [data, setdata] = useState([])
    const [comment, setcomment] = useState("")

    const [item, setitem] = useState([])
    const [show, setshow] = useState(false)

    const nevigate = useNavigate();



    useEffect(() => {

        const token = localStorage.getItem("jwt")
        if (!token) {
            nevigate("/signin")
        }
        fetch("http://localhost:5000/allposts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => setdata(result))
            .catch(err => console.log(err))


    }, [data])




    const toggleComment = (posts) => {
        if (show) setshow(false)
        else setshow(true)
        setitem(posts)
    }


    const likepost = (id) => {
        fetch("http://localhost:5000/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            }),
        })
            .then(res => res.json())
            .then((result) => {
                const newdata = data.map((posts) => {
                    if (posts._id == result._id) {
                        return result
                    }
                    else {
                        return posts
                    }
                })
                setdata(newdata)
                // data[0].likes = result.error.likes
                // setdata(data)
                console.log(result.likes, result, data, "posedliked", data.likes)
            })
    }


    const unlikepost = (id) => {
        fetch("http://localhost:5000/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
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
    }


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
        <div className='home'>
            {/* card header */}
            {
                data.map((posts) => {
                    return (
                        <div style={{
                            margin: "1rem 0", border: "1px solid rgb(173, 173, 173)",
                            "border-radius": "5px"
                        }}>
                            <div className="cardheader">
                                <Link to={`/profile/${posts.postedBy._id}`}>
                                    <img src={posts.postedBy.Photo ? posts.postedBy.Photo : avtar} alt="profilepic"
                                        onClick={() => {
                                            nevigate("/profile")
                                        }} />
                                    <p onClick={() => {

                                    }}>{posts.postedBy.name}
                                    </p>
                                </Link>
                            </div>

                            <div className="cardpic">
                                <img src={posts.photo} alt="pic" />

                            </div>

                            <div className="cardcontaint">
                                <div className="cardsymbol">

                                    {
                                        posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
                                            <span class="material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlikepost(posts._id) }}>
                                                favorite
                                            </span>
                                        ) : (
                                            <span class="material-symbols-outlined" onClick={() => { likepost(posts._id) }} >
                                                favorite
                                            </span>
                                        )
                                    }





                                    <p>{posts.likes.length} {posts.likes.length > 1 ? "Likes" : "Like"}</p>
                                </div>
                                <div className="personcap">
                                    <img src={posts.postedBy.Photo ? posts.postedBy.Photo : cardpic} alt="profilepic"
                                        onClick={() => {
                                            nevigate("/profile")
                                        }} />
                                    <p onClick={() => {
                                        nevigate("/profile")
                                    }}>{posts.postedBy.name}
                                    </p>
                                    <h1>{posts.body}</h1>
                                </div>

                            </div>

                            <div className="cardcomment" >
                                {posts.comments.length > 0 ? (
                                    <>
                                        <p>Comments:-</p>
                                        <p

                                            onClick={() => { toggleComment(posts) }}


                                        >  view All {posts.comments.length > 0 ? posts.comments.length : ""}  Comments</p>
                                    </>
                                ) : (
                                    <p>"No Comment Yet</p>
                                )}
                            </div>
                            <div className="addcomment">
                                <span class="material-symbols-outlined rxn">
                                    add_reaction
                                </span>
                                <input type="text" placeholder='comment...'
                                    value={comment} onChange={(e) => {
                                        setcomment(e.target.value)
                                    }} />
                                <button onClick={() => {
                                    makeComment(comment, posts._id)
                                }}>post</button>
                            </div>
                        </div>
                    )

                })
            }


            {show && (
                <div className="showcomment">
                    <div className="commentcontainer">
                        <div className="postpic">
                            <img src={item.photo} alt="pic" />
                        </div>
                        <button className='togglecmt' onClick={() => {
                            toggleComment()
                        }}>
                            <AiOutlineClose />
                        </button>
                        <div className="commentdetial">
                            <div className="cardheadert">
                                <img src={item.postedBy.Photo ? item.postedBy.Photo : avtar} alt="profilepic" />
                                <p>{item.postedBy.name}</p>
                            </div>
                            <div className="totalcomments">
                                <h1> Total Comments: {item.comments.length}</h1>
                                {item.comments.map((e) => {
                                    return <>
                                        <div className="personcmt">

                                            <h1> {e.postedBy.name} : </h1>
                                            <p>{e.comment}</p>
                                        </div>


                                    </>
                                })}
                            </div>
                            <div className="likecomaddcoom">
                                <div className='likecap'>
                                    <p

                                    >{item.body}


                                    </p>
                                    <p
                                    >{item.likes.length} {item.likes.length > 1 ? "Likes" : "Like"}


                                    </p>

                                </div>
                                <div className="addcomment addcomment-new">
                                    <span class="material-symbols-outlined rxn">
                                        add_reaction
                                    </span>
                                    <div className="cmtinput">
                                        <input className='showcommentinput' type="text" placeholder='comment...'
                                            value={comment} onChange={(e) => {
                                                setcomment(e.target.value)
                                            }} />
                                    </div>
                                    <button
                                        onClick={() => {
                                            makeComment(comment, item._id)
                                            toggleComment();

                                        }}
                                    >post</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            )
            }

        </div>
    )
}

export default Home