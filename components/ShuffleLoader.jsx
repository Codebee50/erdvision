import React from 'react';

const ShuffleLoader = ({ color = '#7ED6DF', size=24 }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .spinner {
            animation: spinner-animation 2.4s linear infinite;
            fill: ${color}; /* Dynamic color */
          }
          .spinner-delay-1 {
            animation-delay: -2.4s;
          }
          .spinner-delay-2 {
            animation-delay: -1.6s;
          }
          .spinner-delay-3 {
            animation-delay: -0.8s;
          }
          @keyframes spinner-animation {
            8.33% { transform: translate(13px, 1px); }
            25% { transform: translate(13px, 1px); }
            33.3% { transform: translate(13px, 13px); }
            50% { transform: translate(13px, 13px); }
            58.33% { transform: translate(1px, 13px); }
            75% { transform: translate(1px, 13px); }
            83.33% { transform: translate(1px, 1px); }
          }
        `}
      </style>
      <rect className="spinner spinner-delay-1" x="1" y="1" rx="1" width="10" height="10" />
      <rect className="spinner spinner-delay-2" x="1" y="1" rx="1" width="10" height="10" />
      <rect className="spinner spinner-delay-3" x="1" y="1" rx="1" width="10" height="10" />
    </svg>
  );
};

export default ShuffleLoader;
