import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;


const connectToDB = async () => {

    try {
        if (DATABASE_URL) {
            let conn = await mongoose.connect(DATABASE_URL, {
                dbName: "watchitout",
            });
            console.log('Connected to the database!');
        } else {
            console.error("Please enter your database url into the .env file (i.e. DATABASE_URL = 'YOUR DATABASE URL'")
        }
    } catch (error) {
        console.error("Error: Unable to connect to the database");
        console.error(error);
    }
}

export default connectToDB;