// MemoryChat.jsx

import React, { useState, useEffect } from 'react';

const MemoryChat = () => {
    const [questions, setQuestions] = useState([
        { text: 'Who is your son?', answer: '' },
        { text: 'What is your favorite color?', answer: '' },
        { text: 'Can you name three fruits?', answer: '' },
        // Add more questions as needed
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        // Show the chat every 10 minutes
        const chatInterval = setInterval(() => {
            setShowChat(true);
        }, 600000); // Every 10 minutes

        // Clean up interval on component unmount
        return () => clearInterval(chatInterval);
    }, []);

    const handleAnswer = (answer) => {
        // Update the answer for the current question
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].answer = answer;
        setQuestions(updatedQuestions);

        // Move to the next question or hide the chat if all questions are answered
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowChat(false);
        }
    };

    return (
        <div>
            {showChat && (
                <div className="chat-container">
                    <div className="chat-header">Memory Check</div>
                    <div className="chat-body">
                        {questions.map((question, index) => (
                            <div key={index} className={index === currentQuestionIndex ? 'active' : ''}>
                                <div className="question">{question.text}</div>
                                <div className="answer">
                                    <input
                                        type="text"
                                        placeholder="Type your answer..."
                                        value={question.answer}
                                        onChange={(e) => handleAnswer(e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryChat;
