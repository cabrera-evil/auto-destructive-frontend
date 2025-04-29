'use client';

import { useFetchData } from '@/hooks/use-rest';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';

export default function ServerStatusBadge() {
  const { status } = useFetchData<any>({
    path: 'health',
  });

  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <Badge
        variant={status === 'success' ? 'default' : 'destructive'}
        className={`
        ${status === 'success' ? 'bg-green-500/90 hover:bg-green-500' : ''}
        text-sm font-semibold px-3 py-1 transition-all
      `}
      >
        {status === 'success' ? 'Online' : 'Offline'}
      </Badge>
    </motion.div>
  );
}
