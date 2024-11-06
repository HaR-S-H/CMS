import mongoose, { connect } from "mongoose";
const connectedDB = () =>{
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("DB is connected");
        
    } catch (error) {
        console.log("MONGODB  server error");
        
    }
}

export default connectedDB;