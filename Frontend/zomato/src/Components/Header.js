import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode";
const Header = () => {
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [signupcredentials, setSignupcredentials] = useState({ name:"",email: "", password: "",cpassword:"" })
    const [name, setName] = useState({ name: "" })
    let checkLogin = (response) => {
        // get token 
        let token = localStorage.getItem("auth_token")

        if (token) {
            try {
                return jwtDecode(token)
            } catch (error) {
                return null
            }
        } else {
            return null
        }
    }
    let [isLogin, setIsLogin] = useState(checkLogin());

    const success = (credentialResponse) => {
        try {
            let token = credentialResponse.credential
            // save token
            localStorage.setItem("auth_token", token);
            window.location.assign("/");
            console.log(token)
        } catch (error) {
            alert("Wrong token")
        }
    }

    const error = (c) => {
        console.log("Login Failed")
    }
    const logout = () => {
        localStorage.removeItem("auth_token")
        console.log("logout")
        setIsLogin(null)
        navigate("/")
    }
    const handleInput = (e) => {
        console.log(e.target.name)
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        console.log(credentials)
    }
    const onChange=(e)=>{
        setSignupcredentials({ ...signupcredentials,[e.target.name]:e.target.value})
        console.log(signupcredentials)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3001/api/home/login", {
            method: 'POST',
            mode: 'cors',


            headers: {
                'Content-Type': 'application/json',

            },


            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header

        });
        const json = await response.json()
        let username = json.user
        try {
            console.log(username)
            setName({ name: username })
            console.log(name)
        } catch (error) {
            console.log(error)
        }
        
        setName({ name: username })
       

        try {

            let token = json.authtoken
            // save token
            localStorage.setItem("auth_token", token);
            window.location.assign("/");

            setLoginSuccessful(true);

        }
        catch (error) {
            alert("Wrong email or password")
        }

    }
    const handlesignupSubmit = async (e) => {
        console.log(signupcredentials.email)
        e.preventDefault()
        const response = await fetch("http://localhost:3001/api/home/createuser", {
            method: 'POST',
            mode: 'cors',


            headers: {
                'Content-Type': 'application/json',

            },

            
            body: JSON.stringify({ name: signupcredentials.name,email: signupcredentials.email, password: signupcredentials.password }) // body data type must match "Content-Type" header

        });
        const json = await response.json()
        console.log(json.authtoken)
        try {

            let token = json.authtoken
            // save token
            localStorage.setItem("auth_token", token);
            window.location.assign("/");

            setLoginSuccessful(true);

        }
        catch (error) {
            alert("Wrong email or password")
        }

    }
    useEffect(() => {
        if (loginSuccessful) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(() => false);
            }, 120000);
        }
    }, [loginSuccessful]);
    return (
        <>
            <GoogleOAuthProvider clientId="1039880995855-gckabqqt4gd69l6ie8pt5obk536robth.apps.googleusercontent.com">

                {/*    <header className="col-12 py-3">
                    <div className="container d-lg-flex justify-content-end d-none">
                        <button className="btn text-white me-3" type="button" className="btn " data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                        <button className="btn text-white border border-white">
                            Create an account
                        </button>
                    </div>
    </header> */}

                {/*Modal*/}
                <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleInput} aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="Password" name="password" value={credentials.password} onChange={handleInput} />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                                <div className='my-3'>
                                    <GoogleLogin
                                        onSuccess={success}
                                        onError={error}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </GoogleOAuthProvider>

            {/*Modal2 for Creating a new Account*/}




            <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new account</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlesignupSubmit}>
                                <div class="mb-3">

                                    <label for="exampleInputEmail1" class="form-label"  >Name</label>
                                    <input type="text" class="form-control" id="name" name="name"  value={signupcredentials.name} onChange={onChange} aria-describedby="emailHelp"   />

                                </div>
                                <div class="mb-3">

                                    <label for="exampleInputEmail1" class="form-label" value ={signupcredentials.email}>Email address</label>
                                    <input type="email" class="form-control" id="emailmail1" name="email" value ={signupcredentials.email} onChange={onChange} aria-describedby="emailHelp"  />
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" name="password" value ={signupcredentials.password} onChange={onChange}  />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                                    <input type="password" class="form-control" id="cpassword" name="cpassword"  value ={signupcredentials.cpassword} onChange={onChange}  />
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="col-10 d-flex justify-content-between py-2 align-items-center">
                <p className="m-0 brand" onClick={() => navigate("/")}>
                    e!
                </p>
                <div>
                    {isLogin ? (
                        <>
                            <div className="d-flex">
                                <span className="mx-3 text-white my-3 font-weight-bold text-align-center" >
                                    Welcome {name.name}
                                </span>

                                <button className="btn  btn-danger" onClick={logout}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn text-white btn-outline-light mx-2"
                                data-bs-target="#loginModal"
                                data-bs-toggle="modal"
                            >
                                Login
                            </button>
                            <button className="btn btn-outline-light" data-bs-target="#signupModal"
                                data-bs-toggle="modal">
                                <i className="fa fa-search" aria-hidden="true"></i>Create a
                                Account
                            </button>
                        </>
                    )}
                </div>

            </div>
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Login successful!
                </div>
            )}
        </>
    )
}

export default Header