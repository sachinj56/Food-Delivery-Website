import React from 'react'
import "./Home.css"
const Home = () => {
    return (
        <>
            <div className="container-fluid back-img">
                <div className="row text-end login-signup-row">
                    <div className='col-7'>div1</div>
                    <div className='col-2 text-end'>
                        <a href="" className='login'>Login</a>
                    </div>
                    <div className='col-3 text-start' >
                        <a href="" className='createaccount'>Create an account</a>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-12">
                        <p className='logo'>Zomato!</p>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-12">
                        <div className="col-12">
                            <p className='logo'>Find the best restaurants,cafes and bar</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">blank</div>
                    <div className="col-4">
                        <div className="locationdropdown">
                            <select name="" id="">
                                <option value="">Mumbai</option>
                                <option value="">Pune</option>
                                <option value="">Bangalore</option>
                                <option value="">New Delhi</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="restaurantselector">
                            <input className='restaurantsinput' type="text" placeholder='Search for restaurants' />
                            <div className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">blank</div>
                </div>
            </div>
        </>
    )
}

export default Home