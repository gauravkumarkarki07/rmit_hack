import { AudioWaveform, StopCircle } from 'lucide-react'; 
import { AudioRecorder } from '../hooks/useRecording'; 
import { Button } from '@/shadcn/components/ui/button';
import {stt} from '../../Groq//stt';
import { useEffect, useState } from 'react';
import Coherent from '../../Groq/Coherent';

interface InputFieldProps {
  setTranscribedData: (data: string) => void;
  setSummarized: (data: string) => void;
}

function InputField({setTranscribedData,setSummarized}:InputFieldProps) {
  const { startRecording, stopRecording, isRecording, audioUrl,audioBlob } = AudioRecorder();
  const[data,setData]=useState<string | null>("");
  const[summarizedData,setSummarizedData]=useState<string |null>("");

  const groq=new Coherent();

  const getSummarized=async()=>{
    if(data){
      const result=await groq.get(data);
      setSummarizedData(result.summarized);
    }
  }


  const getTranscribeData=async()=>{
    if(audioBlob){
      const result=await stt(audioBlob);
        setData(result);
    }
  }

  useEffect(()=>{
    if(data){
      setTranscribedData(data);
      getSummarized();
    }
  },[data]);

  useEffect(()=>{
    if(audioBlob){
      getTranscribeData();
    }
  },[audioBlob]);

  useEffect(()=>{
    if(summarizedData){
        // console.log("inside input")
      setSummarized(summarizedData);
    }
  },[summarizedData])

  return (
    <section className='flex flex-col items-center justify-center w-full'>
      <section
        onClick={isRecording ? stopRecording : startRecording} 
        className={`flex flex-row items-center justify-center border border-gray-700 rounded-full px-4 py-2 
        ${isRecording ? 'bg-red-500 text-white' : 'hover:bg-black hover:text-white'} 
        transition-all duration-300 cursor-pointer`}
      >
        {isRecording ? (
          <StopCircle size={30} /> 
        ) : (
          <AudioWaveform size={30} />
        )}
        <span className='ml-2'>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
      </section>

      {isRecording && (
        <div className="mt-4 text-red-500 font-semibold">
          Recording...
        </div>
      )}

      {audioUrl && !isRecording && (
        <section className='mt-4 flex gap-2 items-center'>
          <h3>Playback</h3>
          <audio controls src={audioUrl}></audio>
          <Button>
            Send to AI
          </Button>
        </section>
      )}
    </section>
  );
}

export default InputField;
