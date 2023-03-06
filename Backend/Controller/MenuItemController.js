const MenuItemModel = require("../model/MenuItem")
module.exports.getMenuItemsByRestaurant= async (req,res)=>{
    let {id} = req.params;
    try {
        let result = await MenuItemModel.find({ restaurantId: id });
        res.status(200).send({
          status: true,
          result,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          status: false,
          message: "server error",
        });
      }
    
}