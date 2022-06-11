const Item = require('../models/item')
const cloudinary = require('cloudinary')
const { convertToArray } = require('../utils/itemUtils')



exports.addItem = async (req,res,next)=>{
    
        
    
    let photos = []
    if(!req.files){
        res.status(400).json({
            success:false,
            message:"Images are required."
        })
    }

    if(req.files){
        let allImages = req.files.images
        let arrayImages = convertToArray(allImages)
        for (let index = 0; index < arrayImages.length; index++) {
            let resp = await cloudinary.v2.uploader.upload(arrayImages[index].tempFilePath,{
                folder:"items"
            })

            console.log("response",resp)

            photos.push({
                id:resp.public_id,
                secure_url:resp.secure_url
            })
            
        }
        console.log("PHOTOS",photos)
        req.body.images = photos
        req.body.user = req.user.id
    
        await Item.create(req.body).then(()=>{
             res.status(200).json({
                 success:true,
                 
             })
         }).catch((e)=>console.log(e))
    }
    






}



exports.getItems = (req,res,next)=>{
    Item.find({}).then((response)=>{
        res.status(200).json({
            success:true,
            data:response
        })
    }).catch((e)=>{
        res.status(500).json({
            success:false,
            message:"Unable to get Item."
        })
    })
}



exports.getOneItem = (req,res,next)=>{
    let {id} = req.params
    try {
        Item.findById(id)
        .then((response)=>{
            res.status(200).json({
                success:true,
                data:response
            })
        })
        .catch((e)=>{
            res.status(400).json({
                success:false,
            message:"Unable to get Item by Id."
            })
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}