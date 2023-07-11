exports.testUser = (req,res) => {
    try {
       let {name} = req.body
        res.status(200).json({
            name
        })
    } catch (error) {
        console.error(error)
    }
}