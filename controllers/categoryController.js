const Category = require("../models/category")



exports.addCategory=async(req,res,next)=>{

      let {name} = req.body

      if(!name){
          res.status(400).json({
              success:false,
              message:"Name should not be empty."
          })
      }

      let categories = await Category.find()
    console.log(categories[0].name)
      if(categories.length>0){
        
        Category.findByIdAndUpdate( { _id: categories[0]._id }, 
            { $push: { name: name } })
        // Category.save()
        .then(()=>res.status(200).json({success:true})).catch(()=>res.status(400).json({success:false}))
      }else{
          let newCategory = await Category.create({name:name})
          if(newCategory){
              res.status(200).json({success:true})
          }else{
              res.status(400).json({success:false})
          }
      }


        
  
}


exports.getCategories=(req,res,next)=>{
    try {
        Category.find()
        .then((response)=>{
            res.status(200).json({
                success:true,
                data:response[0].name
            })
        })
        .catch((e)=>{
            res.status(400).json({
    
                success:false,
                message:e
            })
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }

}