// MedicationReminder.jsx

import React, { useState, useEffect } from 'react';

const MedicationReminder = () => {
    const [medications, setMedications] = useState([
        { name: 'Medication A', dosage: '1 tablet', remainingPills: 10 },
        { name: 'Medication B', dosage: '2 tablets', remainingPills: 15 },
        // Add more medications as needed
    ]);

    const [currentMedicationIndex, setCurrentMedicationIndex] = useState(0);

    useEffect(() => {
        // Set up a daily reminder to check medication
        const reminderInterval = setInterval(() => {
            setCurrentMedicationIndex(0); // Start with the first medication of the day
        }, 86400000); // 24 hours in milliseconds

        // Clean up interval on component unmount
        return () => clearInterval(reminderInterval);
    }, []);

    const handleAnswer = (answer) => {
        // Update medication information based on the patient's answer
        const updatedMedications = [...medications];
        const currentMedication = updatedMedications[currentMedicationIndex];

        if (answer.toLowerCase() === 'yes' && currentMedication.remainingPills > 0) {
            // If the patient answers 'yes' and there are remaining pills
            currentMedication.remainingPills -= 1;
        }

        // Move to the next medication or finish if all medications are checked
        if (currentMedicationIndex + 1 < medications.length) {
            setCurrentMedicationIndex(currentMedicationIndex + 1);
        }
        // Note: In a real-world scenario, you might want to handle completion differently (e.g., show a message)
    };

    return (
        <div>
            <h2>Medication Reminder</h2>
            {currentMedicationIndex < medications.length && (
                <div>
                    <p>{`Please take ${medications[currentMedicationIndex].dosage} of ${
                        medications[currentMedicationIndex].name
                    }.`}</p>
                    <p>Have you taken this medication?</p>
                    <button onClick={() => handleAnswer('Yes')}>Yes</button>
                    <button onClick={() => handleAnswer('No')}>No</button>
                    <p>{`Remaining pills: ${medications[currentMedicationIndex].remainingPills}`}</p>
                </div>
            )}
            {currentMedicationIndex === medications.length && (
                <p>All medications for the day have been checked.</p>
            )}
        </div>
    );
};

export default MedicationReminder;
