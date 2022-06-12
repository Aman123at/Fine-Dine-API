const Cart = require("../models/cart")



exports.addCart=async(req,res,next)=>{

      let {itemName,quantity,totalPrice} = req.body

      if(!itemName || quantity==0 || totalPrice==0){
          res.status(400).json({
              success:false,
              message:"All fields required."
          })
      }

      Cart.create({
        itemName,
        quantity,
        totalPrice,
        user:req.user
      })

    .then((response)=>{
        res.status(200).json({
            success:true,
            response
        })
    }).catch((e)=>{
        res.status(400).json({
    
            success:false,
            message:e
        })
    }
    
    )

}


exports.getCart=(req,res,next)=>{
   Cart.find()
   .then((data)=>{
    res.status(200).json({
        success:true,
        data
    })
   })
   .catch((e)=>{
    res.status(400).json({
    
        success:false,
        message:e
    })
   })

}