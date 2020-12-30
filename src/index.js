import express from 'express';
import mongoose, { model, Schema } from 'mongoose';

const app = express();
app.use(express.json());

const genreSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
});

const Genre = mongoose.model('Genre', genreSchema);

const Movie = mongoose.model('Movie', {
    title: { type: String, require: true },
    description: { type: String, require: true },
    copies: { type: Number, require: true },
    IsAvailable: { type: Boolean, default: true},
    genre: { type: genreSchema, require: true },
});


    app.get('/api/genries', async (req, res) => {
        const genries = await Genre.find();
        res.send(genries);
    });

    app.get('/api/genries/:id', async (req, res) => {
        const genries = await Genre.findById(req.params.id);
        res.send(genries);
    });

    app.post('/api/genries', async (req, res) => {
        const { name, description } = req.body;
        const genre = new Genre({name, description});
        const result = await genre.save();
        res.send(result);
    });

    app.put('/api/genries/:id', async (req, res) => {
        const body = {
            name: req.body.name,
            description: req.body.description,
        };
        const genries = await Genre.findByIdAndUpdate(req.params.id, body, {
            new: true,
        }); 
        res.send(genries);
    });

    app.delete('/api/genries/:id', async (req, res) => {
        const result = await Genre.findByIdAndDelete(req.params.id);
        res.send(result);
    });

    app.get('/api/movies', async (req, res) => {
        const movies = await Movie.find();
        res.send(movies);
    });

    app.get('/api/movies/:id', async (req, res) => {
        const movies = await Movie.findById(req.params.id);
        res.send(movies);
    });
    
    app.post('/api/movies', async (req, res) => {
        const { title, description, copies, genreID, IsAvailable } = req.body;
        const genre = await Genre.findById(genreID);
        const movies = new Movie({
            title,
            description,
            copies,
            IsAvailable,
            genre: {
                _id: genre._id,
                name: genre.name,
            },
        });   
        const result = await movies.save();
        res.send(result);
    });

    app.put('/api/movies/:id', async (req, res) => {
        const body = {
            title: req.body.title,
            description: req.body.description,
            copies: req.body.copies,
            IsAvailable: req.body.IsAvailable,
        };
        const movies = await Movie.findByIdAndUpdate(req.params.id, body, {
            new: true,
        });
        res.send(movies);
    }); 

    app.delete('/api/movies/:id', async (req, res) => {
        const result = await Movie.findByIdAndDelete(req.params.id);
        res.send(result);
    });

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/movieDB', {
            useNewUrlParser: true,
        });
        console.log('connected to mongoDB...');
    } catch (error) {
        console.log('could not connect to mongoDB...');
    }
    };
    connectToDB();
    
    app.listen(3001, () => console.log(`Listening to Port 3001`));