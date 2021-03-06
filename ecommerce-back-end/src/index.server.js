const express = require('express');
const env = require('dotenv');
const app= express();
const mongoose = require ('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
//environment variable
env.config();

//mongodb connection
//mongodb+srv://user_1234:<pnpassword>@cluster0.yb72g.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.yb72g.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected');
});

//app.use(express.json());

/*app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello Aparna'
    });
});

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    });
});*/

//Error: app.use(bodyParser());

app.use(express.json());

app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});