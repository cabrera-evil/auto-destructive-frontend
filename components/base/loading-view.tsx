'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import {
  CircleOff,
  Database,
  DownloadCloud,
  Loader2,
  RefreshCw,
  Server,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type LoadingIndicatorType =
  | 'spinner'
  | 'progress'
  | 'dots'
  | 'pulse'
  | 'text';
export type LoadingSize = 'sm' | 'md' | 'lg';
export type MessageDisplayMode = 'cycle' | 'all' | 'single' | 'typewriter';
export type LoadingState = 'initial' | 'fetching' | 'processing' | 'finalizing';

interface LoadingViewProps {
  /**
   * Array of messages to display during loading
   * @default ["Loading..."]
   */
  messages?: string[];
  /**
   * How to display multiple messages
   * @default "cycle"
   */
  messageDisplay?: MessageDisplayMode;
  /**
   * Time in milliseconds between cycling messages
   * @default 3000
   */
  cycleInterval?: number;
  /**
   * The type of loading indicator to display
   * @default "spinner"
   */
  type?: LoadingIndicatorType;
  /**
   * The size of the loading indicator
   * @default "md"
   */
  size?: LoadingSize;
  /**
   * Whether to display the loading indicator in full screen
   * @default false
   */
  fullScreen?: boolean;
  /**
   * Whether to display the loading in a container with border/background
   * @default false
   */
  container?: boolean;
  /**
   * Custom CSS class for the wrapper
   */
  className?: string;
  /**
   * The color theme for the loading indicator
   * @default "primary"
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  /**
   * Whether to show a delay message after a certain time
   * @default false
   */
  showDelayMessage?: boolean;
  /**
   * Time in milliseconds before showing the delay message
   * @default 10000
   */
  delayMessageTime?: number;
  /**
   * Current progress value (0-100) for progress bar type
   * @default 0
   */
  progress?: number;
  /**
   * Whether the progress is indeterminate
   * @default true
   */
  indeterminate?: boolean;
  /**
   * Current loading state
   * @default "initial"
   */
  loadingState?: LoadingState;
  /**
   * Icon to display with the loading indicator
   */
  icon?: React.ReactNode;
  /**
   * Whether to show the loading state icon
   * @default false
   */
  showStateIcon?: boolean;
}

