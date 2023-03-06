

const locationModel = require("../model/LocationModels")

module.exports.getLocation = async (request, response) => {
  let result = await locationModel.find();
  response.status(200).send({
    status: true, //react
    result,
  });
};

module.exports.aboutUs = (req, res) => {
  res.status(200).send({
    status: false,
    message: "Hello this is about"
  })
}


module.exports.getLocationbyID = async (req, res) => {
  let { id } = req.params
  console.log(id)
  let locationList = await locationModel.find()
  console.log(locationList)
  let result =  locationList.find((location) => {
    if (Number(id) === location.location_id) {
      return location
    }
   
  })

   console.log(result)
  
  res.status(200).send({
    status: true,
    result
  })
}

