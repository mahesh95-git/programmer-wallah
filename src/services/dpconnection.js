import mongoose from "mongoose";
let connection = null | global
const dpConnect = async () => {
    try {
        if (connection) {
            throw Error("database already connected");
        }
        const url = process.env.MONGO_URL; 
        if (!url) {
            throw Error("please provide mongodb connection string");
        }


        

        connection = await mongoose.connect(url, {
            dbName: "wcode"
        })

        console.log("mongodb Connected successfully");
    } catch (error) {
        console.log(error.messsage);
    }
}
export default dpConnect