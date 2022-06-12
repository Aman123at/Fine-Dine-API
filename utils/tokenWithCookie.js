const tokenWithCookie = (user,res)=>{
    const token = user.getjwt()

    const cookieOpts = {
        expires : new Date(
            Date.now() + (2*24*60*60*1000)
        ),
        httpOnly:true

    }
    user.password = undefined
    if(user.role == 'manager'){

        user.tableNo=undefined
    }
    res.status(200).cookie('token',token,cookieOpts).json({
        success:true,
        token,
        user
    })
}

module.exports = tokenWithCookie

