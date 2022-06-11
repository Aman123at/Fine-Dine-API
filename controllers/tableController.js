
const Table = require("../models/table")


exports.addTable=(req,res,next)=>{
    try {
        let {tableCount} = req.body
        if(tableCount==0){
            res.status(400).json({
                success:false,
                message:"Table count should not be 0."
            })
        }else{
            let allTables=[]
            
            Table.count().then((r)=>{
                for (let index = 0; index < tableCount; index++) {
                    let tableObj = {
                        tableNo:r+index+1,
                        status:'free'
                        
                    }
                    allTables.push(tableObj)
                     
                 }

                 console.log(allTables)

                Table.insertMany(allTables)
                .then((response)=>res.status(200).json({success:true,response}))
                .catch(e=>res.status(400).json({success:false,e}))
                        })
            .catch((e)=>{
                res.status(400).json({success:false,message:"unable to get count."})
            })
          
            
        }
    } catch (error) {
        res.status(500).json(error)
    }
   
}


exports.getAllTables = (req,res,next)=>{
    try {
        Table.find()
        .then((table)=>{
            res.status(200).json({data:table})
        })
        .catch((e)=> res.status(400).json({success:false,message:e}))
        
    } catch (error) {
        res.status(500).json(error)
    }
}