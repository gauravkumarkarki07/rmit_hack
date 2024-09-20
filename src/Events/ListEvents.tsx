import { useEffect, useState } from 'react'
import {supabase} from "../../supabase/supabaseClient"
import {
    Card,
    CardHeader,
    CardTitle,
  } from "@/shadcn/components/ui/card"
import { useNavigate } from 'react-router-dom';
  
export default function ListEvents() {
    const [prompts, setPrompts] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
      getPrompts();
    }, []);
  
    async function getPrompts() {
      const { data } = await supabase.from('prompts').select();
      setPrompts(data)
      
    }

    const handleNavigate = (eventId: number)  => () => {
        navigate(`/events/${eventId}`);
    }

    return (
        <div className='p-52'>
            <div className='flex justify-center items-center pb-4'>Events</div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {prompts.map((prompt:any) => 
                    <Card className='hover:cursor-pointer shadow-md' onClick={handleNavigate(prompt.id)}>
                        <CardHeader>
                            <CardTitle>{prompt.prompt}</CardTitle>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </div>
    );
}