import { FloatingLabel, Form } from "react-bootstrap";
import './home.css'
import React, { useState } from "react";
import { saveUser } from "../../features/axios/userAxios";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleClick = async()=>{
      const user = await saveUser(name)
      if(user){
        localStorage.setItem("userName", name)
        navigate('/questions')
      }
  }


  return (
    <div className="container-fluid">
      <div className="background vh-100 d-flex justify-content-center align-items-center">
        <div className="overlay"></div>
        <div className="row text-center content">
          <div className="col-12 mb-3">
            <div className="logo">
              <div className="logo-circle">
                <img
                  alt="logo"
                  src="/logo/Screenshot__288_-removebg-preview.png"
                  className="logo-img"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <FloatingLabel
              controlId="floatingInput"
              label="Enter your name here"
              className="mb-3 custom-width"
            >
              <Form.Control 
                type="text" 
                placeholder="Write your Name here" 
                className="custom-placeholder" 
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)
                }/>
            </FloatingLabel>
          </div>
          <div className="col-12">
            <button onClick={()=>handleClick()} className="play-button">
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;