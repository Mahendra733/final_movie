import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Calendar, Clock } from 'lucide-react';
import { SeatMap } from '../components/SeatMap';
import { useBookingStore } from '../store/bookingStore';
import { useAuthStore } from '../store/authStore';

const MOVIES = {
  '1': {
    title: 'HARI HARA VEERAMALLU',
    image: 'data:image/jpeg;base64,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',
    duration: '2h 45m',
    rating: 'PG-13',
    description: '',
  },
  // Add other movies...
  '2': {
    title: 'OG',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyiYTX2UD8j5lT_e6Ol9YjVJfW6OHyR2eeA&s',
    duration: '2h 45m',
    rating: 'PG-13',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
  },
  '3': {
    title: 'USTAAD BAGHAT SINGH',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTojV3mY7k7VtldYsxw7hlEUaVnRAbQ-k4dA&s',
    duration: '2h 45m',
    rating: 'PG-13',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
  },
};

const SHOWTIMES = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];

export const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movie = MOVIES[id as keyof typeof MOVIES];
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const { user } = useAuthStore();
  const { selectedSeats, createBooking } = useBookingStore();

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login to book tickets');
      return;
    }

    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      toast.error('Please select date, time and seats');
      return;
    }

    try {
      await createBooking(id!, selectedTime, selectedDate);
      toast.success('Booking successful! Check your email for tickets.');
    } catch (error) {
      toast.error('Failed to create booking');
    }
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-[600px] w-full rounded-lg object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{movie.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{movie.rating}</span>
            </div>
          </div>
          <p className="mt-4 text-gray-600">{movie.description}</p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Select Date</h2>
            <div className="mt-4 flex gap-4">
              {[...Array(7)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dateStr = date.toISOString().split('T')[0];
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`rounded-lg px-4 py-2 ${
                      selectedDate === dateStr
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {date.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Select Time</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              {SHOWTIMES.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-lg px-4 py-2 ${
                    selectedTime === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && selectedTime && (
            <>
              <div className="mt-8">
                <h2 className="text-2xl font-bold">Select Seats</h2>
                <SeatMap bookedSeats={[]} />
              </div>

              <button
                onClick={handleBooking}
                className="mt-8 w-full rounded-lg bg-blue-500 py-3 text-white hover:bg-blue-600"
              >
                Book Tickets ({selectedSeats.length} seats)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}