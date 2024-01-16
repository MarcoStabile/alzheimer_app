// CaregiverDashboard.jsx

import React, { useState, useEffect } from 'react';

import axios from 'axios';

const CaregiverDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        dateOfBirth: '',
        sonsNames: [],
        medicines: [],
        photos: [],
        // Add other fields as needed
    });
    const [motionDetected, setMotionDetected] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/patient', formData);
            console.log('Patient information updated successfully.');
        } catch (error) {
            console.error('Error updating patient information:', error.message);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error.message);
        }
    };

    useEffect(() => {


        // Fetch motion sensor status every 5 seconds
        const fetchMotionStatus = async () => {
            const response = await fetch('/motion-status');
            const { motionDetected } = await response.json();
            setMotionDetected(motionDetected);

            // Show an alert if motion is detected
            if (motionDetected) {
                alert('Motion detected: Patient has left the room');
            }
        };

        fetchMotionStatus();

        const intervalID = setInterval(fetchMotionStatus, 5000); // Fetch every 5 seconds

        // Clean up interval on component unmount
        return () => clearInterval(intervalID);
    }, []);

    return (
        <div>
            <h1>Caregiver Dashboard</h1>
            <form onSubmit={handleFormSubmit}>
                {/* Add form fields for patient information */}
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                {/* Add other form fields as needed */}
                <button type="submit">Save Patient Information</button>
            </form>
            {/* Display other caregiver dashboard content */}
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Photo</button>

            </div>
            <div>
                <h2>Motion Sensor</h2>
                <p>Motion Detected: {motionDetected ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default CaregiverDashboard;
