module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema({
            userid: {type: String, required: true, unique: true},
            email:{type: String, required: true, unique: true}, 
            first_name: {type: String, required: true}, 
            last_name: {type: String, required: true}, 
            username:{type: String, required: true, unique: true},
            contact:{type: Number}, 
            password:{type: String, required: true},
            role:{type: String, default: "user"}, 
            isLoggedIn: {type: Boolean, default: false}, 
            uuid: {type: String, default: "", unique: true}, 
            accesstoken: {type: String, default: ""},
            coupons:[
               {
                  id:{type: Number}, discountValue: {type: Number} 
               }
            ],
            bookingRequests:[
               {
                  reference_number:{type: Number},
                  coupon_code:{type: Number},
                  show_id: {type: Number},
                  tickets:[Number]
               }
            ]
        })
    )

    return User;
}
/**NOTE PLEASE HASH The Password If You would insert the day manually from mongodb cmd line*/
//Structure for user schema
// {
//     "userid": 1,
//     "email":"a@b.com", 
//     "first_name": "user1", 
//     "last_name": "user1", 
//     "username":"test",
//     "contact":"9898989898", 
//     "password":"$2b$10$yHRzc..z/QjtnWuA5WfZH.c27czRiuyMDaxwAL1/9pjLVIKLrwauW",
//     "role":"user", 
//     "isLoggedIn": false, 
//     "uuid":"", 
//     "accesstoken":"",
//     "coupens":[
//        {
//           "id":101,discountValue: 101 
//        },
//        {"id":102,discountValue: 102 
//        }
//     ],
//     "bookingRequests":[
//        {
//           "reference_number":29783,
//           "coupon_code":101,show_id: 1003,tickets:[1,3]
//        },
//        {
//           "reference_number":19009,
//           "coupon_code":201,show_id: 1002,tickets:[1]
//        }
//     ]
//  }