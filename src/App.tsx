import { useEffect, useState } from 'react'
import './App.css'
import {supabase} from "../supabase/supabaseClient"
import { Button } from '@/components/ui/button';

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
    <div>
      <ul>
        {prompts.map((prompt) => (
          <li key={prompt.id}>{prompt.prompt}</li>
        ))}
      </ul>
      <Button className='text-2xl' variant="outline">Hey there</Button>
    </div>
  );
}

export default App;