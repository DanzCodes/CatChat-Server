import { connect } from "mongoose";

const database = async () => {
    try {
        const database = await connect(process.env.MONGO_DATABASE_URL || '', {
            dbName: process.env.MONGO_DATABASE_NAME
        });

        console.log("Database connected!")
        return database;
    }
    catch(err) { console.error(err) }
}

export default database;