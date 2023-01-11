import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex gap-2">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:0ms]" />
      <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:150ms]" />
      <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:300ms]" />
    </div>
  );
}
