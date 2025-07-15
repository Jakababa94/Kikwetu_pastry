import React from 'react';

export const Button = React.forwardRef(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    let base =
      'inline-flex items-center justify-center rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-400';
    let color = '';
    if (variant === 'primary') {
      color = 'bg-orange-500 text-white hover:bg-orange-600';
    } else if (variant === 'secondary') {
      color = 'bg-yellow-200 text-orange-800 hover:bg-yellow-300';
    } else if (variant === 'danger') {
      color = 'bg-red-500 text-white hover:bg-red-600';
    } else {
      color = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    }
    return (
      <button ref={ref} className={`${base} ${color} ${className}`} {...props} />
    );
  }
);

Button.displayName = 'Button';
