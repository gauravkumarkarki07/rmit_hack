import { useEffect, useState } from 'react'
import { PlusCircle, ChevronRight } from 'lucide-react'
import {supabase} from "../../supabase/supabaseClient"
import { useNavigate } from 'react-router-dom';
import {EventProps} from '../../supabase/types'

export default function Component() {
  const [events, setEvents] = useState<any>([]);
  const [newEventTitle, setNewEventTitle] = useState<string>('')
  const navigate = useNavigate();

  const addEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEventTitle.trim()) {
      const newEvent = { event: newEventTitle };
      setEvents([...events, newEvent])
      const {error, status, data} = await supabase.from('events').insert(newEvent).select();
      console.log(data);
      setNewEventTitle('')
    }
  }

  const handleEventClick = (eventId:number) => {
    navigate(`/events/${eventId}`);
  }

  async function getEvents() {
    const { data } = await supabase.from('events').select();
    setEvents(data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#064E3B] mb-6 sm:mb-8">My Events</h1>
          <form onSubmit={addEvent} className="mb-6 sm:mb-8 flex gap-4">
            <input
              type="text"
              placeholder="New Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="flex-grow p-2 border rounded text-[#064E3B]"
            />
            <button type="submit" className="bg-[#10B981] text-white p-2 rounded hover:bg-[#059669] flex-shrink-0">
              <PlusCircle className="w-6 h-6" />
            </button>
          </form>
          <ul className="space-y-4">
            {events.map((event:any) => (
              <li key={event.id}>
                <div 
                  onClick={() => handleEventClick(event.id)}
                  className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-[#ECFDF5] transition-colors cursor-pointer"
                >
                  <h2 className="text-lg font-medium text-[#064E3B]">{event.event}</h2>
                  <ChevronRight className="w-5 h-5 text-[#34D399]" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}