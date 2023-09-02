import React, { useRef, useState, useEffect } from 'react'

const Profilepic = ({ changeprofilepic }) => {





    const [imge, setimge] = useState('')
    const [url, seturl] = useState('')



    useEffect(() => {
        if (url) {
            postprofilepic()
        }
    }, [url])

    useEffect(() => {

        // saving post to mongodb
        if (imge) {

            Profiledetail()
        }


    }, [imge])


    const postprofilepic = () => {
        fetch("http://localhost:5000/uploadProfilePic", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({

                pic: url
            })
        }).then(res => res.json())
            .then(data => {
                // if (data.error) {
                //     notifyA(data.error)
                // } else {
                //     notifyB("Successfully Posted")
                //     navigate("/")
                // }
                changeprofilepic()
                window.location.reload()
                console.log(data)
            })
            .catch(err => console.log(err))
    }




    const Profiledetail = () => {
        // if (typeof (url) == 'undefined') notifyA("Fill all the fields")
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



    const hiddenfileinput = useRef(null)


    const handleclick = () => {
        hiddenfileinput.current.click();
    }
    return (

        <div className='oprofilepic darkbg' >


            <div className="ochangepic centered">
                <div className='ochangepicop'>
                    <h1

                    >Change Profile Photo</h1>
                    <button
                        className='oprofilepicup'
                        onClick={handleclick}
                    >
                        <input type="file" ref={hiddenfileinput} accept='image/*' style={{ display: "none" }}
                            onChange={(e) => { setimge(e.target.files[0]) }}
                        />

                        upload photo</button>
                    <button
                        className='oprofilepicde'

                        onClick={() => {
                            seturl(null)
                            postprofilepic();
                        }}
                    > remove current photo</button>

                    <p
                        className='oprofilepicupce'
                        onClick={changeprofilepic}

                    >cancle
                    </p>
                </div>


            </div>





        </div>
    )
}

export default Profilepic