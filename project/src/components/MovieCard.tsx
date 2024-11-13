import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

interface MovieCardProps {
  id: string;
  title: string;
  image: string;
  duration: string;
  rating: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  image,
  duration,
  rating,
}) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/movie/${id}`)}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:scale-105 cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="h-[400px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 p-4 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}