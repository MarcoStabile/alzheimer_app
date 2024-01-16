// models/patientModel.js

const { MongoClient, ObjectId } = require('mongodb');

// MongoDB Collection Schema
const patientSchema = {
    name: String,
    surname: String,
    dateOfBirth: Date,
    sonsNames: [String],
    medicines: [
        {
            name: String,
            dose: String,
        },
        // Add other medicine fields as needed
    ],
    photos: [String], // Array of photo URLs
    // Add other fields as needed
};

module.exports = patientSchema;
