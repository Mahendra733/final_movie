import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Booking {
  id: string;
  userId: string;
  movieId: string;
  seats: string[];
  showtime: string;
  date: string;
}

interface BookingState {
  selectedSeats: string[];
  bookings: Booking[];
  setSelectedSeats: (seats: string[]) => void;
  createBooking: (movieId: string, showtime: string, date: string) => Promise<void>;
  fetchBookings: () => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedSeats: [],
  bookings: [],
  setSelectedSeats: (seats) => set({ selectedSeats: seats }),
  createBooking: async (movieId, showtime, date) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase.from('bookings').insert({
      user_id: user.id,
      movie_id: movieId,
      seats: selectedSeats,
      showtime,
      date,
    });

    if (error) throw error;
  },
  fetchBookings: async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*');

    if (error) throw error;
    set({ bookings: data });
  },
}));