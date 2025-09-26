const mongoose=require("mongoose")
const url=process.env.MONGODBURL
const connectDb=async()=>{
try{
    const response=await mongoose.connect(url)
if(response){
    console.log("Mongodb connected")
}
else{
    console.log("Error while connecting")
}
}
catch(error){
    console.log("error",error)
    process.exit(1)
}
}
module.exports = connectDb;