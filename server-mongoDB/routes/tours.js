const fs = require('fs');
//--------------------
const Guide = require('../models/guide')
const Tour = require('../models/tour')



    module.exports = {
    createTour: function (req, res) {
        const tour = new Tour(req.body);
        tour.save().then(tour => {
            res.status(201).send(tour)
        }).catch(e => {
            res.status(400).send(e)
        });
    },

    // CREATE guide
    createGuide: function (req, res) {
        const guide = new Guide(req.body);
        guide.save().then(guide=>
            res.status(201).send(guide)
        ).catch(e=>res.status(400).send(e))
    },
    
    // create site in tour
    createSiteInPath: function (req, res) 
    {
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');
        if(!req.body) return res.status(400).send('Body is missing!');
        if(!req.body.name || !req.body.country) {
            console.log(req.body)
            // console.log(req.body.country)

            return res.status(400).send('fields are missing!');
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'country'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        Tour.updateOne({_id : req.params.id},  { $addToSet: {path: req.body }}, { new: true, runValidators: false }).then(tour => {//disabled runValidators
            if (!tour) {
                return res.status(404).send()
            }
            else {
                // console.log(tour)
                tour.n == 0 ? res.send("ID does not exist"):
                res.send("Tour updated")
            }
        }).catch(e => res.status(400).send(e))
    
           
    },
    
    // get all tours
    getTours: function (req, res) {
        //return all the tours with the guides details inside sortd by name
        Tour.find().populate('guide').then(tours => res.send(tours.sort(
            (val1, val2)=>{
                if(val1.name > val2.name)
                  return 1;
                else if(val1.name < val2.name)
                  return -1;
                else 
                  return 0;
              }
        ))
        ).catch (e=> res.status(500).send())
    },
    
    // get guides
    getGuides: function (req, res) {
        Guide.find().then(guides =>
            res.send(guides)
        ).catch(e => res.status(500).send())
    },

    // get tour
    getTour: function (req, res)
    {
        //get a tour by name and return it
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');
        Tour.findOne({_id:tripId}).populate('guide').then(tour =>
            tour ? 
            res.send(tour): res.send("ID does not exist") 
        ).catch(e => res.status(500).send())
    },

    // edit tour
    updateTour: function (req, res) {
        const tripId = req.params["id"];
        //Validators
        if (!tripId) return res.status(400).send('Id is missing!');
        if(!req.body) return res.status(400).send('Body is missing!');

        const updates = Object.keys(req.body)
        const allowedUpdates = ['date', 'duration', 'price']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        //update the mongo db and return the updated object
        Tour.updateOne({_id : req.params.id}, req.body, { new: true, runValidators: true }).then(tour => {
            if (!tour) {
                return res.status(404).send()
            }
            else {
                // console.log(tour)
                tour.n == 0 ? res.send("ID does not exist"):
                res.send("Tour updated")
            }
        }).catch(e => res.status(400).send(e))
    },

    // delete site
    deleteSite: function (req, res)
    {
        const tripId = req.params["id"];
        const siteName = req.params["siteName"];
        if(siteName == null|| tripId == null) return res.status(400).send('id or site name is missing!');
        Tour.updateOne({_id:tripId},  { $pull: {path: {name: siteName} }}, { new: true, runValidators: false }).then(tour => {//disabled runValidators
            if (!tour) {
                return res.status(404).send()
            }
            else {
                tour.n == 0 ? res.send("ID does not exist"):
                res.send(tour)
            }
        }).catch(e => res.status(400).send(e))
    },
    
    // delete tour
    deleteTour: function (req, res) {
        const tripId = req.params["id"];
        if (!tripId) return res.status(400).send('Id is missing!');
        Tour.deleteOne({_id:tripId}).then(tour => {
            tour.n !=0 ? 
            res.send("Tour deleted"): res.send("There is no such tour") 
        }
        ).catch (e=> res.status(500).send("There is no such tour"));
    },

    deleteGuide: function (req, res) {
        const guideId = req.params["id"];
        if (!guideId) return res.status(400).send('Id is missing!');
        Guide.deleteOne({_id:guideId}).then(guide => 
            guide.n !=0 ? 
            res.send("guide deleted"): res.send("There is no such guide") 
        ).catch (e=> res.status(500).send("There is no such guide"));
    }
    
};

