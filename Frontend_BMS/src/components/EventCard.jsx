import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <img 
                src={event.image} 
                alt={event.title} 
                className="event-image" 
            />
            <div className="event-content">
                <h3>{event.title}</h3>
                <p>{event.eventCount} Events</p>
            </div>
        </div>
    );
};

export default EventCard;
