import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Home.css"
import { useNavigate} from "react-router-dom";
import Header from './Header';


const Home2 = () => {
    const navigate = useNavigate();
    
    const [mealTypes, setmealTypes] = useState([])
    let [locationList, setLocationList] = useState([]);
    let getLocationList = async () => {
        const URL = "http://localhost:3001/api/get-location-list"

        const data = await fetch(URL)
        const locationData = await data.json()
        console.log(locationData)
        if (locationData.status === true) {
            setLocationList(locationData.result);
            console.log(locationList)
        } else {
            setLocationList([]);
        }
    };

    const getMealTypes = async () => {
        const URL = "http://localhost:3001/api/get-meal-type-list"

        const response = await fetch(URL)
        const mealtypedata = await response.json()
        setmealTypes(mealtypedata.result)


    }

    useEffect(() => {
        getMealTypes(); getLocationList()


    }, [])





    return (
        <>
            <main>
                <section className="row main-section align-content-start">
              {/*}      <header className="col-12 py-3">
                        <div className="container d-lg-flex justify-content-end d-none">
                            <button className="btn text-white me-3">Login</button>
                            <button className="btn text-white border border-white">
                                Create an account
                            </button>
                        </div>
    </header> */}  <div className="row justify-content-center">
                    <Header/>
                </div>
                    <section className="col-12 d-flex flex-column align-items-center justify-content-center">
                        <p className="brand-name fw-bold my-lg-2 mb-0">e!</p>
                        <p className="h1 text-white my-3 text-center">
                            Find the best restaurants, cafés, and bars
                        </p>
                        <div className="search w-50 d-flex mt-3">
                            <select className="form-select mb-3 mb-lg-0 w-50 me-lg-3 py-2 px-3">
                                <option value="">Select Location</option>
                                {locationList.map((location, index) => {
                                    return (
                                        <option key={index} value={location.location_id}>
                                            {location.name}, {location.city}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="w-75 input-group">
                                <span className="input-group-text bg-white">
                                    <i className="fa fa-search text-primary"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control py-2 px-3"
                                    placeholder="Search for restaurants"
                                />
                            </div>
                        </div>
                    </section>
                </section>



                <section className="row justify-content-center">
                    <section className="col-10 mt-3">
                        <h3 className="fw-bold text-navy">Quick Searches</h3>
                        <p className="text-secondary">Discover restaurants by Searches</p>
                    </section>
                    <section className="col-10">
                        <section className="row py-2">
                            <section className="col-12 px-0 d-flex justify-content-between flex-wrap">
                                {
                                    mealTypes.map((mealType, index) => {
                                        return <section  onClick={() => {
                                            navigate('/search/'+ mealType.meal_type);
                                          }}
                                            key={index}
                                            className="px-0 d-flex border border-1 quick-search-item">

                                            <img src={"/images/" + mealType.image} alt="" className="image-item" />

                                            <div className="pt-3 px-2">
                                                <h4 className="text-navy">{mealType.name}</h4>
                                                <p className="small text-muted">{mealType.content}</p>
                                            </div>
                                        </section>

                                    })
                                }



                            </section>


                        </section>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Home2