export function LoadingView({
  messages = ['Loading...'],
  messageDisplay = 'cycle',
  cycleInterval = 3000,
  type = 'spinner',
  size = 'md',
  fullScreen = false,
  container = false,
  className,
  color = 'primary',
  showDelayMessage = false,
  delayMessageTime = 10000,
  progress = 0,
  indeterminate = true,
  loadingState = 'initial',
  icon,
  showStateIcon = false,
}: LoadingViewProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showDelay, setShowDelay] = useState(false);
  const [internalProgress, setInternalProgress] = useState(progress);
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const typewriterSpeed = useRef(100);
  const typewriterFullText = useRef(messages[currentMessageIndex]);

  // Handle cycling through messages
  useEffect(() => {
    if (messageDisplay === 'cycle' && messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, cycleInterval);
      return () => clearInterval(interval);
    }
  }, [messages, cycleInterval, messageDisplay]);

  // Reset typewriter when message changes
  useEffect(() => {
    if (messageDisplay === 'typewriter') {
      typewriterFullText.current = messages[currentMessageIndex];
      setTypewriterText('');
      setTypewriterIndex(0);
    }
  }, [currentMessageIndex, messageDisplay, messages]);

  // Typewriter effect
  useEffect(() => {
    if (
      messageDisplay === 'typewriter' &&
      typewriterIndex < typewriterFullText.current.length
    ) {
      const timeout = setTimeout(() => {
        setTypewriterText(
          (prev) => prev + typewriterFullText.current.charAt(typewriterIndex),
        );
        setTypewriterIndex((prev) => prev + 1);
      }, typewriterSpeed.current);
      return () => clearTimeout(timeout);
    }
    if (
      messageDisplay === 'typewriter' &&
      typewriterIndex === typewriterFullText.current.length
    ) {
      // Pause at the end before moving to next message
      const timeout = setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, cycleInterval);
      return () => clearTimeout(timeout);
    }
  }, [
    typewriterIndex,
    messageDisplay,
    cycleInterval,
    messages,
    currentMessageIndex,
  ]);

  // Simulate progress for indeterminate progress bar
  useEffect(() => {
    if (type === 'progress' && indeterminate) {
      const interval = setInterval(() => {
        setInternalProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
    setInternalProgress(progress);
  }, [type, indeterminate, progress]);

  // Show delay message after specified time
  useEffect(() => {
    if (showDelayMessage) {
      const timeout = setTimeout(() => {
        setShowDelay(true);
      }, delayMessageTime);
      return () => clearTimeout(timeout);
    }
  }, [showDelayMessage, delayMessageTime]);

  // Size classes for the spinner
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  // Text size classes
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Color classes
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };

  // Progress bar color classes
  const progressColorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  // Get loading state icon
  const getStateIcon = () => {
    if (icon) return icon;

    switch (loadingState) {
      case 'initial':
        return <RefreshCw className={cn('mr-2', sizeClasses.sm)} />;
      case 'fetching':
        return <DownloadCloud className={cn('mr-2', sizeClasses.sm)} />;
      case 'processing':
        return <Database className={cn('mr-2', sizeClasses.sm)} />;
      case 'finalizing':
        return <Server className={cn('mr-2', sizeClasses.sm)} />;
      default:
        return null;
    }
  };

  // Container classes
  const containerClasses = cn(
    'flex flex-col items-center justify-center gap-3',
    fullScreen && 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50',
    container && !fullScreen && 'p-6 border rounded-lg shadow-sm bg-background',
    className,
  );

  // Render loading indicator
  const renderLoadingIndicator = () => {
    switch (type) {
      case 'spinner':
        return (
          <Loader2
            className={cn(
              'animate-spin',
              sizeClasses[size],
              colorClasses[color],
            )}
          />
        );
      case 'progress':
        return (
          <div className="w-full max-w-xs">
            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full transition-all rounded-full',
                  progressColorClasses[color],
                  indeterminate && 'animate-progress-indeterminate',
                )}
                style={{ width: `${internalProgress}%` }}
              />
            </div>
            {!indeterminate && (
              <p className="mt-2 text-xs text-center text-muted-foreground">
                {Math.round(internalProgress)}%
              </p>
            )}
          </div>
        );
      case 'dots':
        return (
          <div className="flex space-x-2">
            <div
              className={cn(
                'rounded-full animate-bounce',
                colorClasses[color],
                size === 'sm'
                  ? 'w-1.5 h-1.5'
                  : size === 'md'
                    ? 'w-2.5 h-2.5'
                    : 'w-3.5 h-3.5',
                'bg-current',
              )}
              style={{ animationDelay: '0ms' }}
            />
            <div
              className={cn(
                'rounded-full animate-bounce',
                colorClasses[color],
                size === 'sm'
                  ? 'w-1.5 h-1.5'
                  : size === 'md'
                    ? 'w-2.5 h-2.5'
                    : 'w-3.5 h-3.5',
                'bg-current',
              )}
              style={{ animationDelay: '150ms' }}
            />
            <div
              className={cn(
                'rounded-full animate-bounce',
                colorClasses[color],
                size === 'sm'
                  ? 'w-1.5 h-1.5'
                  : size === 'md'
                    ? 'w-2.5 h-2.5'
                    : 'w-3.5 h-3.5',
                'bg-current',
              )}
              style={{ animationDelay: '300ms' }}
            />
          </div>
        );
      case 'pulse':
        return (
          <div className="space-y-2 w-full max-w-xs">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
            <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
          </div>
        );
      case 'text':
        return (
          <div
            className={cn(
              'font-mono',
              colorClasses[color],
              textSizeClasses[size],
            )}
          >
            {messageDisplay === 'typewriter'
              ? typewriterText
              : messages[currentMessageIndex]}
            <span className="animate-blink">|</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Render messages
  const renderMessages = () => {
    if (messageDisplay === 'all') {
      return (
        <div className="space-y-1 text-center">
          {messages.map((message, index) => (
            <p
              key={index}
              className={cn(
                'transition-opacity',
                textSizeClasses[size],
                index === currentMessageIndex ? 'opacity-100' : 'opacity-50',
              )}
            >
              {showStateIcon && index === currentMessageIndex && getStateIcon()}
              {message}
            </p>
          ))}
        </div>
      );
    }

    if (messageDisplay === 'typewriter') {
      return (
        <p className={cn('font-medium', textSizeClasses[size])}>
          {showStateIcon && getStateIcon()}
          {typewriterText}
          <span className="animate-blink">|</span>
        </p>
      );
    }

    return (
      <p className={cn('font-medium', textSizeClasses[size])}>
        {showStateIcon && getStateIcon()}
        {messages[currentMessageIndex]}
      </p>
    );
  };

  return (
    <div className={containerClasses}>
      {type !== 'text' && renderLoadingIndicator()}

      <div className={cn('text-center', colorClasses[color])}>
        {type === 'text' ? renderLoadingIndicator() : renderMessages()}
      </div>

      {showDelay && (
        <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
          <CircleOff className="w-4 h-4" />
          <span>This is taking longer than expected. Please wait...</span>
        </div>
      )}
    </div>
  );
}

export default LoadingView;
