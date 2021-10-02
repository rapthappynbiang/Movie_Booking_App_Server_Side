module.exports = mongoose => {
    const Genres = mongoose.model(
        "genres",
        mongoose.Schema({
            genreid: {type: Number},
            genre: {type: String}
        })
    )
    return Genres;
}

//structure of genres schema
// {
// "genreid": 1,
//  "genre": "comedy"
// }