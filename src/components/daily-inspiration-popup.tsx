'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { Sparkles, Rocket, Star, Trophy, Target } from 'lucide-react';

const inspirationalMessages = [
  {
    text: "Welcome back, superstar! 🌟 Your dream job is just around the corner. Let's conquer this day!",
    icon: Star,
  },
  {
    text: "You're on fire! 🔥 Each day brings you closer to your career goals. Keep that momentum going!",
    icon: Rocket,
  },
  {
    text: "Hey there, goal-getter! 🎯 Your dedication is truly inspiring. Today's another step towards success!",
    icon: Target,
  },
  {
    text: "Look at you, showing up and shining! ✨ Your dream job doesn't stand a chance against your awesomeness!",
    icon: Sparkles,
  },
  {
    text: "You're a career-building champion! 🏆 Every day you're here, you're winning. Let's make today count!",
    icon: Trophy,
  },
];

export function DailyInspirationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', icon: Sparkles });

  useEffect(() => {
    const lastShown = localStorage.getItem('lastInspirationShown');
    const today = new Date().toDateString();

    if (lastShown !== today) {
      setIsOpen(true);
      setMessage(
        inspirationalMessages[
          Math.floor(Math.random() * inspirationalMessages.length)
        ]
      );
      localStorage.setItem('lastInspirationShown', today);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-blue-600 via-blue-700 to-sky-700 text-white border-none shadow-lg p-0 overflow-hidden">
        <DialogTitle className="sr-only">Daily Inspiration</DialogTitle>
        <div className="text-center p-8 animate-fadeIn">
          <div className="mb-6 inline-block animate-spin-slow">
            <message.icon className="w-20 h-20 text-blue-100" />
          </div>
          <h2 className="text-4xl font-bold mb-6 text-blue-100 animate-bounce">
            Daily Boost!
          </h2>
          <p className="text-xl font-medium mb-8 text-white animate-fadeInUp">
            {message.text}
          </p>
          <Button
            onClick={handleClose}
            className="bg-blue-100 text-blue-800 hover:bg-white hover:text-blue-600 transition-colors duration-300"
          >
            Let's Rock This Day!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
