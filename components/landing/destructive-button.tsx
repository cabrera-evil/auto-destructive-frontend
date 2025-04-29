'use client';

import { queryClient } from '@/constants';
import { useCreateData } from '@/hooks/use-rest';
import { toast } from '@/hooks/use-toast';
import { Button } from '../ui/button';

export default function DestructiveButton() {
  const { mutate } = useCreateData({
    onSuccess: () => {
      toast({
        title: "Look's like we are OK!",
        description: 'The system is still active.',
      });
    },
    onError: () => {
      toast({
        title: 'Self-destruct initiated!',
        description: 'The system will be deactivated shortly.',
      });
      queryClient.resetQueries({ queryKey: ['health'], exact: false });
    },
  });

  const handleSelfDestruct = () => {
    mutate({
      path: 'destructive/kill',
      payload: {},
    });
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      className="relative w-full py-7 text-lg font-bold tracking-wider shadow-lg transition-all duration-300 
                  hover:scale-105 hover:shadow-red-700/20 hover:shadow-xl
                  active:scale-95 uppercase"
      onClick={handleSelfDestruct}
    >
      Auto Destruct
    </Button>
  );
}
