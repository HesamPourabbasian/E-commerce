import React, { useState, useEffect } from "react";

const Countdown = () => {
  // Initialize the state for days, hours, minutes, and seconds
  const [days, setDays] = useState(2); // 2 days
  const [hours, setHours] = useState(1); // 10 hours
  const [minutes, setMinutes] = useState(22); // 24 minutes
  const [seconds, setSeconds] = useState(2); // 59 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrement the seconds
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1; // Decrement seconds
        } else {
          // Reset seconds to 59 and decrement minutes
          setMinutes((prevMinutes) => {
            if (prevMinutes > 0) {
              return prevMinutes - 1; // Decrement minutes
            } else {
              // Reset minutes to 59 and decrement hours
              setHours((prevHours) => {
                if (prevHours > 0) {
                  return prevHours - 1; // Decrement hours
                } else {
                  // Reset hours to 23 and decrement days
                  setDays((prevDays) =>
                    prevDays > 0 ? prevDays - 1 : prevDays
                  );
                  return 23; // Reset to 23 hours
                }
              });
              return 59; // Reset minutes to 59
            }
          });
          return 59; // Reset seconds to 59
        }
      });
    }, 1000); // Set interval to update every 1000ms (1 second)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <><div className="grid grid-flow-col gap-5 text-center auto-cols-max items-center justify-center mb-[50px] mt-[20px]">
          <div className="flex flex-col p-2 bg-neutral rounded text-neutral-content">
              <span className="countdown font-mono text-5xl sm:text-4xl md:text-3xl">
                  <span style={{ "--value": days }}></span>
              </span>
              days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded text-neutral-content">
              <span className="countdown font-mono text-5xl sm:text-4xl md:text-3xl">
                  <span style={{ "--value": hours }}></span>
              </span>
              hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded text-neutral-content">
              <span className="countdown font-mono text-5xl sm:text-4xl md:text-3xl">
                  <span style={{ "--value": minutes }}></span>
              </span>
              min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded text-neutral-content">
              <span className="countdown font-mono text-5xl sm:text-4xl md:text-3xl">
                  <span style={{ "--value": seconds }}></span>
              </span>
              sec
          </div>

      </div><div className="mb-[50px]">
        </div></>
  );
};

export default Countdown;
