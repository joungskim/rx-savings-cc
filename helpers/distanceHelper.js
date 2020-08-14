const MILES_TO_KILOMETERS = 1.609344;
const MILES_TO_NAUTICAL_MILES = 0.8684;

//returns destructured pharmacy object for lat/long
const getPoint = (pharmacy) => {
    return { latitude: pharmacy.latitude, longitude: pharmacy.longitude };
};

// Returns distance of two points.  Must be Long/Lat Objects. 
// Got logic from https://www.geodatasource.com/developers/javascript
const getDistance = (start, end, unit) => {
    const lat1 = start.latitude;
    const lon1 = start.longitude;
    const lat2 = end.latitude;
    const lon2 = end.longitude;

    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * MILES_TO_KILOMETERS };
        if (unit == "N") { dist = dist * MILES_TO_NAUTICAL_MILES };
        return dist;
    }
};

// Returns nearest pharmacy.  Takes start point (long/lat) and pharmacies array object.
const nearestPharmacy = (point, pharmacies) => {
    return pharmacies.sort((a, b) => {
        return getDistance(point, getPoint(a)) - getDistance(point, getPoint(b));
    })[0];
};

module.exports.getPoint = getPoint;
module.exports.getDistance = getDistance;
module.exports.nearestPharmacy = nearestPharmacy;