import React from 'react'
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
const Modal = ({ setmodal }) => {
    const navigate = useNavigate();

    return (
        <div className='modalbg' onClick={() => setmodal(false)}>
            <div className="modalcentral" onClick={() => setmodal(true)} >
                <div className='modal'>
                    <div className="modalheader">
                        <h1>Confirm</h1>
                    </div>

                    <div className="modalcontent">
                        <p>Are you Really want to Log Out ?</p>
                    </div>
                    <button className='closebtn' onClick={() => setmodal(false)} >
                        <RiCloseFill />
                    </button>
                    <div className="btnoption">
                        <button className='conbtn'
                            onClick={() => {
                                setmodal(false)
                                localStorage.clear()
                                navigate("./signin")
                            }
                            }

                        > Confirm</button>
                        <button className='canbtn' onClick={() => setmodal(false)}>Cancle</button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Modal