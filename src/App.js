import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const transcribeAudio = async () => {
    if (!file) {
      alert('Please select an audio file.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const { data } = await axios.post('http://localhost:3000/transcribe', formData);
      console.log(data);
      setTranscription(data.results.channels[0].alternatives[0].transcript);
    } catch (error) {
      alert('Error transcribing audio.', error);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} accept="audio/*" />
      <button onClick={transcribeAudio}>Transcribe</button>
      <pre>{transcription}</pre>
    </div>
  );
}

export default App;
