import React from 'react';

export const Select = React.forwardRef(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={`block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${className}`}
    {...props}
  />
));