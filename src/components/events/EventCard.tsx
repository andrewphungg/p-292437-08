
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LocationIcon,
  PriceIcon,
  TrendingIcon,
  ShareIcon,
  HeartIcon,
} from "@/components/icons";
import { useUser } from "@/context/UserContext";
import { Event } from "@/types/event";
import { ShareModal } from "./ShareModal";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { attendEvent, shareEvent, isAttending, hasShared, user } = useUser();
  const { id, image, title, day, location, price, tags, isTrending, pointsForAttending, pointsForSharing } = event;
  
  const attending = isAttending(id);
  const shared = hasShared(id);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowShareModal(true);
  };

  const handleAttend = (e: React.MouseEvent) => {
    e.preventDefault();
    attendEvent(id);
  };

  const handleShareComplete = () => {
    shareEvent(id);
    setShowShareModal(false);
  };

  return (
    <>
      <Link to={`/event/${id}`} className="block">
        <article className="bg-[#FEFFEC] p-[15px] rounded-lg border-[3px] border-[#BF8FF3]">
          <div className="flex gap-[15px]">
            <div className="w-[111px] h-[126px] rounded-[8px] border-[1px] border-[rgba(0,0,0,0.5)] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-[#2A3F65]">{title}</h3>
                <span className="text-sm">{day}</span>
              </div>

              <div className="flex items-center gap-2 mt-2.5">
                <LocationIcon />
                <span className="text-[10px]">{location}</span>
              </div>

              <div className="flex items-center gap-2 mt-2.5">
                <PriceIcon />
                <span className="text-[10px]">{price}</span>
              </div>

              <div className="flex gap-[7px] mt-2.5 flex-wrap">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white text-[9px] px-2.5 py-0.5 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {isTrending && (
                <div className="flex items-center gap-2 mt-2.5">
                  <TrendingIcon />
                  <span className="text-[10px] text-[#E0A000]">Trending Now</span>
                </div>
              )}

              <div className="flex items-center justify-between mt-2.5">
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    aria-label={shared ? "Shared" : "Share"} 
                    onClick={handleShare}
                    className={`flex items-center justify-center ${shared ? 'bg-sunset-pink/30' : ''} p-1 rounded-full hover:bg-sunset-pink/20 transition-colors`}
                  >
                    <ShareIcon />
                    <span className="text-[8px] ml-1">+{pointsForSharing}pts</span>
                  </button>
                  <button 
                    type="button" 
                    aria-label={attending ? "Unattend" : "Attend"} 
                    onClick={handleAttend}
                    className={`flex items-center justify-center ${attending ? 'bg-sunset-orange/30' : ''} p-1 rounded-full hover:bg-sunset-orange/20 transition-colors`}
                  >
                    <HeartIcon />
                    <span className="text-[8px] ml-1">{attending ? "-" : "+"}{pointsForAttending}pts</span>
                  </button>
                </div>
                {attending && (
                  <span className="text-[10px] bg-sunset-orange/20 px-2 py-0.5 rounded text-sunset-orange">Attending</span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
      
      <ShareModal 
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShareComplete}
        eventName={title}
        friends={user.friends}
      />
    </>
  );
};
