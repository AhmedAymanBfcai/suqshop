import mongoose from 'mongoose' 

//We Use here async and await as when we connect the database functions will return promise.
const connectDB = async () => {
    try {
        const connectionURL = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true, //To use the new Server Discover and Monitoring engine
            useNewUrlParser: true, //The UrlParser was originally used by defalut but it is being deprecated and required to pass in this option in order for Url is to be passed correctly so we can actually connecdt so the server. 
            useCreateIndex: true  // That is will make sure that when mongoose works with mongoDB our indexes are Created allowing us to quickly access the data we neeed to access.
        })

        console.log(`MongooDB connected: ${connectionURL.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB