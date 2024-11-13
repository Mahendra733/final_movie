import React from 'react';
import { useBookingStore } from '../store/bookingStore';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 8;

export const SeatMap: React.FC<{ bookedSeats: string[] }> = ({ bookedSeats }) => {
  const { selectedSeats, setSelectedSeats } = useBookingStore();

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;
    
    setSelectedSeats(
      selectedSeats.includes(seatId)
        ? selectedSeats.filter((id) => id !== seatId)
        : [...selectedSeats, seatId]
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 w-full bg-gray-800 h-8 rounded-t-xl text-center text-white py-1">
        Screen
      </div>
      <div className="grid gap-4">
        {ROWS.map((row) => (
          <div key={row} className="flex justify-center gap-2">
            <span className="w-6 text-center font-bold">{row}</span>
            {Array.from({ length: SEATS_PER_ROW }).map((_, index) => {
              const seatId = `${row}${index + 1}`;
              const isSelected = selectedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);

              return (
                <button
                  key={seatId}
                  onClick={() => toggleSeat(seatId)}
                  disabled={isBooked}
                  className={`
                    h-8 w-8 rounded-t-lg transition-colors
                    ${isBooked ? 'bg-gray-500 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-green-500 hover:bg-green-600' : ''}
                    ${!isSelected && !isBooked ? 'bg-blue-500 hover:bg-blue-600' : ''}
                  `}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-blue-500" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-green-500" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-500" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}