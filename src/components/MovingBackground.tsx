import React from 'react';

interface MovingBackgroundProps {
  children: React.ReactNode;
  variant?: 'particles' | 'default';
}

const MovingBackground = ({ children, variant = 'default' }: MovingBackgroundProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-orange-200">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/20 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-100/15 to-transparent animate-pulse animation-delay-2000"></div>
        
        {/* Floating animated elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl animate-blob"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-orange-400/15 rounded-full blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/4 w-36 h-36 bg-orange-200/25 rounded-full blur-xl animate-blob animation-delay-4000"></div>
        
        {/* Subtle moving lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent animate-drift"></div>
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-orange-400/25 to-transparent animate-drift animation-delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-orange-400/60 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-orange-500/70 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-orange-300/50 rounded-full animate-float animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-orange-400/80 rounded-full animate-float"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MovingBackground;
