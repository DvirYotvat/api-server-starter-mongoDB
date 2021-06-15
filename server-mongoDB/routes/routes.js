const express = require('express'),
    tripsRoutes = require('./tours');

var router = express.Router();

router.post('/createGuide', tripsRoutes.createGuide);
router.post('/createTour/:id', tripsRoutes.createTour);
router.post('/createSiteInPath/:id', tripsRoutes.createSiteInPath);
router.get('/getTours', tripsRoutes.getTours);
router.get('/getTour/:id', tripsRoutes.getTour);
router.get('/getGuides', tripsRoutes.getGuides);
router.put('/updateTour/:id', tripsRoutes.updateTour);
router.delete('/deleteSite/:id/:siteName', tripsRoutes.deleteSite);
router.delete('/deleteTour/:id', tripsRoutes.deleteTour);
router.delete('/deleteGuide/:id', tripsRoutes.deleteGuide);


module.exports = router;