const { getPoint, getDistance, nearestPharmacy } = require('./distanceHelper');
const { get } = require('mongoose');


const WALMART = 'Walmart';
const TARGET = 'Target';
const CVS = 'CVS';
const pharmacies = [{
    name: "Walmart",
    address: "1234 Walmart",
    city: "Overland Park",
    state: "KS",
    zip: "66204",
    latitude: 1.3,
    longitude: -1.3
}, {
    name: "Target",
    address: "1234 Target",
    city: "Overland Park",
    state: "KS",
    zip: "66204",
    latitude: 2.4,
    longitude: -2.4
}, {
    name: "CVS",
    address: "1234CVS",
    city: "Overland Park",
    state: "KS",
    zip: "66204",
    latitude: 5.3,
    longitude: -5.3
}]

const points = [{
    latitude: 1.3,
    longitude: -1.3
}, {
    latitude: 2.4,
    longitude: -2.4
}, {
    latitude: 5.3,
    longitude: -5.3
}]

const startPoints = [{
    latitude: 1.4,
    longitude: -1.4
}, {
    latitude: 2.5,
    longitude: -2.6
}, {
    latitude: 5.4,
    longitude: -5.4
}]

describe("getPoint", () => {
    test("it should return an object with the correct latitude and longitude.", () => {
        expect(getPoint(pharmacies[0])).toStrictEqual(points[0]);
        expect(getPoint(pharmacies[1])).toStrictEqual(points[1]);
        expect(getPoint(pharmacies[2])).toStrictEqual(points[2]);
    });
});


describe("nearestPharmacy", () => {
    test("it should return the nearest pharmacy.", () => {
        expect(nearestPharmacy(startPoints[0], pharmacies)).toEqual(pharmacies.find(p => p.name === WALMART));
        expect(nearestPharmacy(startPoints[1], pharmacies)).toEqual(pharmacies.find(p => p.name === TARGET));
        expect(nearestPharmacy(startPoints[2], pharmacies)).toEqual(pharmacies.find(p => p.name === CVS));
    });
});

describe("getDistance", () => {
    test("it should return 0 if the points are the same.", () => {
        expect(getDistance(points[0], points[0])).toEqual(0);
    });
    test("it should calculate the correct miles.", () => {
        expect(getDistance(startPoints[0], points[0])).toEqual(9.76944493572688);
        expect(getDistance(startPoints[1], points[1])).toEqual(15.437695640328059);
        expect(getDistance(startPoints[2], points[0])).toEqual(400.2175130248854);
    })
    test("it should calculate the correct kilometers.", () => {
        expect(getDistance(startPoints[0], points[0], 'K')).toEqual(15.722397590642442);
        expect(getDistance(startPoints[1], points[1], 'K')).toEqual(24.844562852588123);
        expect(getDistance(startPoints[2], points[0], 'K')).toEqual(644.0876532815213);
    })

    test("it should calculate the correct nautical miles.", () => {
        expect(getDistance(startPoints[0], points[0], 'N')).toEqual(8.483785982185223);
        expect(getDistance(startPoints[1], points[1], 'N')).toEqual(13.406094894060885);
        expect(getDistance(startPoints[2], points[0], 'N')).toEqual(347.54888831081047);
    })
});