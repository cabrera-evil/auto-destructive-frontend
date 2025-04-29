'use client';

import { Button } from '../ui/button';

export default function DestructiveButton() {
  return (
    <Button
      variant="destructive"
      size="lg"
      className="relative w-full py-7 text-lg font-bold tracking-wider shadow-lg transition-all duration-300 
                  hover:scale-105 hover:shadow-red-700/20 hover:shadow-xl
                  active:scale-95 uppercase"
      onClick={() => {
        // Placeholder for self-destruct logic
        console.log('Self-destruct initiated');
      }}
    >
      Auto Destruct
    </Button>
  );
}
