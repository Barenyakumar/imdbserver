const Actor = require("../db/models/actor.js");


module.exports = (app) => {
    console.log("Reacehed i")
    app.post('/actor', async(req,res)=> {
        try {
            const actor = new Actor(req.body);
            const savedActor = await actor.save();
            res.status(201).json(savedActor);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

    app.get('/actors', async(req,res)=> {
        try {
            const actors = await Actor.find();
            res.json(actors);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

    app.get('/actor/:id', async(req,res)=> {
        try {
            const actor = await Actor.findById(req.params.id);
            if(!actor) {
                return res.status(404).json({error: "Actor not found"});
            }
            res.json(actor);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

    app.put('/actor/:username', async(req,res)=> {
        console.log("reached here")
        try {
            console.log("req.body", req.body)
            console.log("req.params", req.params)
            const updatedActor  = await Actor.findOneAndUpdate({username: req.params.username}, req.body, {new: true});
            console.log("updatedActor", updatedActor)
            if(!updatedActor) {
                return res.status(404).json({error: "Actor not found"});
            }
            res.json(updatedActor);
        } catch (error) {
            console.log("err",error)
        }
    })

    app.put('/actor/:id', async(req,res)=> {
        try {
            const updatedActor = Actor.findByIdAndUpdate(req.params.id, req.body, {new : true});
            if(!updatedActor) {
                return res.status(404).json({error: "Actor not found"});
            }
            res.json(updatedActor);
        } catch (error) {
            
        }
    })

    

    app.delete('/actor/:id', async(req,res)=> {
        try {
            const updatedActor = Actor.findByIdAndDelete(req.params.id);
            if(!updatedActor) {
                return res.status(404).json({error: "Actor not found"});
            }
            res.json(updatedActor);
        } catch (error) {
            
        }
    })


}