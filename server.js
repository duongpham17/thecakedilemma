const mongoose = require('mongoose')
const app = require('./app');

//connect to MongoDB using mongoose
(async () => {
    const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
    const use = {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false};
    try{
        await mongoose.connect( db , use )
        if (process.env.NODE_ENV === "development") console.log("DB connection successful!");
    } catch (err){
        console.log("Could not connect to database")
    }
})();

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on port ${port}`))
