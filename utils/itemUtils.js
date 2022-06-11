exports.convertToArray = (data)=>{
    let newArray = []
    if(!data.length){
        newArray.push(data)
    }else{

        data.map((val)=>{
            newArray.push(val)
        })
    }

    return newArray
}