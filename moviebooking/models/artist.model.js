module.exports = mongoose => {
    const Artist = mongoose.model(
        "artists",
         mongoose.Schema({
            artistid: {type: Number},
            first_name: {type: String, required: true}, 
            last_name: {type: String, required: true},
            wiki_url:{type: String},
            profile_url:{type: String},
            movies:[Object]
        }))
         return Artist;
}

// {"artistid": 1,
//  "first_name": "amitabh", 
//  "last_name": "bachchan",
//   "wiki_url":"https://en.wikipedia.org/wiki/Amitabh_Bachchan",
//    "profile_url":"https://wikibio.in/wp-content/uploads/2017/12/Amitabh-Bachchan.jpg",
//     "movies":[]
// }