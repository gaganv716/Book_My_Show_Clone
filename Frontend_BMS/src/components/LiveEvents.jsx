import React, { useRef } from 'react';
import EventCard from '../components/EventCard';
import './LiveEvents.css';

const sampleEvents = [
    {
        id: 1,
        title: "Amusement Park",
        eventCount: "10+",
        image: "https://res.cloudinary.com/https-highape-com/image/upload/q_auto:eco,f_auto,h_530/v1567599362/jlkrzrhiorpxbq3ks51h.jpg"
    },
    {
        id: 2,
        title: "Workshops & More",
        eventCount: "355+",
        image: "https://cdn.eventespresso.com/wp-content/uploads/2023/07/17204756/workshop-organization-ideas.jpg"
    },
    {
        id: 3,
        title: "Kids",
        eventCount: "20+",
        image: "https://res.cloudinary.com/dwzmsvp7f/image/upload/f_auto,w_1280/c_crop%2Cg_custom%2Fv1737264012%2Fjkqio4fq0u65kfo7qx5v.jpg"
    },
    {
        id: 4,
        title: "Comedy Shows",
        eventCount: "150+",
        image: "https://classiebit.com/storage/posts/April2024/VfNU58WA3O72tq2bkBWQ.webp"
    },
    {
        id: 5,
        title: "Music Shows",
        eventCount: "110+",
        image: "https://static.wixstatic.com/media/3a848c_961ea6a155e6427f9e73b8413ce837b2~mv2.jpg/v1/fill/w_1279,h_628,al_c,q_85,enc_auto/3a848c_961ea6a155e6427f9e73b8413ce837b2~mv2.jpg"
    },
    {
        id: 6,
        title: "Upskill Training",
        eventCount: "15+",
        image: "https://media.licdn.com/dms/image/v2/D4E12AQHm1rK-X4yhIQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1682705586948?e=1747267200&v=beta&t=TbaLm4AQv1x5nH21MzJOIXUaWJ7AsvZILCzPf7YvDsQ"
    },
    {
        id: 7,
        title: "Food Event",
        eventCount: "9",
        image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-fest-festival-flyer-template-design-2b72a799f123222eb6a17780cd7d299f_screen.jpg?ts=1699707670https://www.creativehatti.com/wp-content/uploads/edd/2022/11/Join-the-game-competition-banner-template-8-large.jpg"
    },
    {
        id: 8,
        title: "Game Event",
        eventCount: "15+",
        image: "https://www.creativehatti.com/wp-content/uploads/edd/2022/11/Join-the-game-competition-banner-template-8-large.jpg"
    }
];

const LiveEvents = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
    };

    return (
        <div className="live-events-section">
            <h2 className="section-heading">The Best Of Live Events</h2>
            <div className="live-events-container">
                <button className="scroll-btn left" onClick={scrollLeft}>
                    &#8249;
                </button>
                <div className="live-events-scroll" ref={scrollRef}>
                    {sampleEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
                <button className="scroll-btn right" onClick={scrollRight}>
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default LiveEvents;
