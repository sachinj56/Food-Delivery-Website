const RestaurantModel = require('../model/RestaurantModel')
const mongoose = require("mongoose")



// GetMealTypeList function
module.exports.getRestaurantList= async (request,response)=>{
    try {
        let result = await RestaurantModel.find()
        response.status(200).send({
            status:true,
            result:result
        })
    } catch (error) {
        console.log(error)
        response.status(500).send({
            status:false,
            message:"server error"
        })
    }    
}

module.exports.getRestaurantBylocation = async (request,response)=>{
  let {loc_id} = request.params;
  try {
    let result = await RestaurantModel.find({location_id : loc_id})
    response.status(200).send({
        status:true,
        result:result
    })
} catch (error) {
    console.log(error)
    response.status(500).send({
        status:false,
        message:"server error"
    })
}  

}

module.exports.getRestaurantDetailsById = async (request,response)=>{
    let {id} = request.params;
    try {
      let result = await RestaurantModel.findById(mongoose.Types.ObjectId(id))
      const resultarray = [result]
      response.status(200).json({
          status:true,
          result:resultarray
      })
  } catch (error) {
      console.log(error)
      response.status(500).send({
          status:false,
          message:"server error"
      })
  }  
  
  }

  module.exports.getMenuItemsByRestaurant=(request,response)=>{
    response.send()
  }


  module.exports.filterSearch = async(req,res)=>{
    const queryParams = req.body; // capturing all params from the req body
    const location_id = queryParams.location_id;
    const cuisine_id = queryParams.cuisine_id;
    const mealtype_id = queryParams.mealtype_id;
    const hcost = queryParams.hcost;
    const lcost = queryParams.lcost;
    const page = queryParams.page ? queryParams.page : 1;    // 1 is default value for page
    const sort = queryParams.sort ? queryParams.sort : 1;    // 1 means ascending order & -1 means descending order
    const perPageCount = queryParams.perPageCount ? queryParams.perPageCount : 5; // number of items per page 

    let start;
    let end;
    start = Number(page * perPageCount) - perPageCount;   // setting the values for start and end params for pagination
    end = Number(page * perPageCount);
    let payload = {};   // Initializing the payload to request
      // Initializing the payload object for quering the DB
      if (mealtype_id) {
        payload = {
            mealtypeid: Number(mealtype_id)
        }
    }
    if (mealtype_id && hcost && lcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (mealtype_id && location_id) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && cuisine_id) {
        payload = {
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id) {
        payload = {
            location_id: Number(location_id),
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (location_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }

   // const result = await RestaurantModel.find(payload)
    
   
 //   res.send({result:result})
    RestaurantModel.find(payload).sort({ min_price: sort }).then(result => {
       const count = Math.ceil(result.length / 5);
       const pageCountArr = [];
       const resultValues = result.slice(start, end);  // to return paginated items
       for (var i = 1; i <= count; i++) {
            pageCountArr.push(i);
       }
      res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: resultValues, pageCount: pageCountArr, totalCount: result.length });
    }).catch(err => {
       res.status(500).json({ message: err })
   });
}


  

