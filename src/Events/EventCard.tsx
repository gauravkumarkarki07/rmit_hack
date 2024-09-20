import { useLocation } from "react-router-dom";

export default function EventCard() {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    console.log(pathArray)
    const eventId = pathArray[2];
    
    return (
        <div>{eventId}</div>
    );
}