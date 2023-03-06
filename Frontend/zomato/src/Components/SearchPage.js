import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'

function SearchPage() {
  const { id } = useParams()
  const navigate = useNavigate()
 
  let [filter, setFilter] = useState({
    mealtype_id: id
  })
  let [locationList, setLocationList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([])

  const getFilterData = async (data = filter) => {
    const url = `http://localhost:3001/api/filter`
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',


      headers: {
        'Content-Type': 'application/json',

      },


      body: JSON.stringify(data) // body data type must match "Content-Type" header

    });
    const json = await response.json();

    setRestaurantList(json.restaurant)


  }
  let setFilterLogic=(event,type)=>{
    let { value } = event.target;
    console.log(value);
    console.log(type)
    switch (type) {
      case "sort":
        setFilter({ ...filter, sort: value });
        break;
        case "location":
        if (value === "") {
          delete filter.location;
          setFilter({ ...filter });
        } else {
          setFilter({ ...filter, location: value });
        }

        break;
     
     }
  }
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

  useEffect(() => {
    getFilterData()
   getLocationList()

  }, [filter])

  return (
    <>
      <div className="container-fluid">

        <div className="row bg-danger justify-content-center align-items-center">
          <Header/>
        </div>
      </div>
      {/* <!-- section --> */}
      <div className="row">
        <div className="col-12 px-5 pt-4">
          <p className="h3">Breakfast Places In Mumbai</p>
        </div>
        {/* <!-- food item --> */}
        <div className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
          <div className="food-shadow col-12 col-lg-3 col-md-4 me-5 p-3 mb-4">
            <div className="d-flex justify-content-between">
              <p className="fw-bold m-0">Filter</p>
              <button
                className="d-lg-none d-md-none btn"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFilter"
                aria-controls="collapseFilter"
              >
                <span className="fa fa-eye"></span>
              </button>
            </div>
            {/* <!-- Collapse start  --> */}
            <div className="collapse show" id="collapseFilter">
              <div>
                <label htmlFor="" className="form-label">
                  Select Location
                </label>
                <select
                    className="form-select form-select-sm"
                    name="location"
                    onChange={(event) => setFilterLogic(event, "location")}
                  >
                    <option value="">Select Location</option>
                    {locationList.map((location, index) => {
                      return (
                        <option key={index} value={location.location_id}>
                          {location.name}, {location.city}
                        </option>
                      );
                    })}
                  </select>
              </div>
              <p className="mt-4 mb-2 fw-bold">Cuisine</p>
              <div>
                <div className="ms-1">
                  <input type="checkbox" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    North Indian
                  </label>
                </div>
                <div className="ms-1">
                  <input type="checkbox" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    South Indian
                  </label>
                </div>
                <div className="ms-1">
                  <input type="checkbox" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    Chinese
                  </label>
                </div>
                <div className="ms-1">
                  <input type="checkbox" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    Continental
                  </label>
                </div>
                <div className="ms-1">
                  <input type="checkbox" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    Punjabi
                  </label>
                </div>
                <div className="ms-1">
                  <input type="checkbox" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    Desserts
                  </label>
                </div>
              </div>
              <p className="mt-4 mb-2 fw-bold">Cost For Two</p>
              <div>
                <div className="ms-1">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    less then 500
                  </label>
                </div>
                <div className="ms-1">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    500 to 1000
                  </label>
                </div>
                <div className="ms-1">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    1000 to 1500
                  </label>
                </div>
                <div className="ms-1">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    1500 to 2000
                  </label>
                </div>
                <div className="ms-1">
                  <input type="radio" className="form-check-input" />
                  <label htmlFor="" className="form-check-label ms-1">
                    2000+
                  </label>
                </div>
              </div>
              <p className="mt-4 mb-2 fw-bold">Sort</p>
              <div>
                <div className="ms-1">
                  <input type="radio" className="form-check-input" name="sort" checked={true} value="0" onChange={(event) => setFilterLogic(event, "sort")}/>
                  <label htmlFor="" className="form-check-label ms-1">
                    Price low to high
                  </label>
                </div>
                <div className="ms-1">
                  <input type="radio" className="form-check-input" name ="sort" value="1" onChange={(event) => setFilterLogic(event, "sort")} />
                  <label htmlFor="" className="form-check-label ms-1">
                    Price high to low
                  </label>
                </div>
              </div>
            </div>
            {/* <!-- Collapse end --> */}
          </div>
          {/* <!-- search result --> */}
          <div className="col-12 col-lg-8 col-md-7">
            <div className="col-12 food-shadow p-4 mb-4">
              {restaurantList.map((restaurant) => {
                return (
                  <div  onClick={() =>navigate(`/restaurant/` + restaurant._id )}>
                    <div className="d-flex align-items-center">
                      <img src={"/images/assets/breakfast.png"} className="food-item" />
                      <div className="ms-5">
                        <p className="h4 fw-bold">{restaurant.name} {(restaurant.aggregate_rating)}</p>
                        <span className="fw-bold text-muted">{restaurant.locality}</span>
                        <p className="m-0 text-muted">
                          <i
                            className="fa fa-map-marker fa-2x text-danger"
                            aria-hidden="true"
                          ></i>
                          {restaurant.locality},{restaurant.city}
                        </p>
                      </div>

                    </div>
                    
                     <div className="d-flex">
                      <div>
                        <p className="m-0 fw-bold">CUISINES</p>
                        <p className="m-0 fw-bold">COST FOR TWO</p>
                        
                      </div>
                      
                      <div className="ms-5">
                        <p className="m-0 fw-bold">
                           {restaurant.cuisine.map((cuisine)=>{
                               return cuisine.name
                           }).join(",")}
                        </p>
                        <p className="m-0 fw-bold">
                          <i className="fa fa-inr" aria-hidden></i>
                          {restaurant.min_price}
                        </p>
                        
                      </div>
                     
                     </div>
                     <hr />
                  </div>
                )

              })
              }
               

            </div>


            <div className="col-12 pagination d-flex justify-content-center">
              <ul className="pages">
                <li>&lt;</li>
                <li className="active">1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>&gt;</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default SearchPage