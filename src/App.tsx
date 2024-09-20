import { useEffect, useState } from 'react'
import './App.css'
import {supabase} from "../supabase/supabaseClient"

function App() {
  const [prompts, setPrompts] = useState<any>([]);

  useEffect(() => {
    getPrompts();
  }, []);

  async function getPrompts() {
    const { data } = await supabase.from('prompts').select();
    setPrompts(data)
  }

  return (
    <ul>
      {prompts.map((prompt) => (
        <li key={prompt.id}>{prompt.prompt}</li>
      ))}
    </ul>
  );
}

export default App;