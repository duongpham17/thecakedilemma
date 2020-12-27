const mongoose = require('mongoose')
const app = require('./app');

const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

//connect to MongoDB using mongoose
const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect( db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    //when in development will display to console.
    if (process.env.NODE_ENV === "development") {
        console.log("DB connection successful!");
    }
});

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on port ${port}`))
