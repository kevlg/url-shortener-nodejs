import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(
            `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        );
    } catch (error) {
        console.log(error);
    }
};