const { getPoint, getDistance, nearestPharmacy } = require('../helpers/distanceHelper');
const Pharmacy = require('../model/Pharmacy');
const { getDistanceValidation } = require('../helpers/validation');

const getNearest = async(req, res) => {
    const { error } = getDistanceValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const pharmacies = await Pharmacy.find();

    const startLoc = {
        longitude: Number(req.body.longitude),
        latitude: Number(req.body.latitude)
    }

    const nearPharm = nearestPharmacy(startLoc, pharmacies);
    const distance = getDistance(startLoc, getPoint(nearPharm));

    const response = {
        name: nearPharm.name,
        address: nearPharm.address,
        city: nearPharm.city,
        state: nearPharm.state,
        zip: nearPharm.zip,
        distance: distance
    }

    res.status(200).send(response);
}

module.exports.getNearest = getNearest;