const neatCsv = require('neat-csv');
const fs = require('fs');
const Pharmacy = require('../model/Pharmacy');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const { seederValidation } = require('../helpers/validation')

const seedDatabase = async() => {
    //.env file
    dotenv.config({
        path: './.env'
    });
    //Connect to rxsavings DB
    await mongoose.connect(process.env.CONNECTDB, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
        console.log('Successfully connected to DB')
    );
    await fs.readFile('./pharmacies.csv', async(err, data) => {
        if (err) throw err;
        const csvData = await neatCsv(data)
        await Promise.all(csvData.map(async(data) => {
            try {
                const { error } = await seederValidation(data);
                if (error) throw error;

                const pharmacy = new Pharmacy({
                    name: data.name.trim(),
                    address: data.address.trim(),
                    city: data.city.trim(),
                    state: data.state.trim(),
                    zip: Number(data.zip),
                    latitude: Number(data.latitude),
                    longitude: Number(data.longitude)
                });
                const savedUser = await pharmacy.save();
                console.log("Seeded to database: " + pharmacy.name)
            } catch (err) {
                console.log("Failed to seed while saving to the database: " + err)
            }
        }));
        await mongoose.disconnect();
        console.log("Disconnected from database.")
    })
};

seedDatabase();


module.exports.seedDatabase = seedDatabase;