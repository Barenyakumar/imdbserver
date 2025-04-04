const Actor = require("../db/models/actor");
const Movie = require("../db/models/Movie");
const Producer = require("../db/models/Producer");

module.exports = (app) => {
  app.get("/movies", async (req, res) => {
    try {
      const movies = await Movie.find().populate("producer").populate("actors");
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/movie/:id", async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate("producer")
        .populate("actors");
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/movie", async (req, res) => {
    try {
      let {
        name,
        yearOfRelease,
        plot,
        poster,
        producer,
        actors = [],
        newProducer,
        newActors = [],
      } = req.body;
      let allActorIds;
      if (newProducer) {
        const producerInfo = new Producer(newProducer);
        const savedProducer = await producerInfo.save();
        producer = savedProducer._id;
      }
      if (newActors && Array.isArray(newActors)) {
        const createdActors = await Promise.all(
          newActors.map(async (actorData) => {
            const existingActor = await Actor.findOne({
              username: actorData.username,
            });
            if (existingActor) return existingActor._id;

            const actorDoc = new Actor(actorData);
            return (await actorDoc.save())._id;
          })
        );
        // actors = actors ? actors.concat(createdActors) : createdActors;
        allActorIds = [...actors, ...createdActors];
      }

      const movie = new Movie({
        name,
        yearOfRelease,
        plot,
        poster,
        producer,
        actors: allActorIds,
      });

      const savedMovie = await movie.save();
      console.log("savedmovie", savedMovie);
      const populatedMovie = await Movie.findById(savedMovie._id)
        .populate("producer")
        .populate("actors");
      res.status(201).json(populatedMovie);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/movie/:id", async (req, res) => {
    try {
      let {
        name,
        yearOfRelease,
        plot,
        poster,
        producer,
        actors = [],
        newProducer,
        newActors = [],
      } = req.body;
  
      let allActorIds = [];
  
      // If newProducer data is provided, create it and update the producer reference
      if (newProducer) {
        const producerInfo = new Producer(newProducer);
        const savedProducer = await producerInfo.save();
        producer = savedProducer._id;
      }
  
      // Process newActors: for each new actor, check if they exist by username; if not, create a new record
      if (newActors && Array.isArray(newActors)) {
        const createdActors = await Promise.all(
          newActors.map(async (actorData) => {
            const existingActor = await Actor.findOne({
              username: actorData.username,
            });
            if (existingActor) return existingActor._id;
  
            const actorDoc = new Actor(actorData);
            return (await actorDoc.save())._id;
          })
        );
        allActorIds = [...actors, ...createdActors];
      } else {
        allActorIds = actors;
      }
  
      // Update the movie document with new values
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          name,
          yearOfRelease,
          plot,
          poster,
          producer,
          actors: allActorIds,
        },
        { new: true }
      )
        .populate("producer")
        .populate("actors");
  
      if (!updatedMovie)
        return res.status(404).json({ error: "Movie not found" });
  
      res.json(updatedMovie);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: error.message });
    }
  });
  

  // DELETE a movie by id
  app.delete("/movie/:id", async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
      res.json({ message: "Movie deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};
