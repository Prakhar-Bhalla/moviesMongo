const express = require("express");

const app = express();

const mongoose = require("mongoose");

app.use(express.json());

const connect = () => {
    return mongoose.connect("mongodb+srv://Prakhar2266:Bhalla2266@cluster0.pvv3v.mongodb.net/entertainment");
}

const movieSchema = new mongoose.Schema({
    movie_name : {type: String, required: true},
    movie_genre : {type: String, required: true},
    budget : {type: Number, required: true},
    production_year: {type: Number, required: true}
}, {versionKey: false, timestamps: true});

const Movie = mongoose.model("movie", movieSchema);

app.get("/movies", async(req, res) => {
    try{
        const movies = await Movie.find().lean().exec();
        return res.send(movies);
    } catch(e) {
        res.status(500).json({message : e.message});
    }
});

app.post("/movies", async(req, res) => {
    try{
        const newMovie = await Movie.create(req.body);
        res.status(201).send(newMovie); 
    } catch(e) {
        res.status(500).json({message : e.message});
    }
});

app.get("/movies/:id", async(req, res) => {
    try{
        const movie = await Movie.findById(req.params.id).lean().exec();
        return res.send(movie);
    } catch(e) {
        res.status(500).json({message : e.message});
    }
});

app.patch("/movies/:id", async(req, res) => {
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.status(201).send(movie);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.delete("/movies/:id", async(req, res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id);
        res.status(200).send(movie);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
})


app.listen(2800, async() => {
    console.log("listening port 2800");
    connect();
});