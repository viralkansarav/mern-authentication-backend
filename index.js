const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model');
const jwt = require('jsonwebtoken')
const productModel = require('./models/product.model');


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/assignment')


app.post('/api/register', async (req,res)=>{
    try {
        await User.create({
            name:req.body.name,
            username:req.body.username,
            password:req.body.password
        });
        res.json({status:'ok'})
    } catch (error) {
        res.json({status:'error', error:'duplicate email'})
    }

})

app.post('/api/login', async (req, res) => {
  
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token =jwt.sign({
                name: user.name,
                username: user.username
            },'secret123')
            return res.json({ status: 'ok', user: token });
        } else {
            return res.json({ status: 'error', user: false });
        }
});
app.get('/api/home', async (req, res) => {
  const token = req.headers.authorization;

  // Check if the token is present in the request header
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }

  // Verify the JWT token
  jwt.verify(token, 'secret123', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 'error', message: 'Token verification failed' });
    }

    try {
     
      const products = await productModel.find();
      
      res.json({ status: 'ok', message: 'Authenticated', products });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  });
});





app.listen(8080, ()=>{
    console.log(`server is listening to the port 8080`)
})