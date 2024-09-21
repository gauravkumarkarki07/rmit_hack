import  { useState, useEffect, useRef } from 'react';

export const AudioRecorder=()=> {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const[audioBlob,setAudioBlob]=useState<Blob |null>();

  useEffect(() => {
    // Get permission for microphone
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Event handler for when audio data becomes available
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // Event handler for when recording is stopped
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setAudioBlob(audioBlob);
        audioChunksRef.current = []; // Reset the chunks for future recordings
      };
    });
  }, []);

  // Function to start recording
  const startRecording = () => {
    if (mediaRecorderRef.current) {
      setIsRecording(true);
      mediaRecorderRef.current.start();
    }
  };

  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    }
  };

  return {
    startRecording,stopRecording,isRecording,audioUrl,audioBlob
  }
}

