'use client';

import DestructiveButton from '@/components/landing/destructive-button';
import ServerStatusBadge from '@/components/landing/server-status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BASE_API } from '@/constants';
import { AlertCircle, Terminal } from 'lucide-react';

export default function SelfDestructPanel() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-destructive mr-2" />
          <h1 className="text-xl font-semibold text-foreground">
            SYSTEM CONTROL
          </h1>
        </div>

        <Card className="w-full border border-border bg-card/80 backdrop-blur-sm shadow-xl relative">
          {/* Top accent border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60" />

          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
              Self-Destruct Control Panel
            </CardTitle>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-4 w-4" />
              <span>API Endpoint:</span>
            </div>

            <div className="mt-1 mb-2 pb-1">
              <code className="rounded bg-muted px-3 py-1.5 text-sm font-mono border border-border/50">
                {BASE_API}
              </code>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Current System Status
              </span>
              <ServerStatusBadge />
            </div>
          </CardHeader>

          <CardContent className="flex flex-col items-center pb-8 pt-2">
            <div className="relative mt-6 w-full max-w-[240px] group">
              <div className="absolute -inset-1 rounded-lg bg-destructive/20 blur-md opacity-80 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <DestructiveButton />
            </div>

            <p className="mt-6 text-xs text-center text-muted-foreground max-w-[80%] leading-relaxed">
              Warning: Initiating this sequence will permanently deactivate all
              systems. This action cannot be undone.
            </p>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>Security clearance required • System v2.4.1</p>
        </div>
      </div>
    </div>
  );
}
