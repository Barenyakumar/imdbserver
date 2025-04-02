const Producer = require("../db/models/Producer")


module.exports = (app) => {
    app.post('/producer', async(req,res)=> {
        try {
            const producer = new Producer(req.body);
            const savedProducer = await producer.save();
            res.status(201).json(savedProducer);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

    app.get('/producers', async(req,res)=> {
        try {
            const producers = await Producer.find();
            res.json(producers);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

    app.get('/producer/:id', async(req,res)=> {
        try {
            const producer = await Producer.findById(req.params.id);
            if(!producer) {
                return res.status(404).json({error: "Producer not found"});
            }
            res.json(producer);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    })

    app.put('/producer/:username', async(req,res)=> {
            console.log("reached here")
            try {
                console.log("req.body", req.body)
                console.log("req.params", req.params)
                const updatedProducer  = await Producer.findOneAndUpdate({username: req.params.username}, req.body, {new: true});
                console.log("updatedProducer", updatedProducer)
                if(!updatedProducer) {
                    return res.status(404).json({error: "Producer not found"});
                }
                res.json(updatedProducer);
            } catch (error) {
                console.log("err",error)
            }
        })

    app.put('/producer/:id', async(req,res)=> {
        try {
            const updatedProducer = Producer.findByIdAndUpdate(req.params.id, req.body, {new : true});
            if(!updatedProducer) {
                return res.status(404).json({error: "Producer not found"});
            }
            res.json(updatedProducer);
        } catch (error) {
            
        }
    })

    app.delete('/producer/:id', async(req,res)=> {
        try {
            const updatedProducer = Producer.findByIdAndDelete(req.params.id);
            if(!updatedProducer) {
                return res.status(404).json({error: "Producer not found"});
            }
            res.json(updatedProducer);
        } catch (error) {
            
        }
    })


}