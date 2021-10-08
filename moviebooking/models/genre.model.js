module.exports = mongoose => {

    const Genre = mongoose.model(
        "genres",
        mongoose.Schema({
            genreid: {type: Number},
            genre: {type: String}
        })
    )
    return Genre;
}

//structure of genres schema
// {
// "genreid": 1,
//  "genre": "comedy"
// }