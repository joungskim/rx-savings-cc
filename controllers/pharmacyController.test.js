const { getNearest } = require('./pharmacyController.js');
const Pharmacy = require('../model/Pharmacy');
const { getPoint, getDistance, nearestPharmacy } = require('../helpers/distanceHelper.js');

jest.mock('../helpers/distanceHelper.js');

const VALIDATION_LAT_ERROR = `"latitude" must be a number`;
const VALIDATION_LON_ERROR = `"longitude" must be a number`;

const reqErrLat = {
    body: {
        latitude: "string",
        longitude: 31
    }
};

const reqErrLon = {
    body: {
        latitude: 31,
        longitude: "string"
    }
};

const req = {
    body: {
        latitude: 31,
        longitude: 1
    }
};

const pharmacy = {
    name: "Walmart",
    address: "1234 Walmart",
    city: "Overland Park",
    state: "KS",
    zip: "66204",
    latitude: 1.3,
    longitude: -1.3,
    distance: 1
};

const evalPharmacy = {
    name: "Walmart",
    address: "1234 Walmart",
    city: "Overland Park",
    state: "KS",
    zip: "66204",
    distance: 1
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('getNearest', () => {
    let res;
    beforeAll(() => {
        jest.clearAllMocks();
        res = mockResponse();
        Pharmacy.find = jest.fn().mockResolvedValue(pharmacy);
    });
    test('Should fail latitude validation.', async() => {
        await getNearest(reqErrLat, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(VALIDATION_LAT_ERROR);
    });
    test('Should fail latitude validation.', async() => {
        await getNearest(reqErrLon, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(VALIDATION_LON_ERROR);
    });
    test('Should return a response with status 200 and pharmacy object', async() => {
        nearestPharmacy.mockReturnValue(pharmacy);
        getDistance.mockReturnValue(1);
        getPoint.mockReturnValue(req);

        await getNearest(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(evalPharmacy);
    });
});