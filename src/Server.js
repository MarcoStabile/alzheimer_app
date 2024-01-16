// server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');

    // Define a route to handle the input and store it in the 'test' collection
    app.post('/api/saveInput', (req, res) => {
        const { userInput } = req.body;

        // Use the 'test' collection
        const testCollection = client.db('test-database').collection('test');

        // Insert the user input into the 'test' collection
        testCollection.insertOne({ userInput }, (insertErr) => {
            if (insertErr) {
                console.error('Error inserting into MongoDB:', insertErr);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).send('Input saved successfully');
        });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

module.exports = app;