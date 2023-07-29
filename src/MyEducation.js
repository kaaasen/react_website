import React, { useState, useEffect } from 'react';
import './MyEducation.css';

const MyEducation = () => {
  const [educationText, setEducationText] = useState('');

  useEffect(() => {
    const fetchEducationText = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/education.txt');
        const text = await response.text();
        setEducationText(text);
      } catch (error) {
        console.error('Error fetching education text:', error);
      }
    };

    fetchEducationText();
  }, []);

  return (
    <div className="my-education">
      <h2>Education</h2>
      {educationText ? (
        <div className="education-text" dangerouslySetInnerHTML={{ __html: educationText }} />
      ) : (
        <p>Loading education information...</p>
      )}
    </div>
  );
};

export default MyEducation;
