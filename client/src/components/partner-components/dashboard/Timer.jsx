import React, { useEffect, useState } from "react";

const Timer = ({ timeLeft }) => {
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium">
      Order Ready {formatTime(time)}
    </button>
  );
};

export default Timer;
