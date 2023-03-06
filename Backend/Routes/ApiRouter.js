const APIRouter = require('express').Router()

// Importing all controllers

const location = require("../Controller/LocationController")
const mealtype = require('../Controller/MealTypeCollection')
const restaurantlist = require('../Controller/RestaurantController')
const saveOrder = require("../Controller/PaymentController")
const auth = require("../Controller/AuthController")
const MenuItems = require('../Controller/MenuItemController')
const { body, validationResult } = require('express-validator');
const { fetchUser } = require('../middleware/FetchUser')

//  test API 1 Route 1 GET: http://localhost:3000/api/  to get location list 
APIRouter.get('/',location.getLocation)

// Test api 2 Route 2 GET : http://localhost:3000/api/home/:id  to get location list where id is the path parameter
APIRouter.get('/home/:id',location.getLocationbyID)

// Test API 3 
APIRouter.get('/about',location.aboutUs)

// Route 1 GET: http://localhost:3000/api/  to get location list 
APIRouter.get('/get-location-list',location.getLocation)

// Route 2 GET : http://localhost:3000/api/home/:id  to get location list where id is the path parameter
APIRouter.get('/get-location-list/:id',location.getLocationbyID)


// Route 3 GET http://localhost:3000/api/get-meal-type-list to get meal type list
APIRouter.get('/get-meal-type-list',mealtype.getMealTypeList)


//  Route 4 GET http://localhost:3000/api/get-restaurant-list to get restaurant list 

APIRouter.get('/get-restaurant-list',restaurantlist.getRestaurantList)

//  Route 5 GET http://localhost:3000/api/get-restaurant-by-location/:loc_id to get restaurant detail by location id as path parameter
APIRouter.get('/get-restaurant-by-location/:loc_id',restaurantlist.getRestaurantBylocation)

//  Route 6 GET http://localhost:3000/api/get-restaurant-details-by-id/:id to get restaurant detail by Id as path parameter
APIRouter.get('/get-restaurant-details-by-id/:id',restaurantlist.getRestaurantDetailsById)

// Route 7 GET http://localhost:3000/api/get-menu-items-by-restaurant-id/:id to get menu items detail detail by restaurant  Id as path parameter
APIRouter.get('/get-menu-items-by-restaurant-id/:id',MenuItems.getMenuItemsByRestaurant)

APIRouter.post("/payment",saveOrder.saveOrder);

// Route 8 POST http://localhost:3000/api/restaurantfilter 
APIRouter.post('/filter',restaurantlist.filterSearch)


// Route to create user

APIRouter.post('/home/createuser',[body('email','Enter a valid email'),body('password','Enter a valid password')],auth.createUser)
APIRouter.post('/home/login',[body('email','Enter a valid email').isEmail(),body("password","Please enter a password").exists()],auth.loginUser)

// Route to get user 
APIRouter.post('/home/getuser',fetchUser,auth.getUser)


// Route to create a order using Razorpay 

APIRouter.post("/createorder",saveOrder.createOrder)

// Route to verify payment signature
APIRouter.post("/verify-payment", saveOrder.verify);
module.exports = APIRouter;