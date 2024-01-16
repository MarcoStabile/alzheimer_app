import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [patientInfo, setPatientInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weatherDescription, setWeatherDescription] = useState({
        description: '',
        temperature: '',
        humidity: '',
        windSpeed: '',
    });
    const [lifeInfo, setLifeInfo] = useState({ sons: ['Maria', 'Mario'] });
    const [randomPhoto, setRandomPhotos] = useState([]);

    useEffect(() => {
        // Update current time every second
        const timerID = setInterval(() => setCurrentTime(new Date()), 1000);

        // Patient info
        const patientId = '1'; // Replace with an actual patient ID

        const fetchPatientInfo = async () => {
            try {
                const response = await axios.get(`/api/patient/${patientId}`);
                setPatientInfo(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Patient not found, handle accordingly
                    console.warn('Patient not found:', error.message);
                } else {
                    // Other errors, handle accordingly
                    console.error('Error fetching patient information:', error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPatientInfo();

        // Fetch weather information
        const fetchWeather = async () => {
            try {
                const apiKey = '3ba1c8e0f36a7ad946916747aea2503e'; // Replace with your API key
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=Rome&appid=${apiKey}&units=metric`
                );
                const { description, main, wind } = response.data.weather[0];
                setWeatherDescription({
                    description,
                    temperature: main.temp,
                    humidity: main.humidity,
                    windSpeed: wind.speed,
                });
            } catch (error) {
                console.error('Error fetching weather:', error.message);
            }
        };

        fetchWeather();

        const fetchRandomPhotos = async () => {
            try {
                const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=5');
                const photos = response.data.map(photo => photo.download_url);
                setRandomPhotos(photos);
            } catch (error) {
                console.error('Error fetching random photos:', error.message);
            }
        };


        fetchRandomPhotos()

        // Clean up timer on component unmount
        return () => clearInterval(timerID);
    }, []);

    // Function to get a random photo URL (dummy data)
    const getRandomPhoto = () => {
        const photos = [
            'url_to_photo_1',
            'url_to_photo_2',
            // Add more photo URLs as needed
        ];
        const randomIndex = Math.floor(Math.random() * photos.length);
        return photos[randomIndex];
    };

    // Function to periodically show random information and photo
    const showRandomInfo = () => {
        // Change the information and photo periodically
        setLifeInfo({ sons: ['Maria', 'Mario'] });
        setRandomPhotos(getRandomPhoto());
    };

    // Schedule to show random information every 5 minutes (300,000 milliseconds)
    useEffect(() => {
        const intervalID = setInterval(showRandomInfo, 300000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalID);
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!patientInfo) {
        return (
            <div>
                <h1>Main Dashboard</h1>
                <p>No patient information found.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Good Life</h1>
            {/* Display patient information */}
            <p>Name: {patientInfo.name}</p>
            <p>Surname: {patientInfo.surname}</p>
            {/* Display other patient information fields */}
            <div>
                {weatherDescription ? (
                    <div>
                        <p>Weather Description: {weatherDescription.description}</p>
                        <p>Temperature: {weatherDescription.temperature} °C</p>
                        <p>Humidity: {weatherDescription.humidity}%</p>
                        <p>Wind Speed: {weatherDescription.windSpeed} m/s</p>
                        <p>Date: {currentTime.toDateString()}</p>
                        <p>Time: {currentTime.toLocaleTimeString()}</p>
                    </div>
                ) : (
                    <p>Loading weather information...</p>
                )}
            </div>
            <div>
                <h2>Family Love</h2>
                <p>Sons: {lifeInfo.sons.join(', ')}</p>
            </div>
            {/* Slider component */}
            <div style={{ width: '50%', margin: '0 auto' }}>
                <h2>Random Photo Slideshow</h2>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {randomPhoto.map((photo, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={photo}
                                alt={`Random Photo ${index + 1}`}
                                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Dashboard;
