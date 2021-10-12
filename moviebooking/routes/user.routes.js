module.exports = app => {
    //import user.controller
   const  user = require('../controllers/user.controller');

   //importing express router 
   const router = require('express').Router();

   //POST/auth/signup
   router.post("/auth/signup", user.signUp);

   //POST/auth/login
   router.post("/auth/login", user.login);

   
   //POST/auth/logout
   router.post("/auth/logout", user.logout);

   //GET /getCouponCode 
   router.get('/auth/coupons', user.getCouponCode);

   //GET /bookShow
   router.post('/auth/bookings', user.bookShow);

   app.use('/api', router);

}