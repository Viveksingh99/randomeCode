import React, { useState, useEffect } from 'react';

function NumberSpinner(props: any) {
  const {
    min, max, step, getCount, resetCount, currentValue, disabledFlag,
  } = props;

  const [count, setCount] = useState(min);

  const increment = () => {
    if (count <= max && (count + step) <= max) {
      const countt = count + step;
      setCount(countt);
      getCount(countt);
    }
  };

  const decrement = () => {
    if (count >= min && (count - step) >= min) {
      const countt = count - step;
      setCount(countt); 
      getCount(countt);
    }
  };

  useEffect(() => {
    setCount(min);
  }, [resetCount]);

  useEffect(() => {
    setCount(currentValue);
  }, [currentValue]);

  const isMinDisabled = count === min;
  const isMaxDisabled = count === max || disabledFlag;
  const isDisabled = count === 0;

  return (
    <div className={`
      flex items-center justify-center border border-gray-300 bg-white rounded-lg
      ${isDisabled ? 'opacity-60' : ''}
    `}>
      <div className="py-1">
        <button 
          type="button" 
          disabled={isMinDisabled}
          onClick={decrement}
          className={`
            flex items-center justify-center w-8 h-8 rounded-full 
            ${isMinDisabled 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            transition duration-200
          `}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20 12H4" 
            />
          </svg>
        </button>
      </div>
      
      <div className={`
        text-center w-16 bg-transparent border-none font-bold text-xl
        ${isDisabled ? 'text-gray-400' : 'text-blue-600'}
        font-montserrat
      `}>
        {count}
      </div>
      
      <div className="py-1">
        <button 
          type="button" 
          disabled={isMaxDisabled}
          onClick={increment}
          className={`
            flex items-center justify-center w-8 h-8 rounded-full
            ${isMaxDisabled 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            transition duration-200
          `}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NumberSpinner;