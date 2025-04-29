'use client';

import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';

export default function ServerStatusBadge() {
  const status = 'ALIVE';

  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <Badge
        variant={status === 'ALIVE' ? 'default' : 'destructive'}
        className={`
          ${status === 'ALIVE' ? 'bg-green-500/90 hover:bg-green-500' : ''}
          text-sm font-semibold px-3 py-1 transition-all
        `}
      >
        {status}
      </Badge>
    </motion.div>
  );
}
