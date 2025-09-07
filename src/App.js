import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, RotateCcw, Sun, Moon } from "lucide-react";
import "./App.css";


export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (timeMs) => {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    const centiseconds = Math.floor((timeMs % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setHasStarted(false);
  };

  const handleLap = () => {
    if (isRunning) {
      const lapTime = time;
      const lapNumber = laps.length + 1;
      setLaps((prev) => [...prev, { number: lapNumber, time: lapTime }]);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode
    ? {
        background: "min-h-screen bg-zinc-900",
        container: "bg-zinc-800/90 backdrop-blur-lg border-zinc-700",
        text: "text-zinc-100",
        icon: "text-zinc-200",
        timeDisplay: "bg-zinc-800/60 border-zinc-600",
        lapContainer: "bg-zinc-800/40 border-zinc-600",
        lapItem: "bg-zinc-700/40 border-zinc-600",
      }
    : {
        background: "min-h-screen bg-white",
        container: "bg-gray-100/80 backdrop-blur-lg border-gray-300",
        text: "text-black",
        icon: "text-black",
        timeDisplay: "bg-gray-200/50 border-gray-300",
        lapContainer: "bg-gray-200/30 border-gray-300",
        lapItem: "bg-gray-100/50 border-gray-200",
      };

  return (
    <>
      <div
        className={`${themeClasses.background} flex items-center justify-center p-4`}
        // style={{
        //   fontFamily:
        //     '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        // }}
      >
        <div
          className={`${themeClasses.container} rounded-3xl shadow-2xl border p-4 w-full max-w-md relative`}
        >
          {/* Dark Mode Toggle - top right corner */}
          <button
            onClick={toggleDarkMode}
            className={`w-6 h-6 md:w-12 md:h-12 p-0 rounded-full transition-all duration-300 transform hover:scale-105 z-10 flex items-center justify-center absolute top-4.5 right-4 md:top-2.5 md:right-3`}
            style={{
              backgroundColor: isDarkMode ? "rgba(39,39,42,0.9)" : "#f4f4f5",
              color: isDarkMode ? "#f4f4f5" : "#18181b",
            }}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Moon className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
            )}
          </button>
          {/* Title */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1
              className={`flex items-center justify-center gap-1 text-xl md:text-3xl font-bold ${themeClasses.text}`}
            >
              Stopwatch
            </h1>
          </div>
          {/* Time Display */}
          <div className="text-center mb-8">
            <div
              className={`${themeClasses.timeDisplay} rounded-2xl p-6 mb-4 border`}
            >
              <div
                className={`text-4xl md:text-5xl  font-extrabold ${themeClasses.text} transition-all duration-300 ease-in-out`}
                style={{ fontFamily: "Courier New, monospace" }}
              >
                {formatTime(time)}
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Play className="w-6 h-6" fill="currentColor" />
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Pause className="w-6 h-6" fill="currentColor" />
              </button>
            )}

            <button
              onClick={handleLap}
              disabled={!isRunning}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              <Square className="w-6 h-6" />
            </button>

            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>

          {/* Button Labels */}
          <div
            className={`flex justify-center gap-4 mb-6 text-lg font-medium ${themeClasses.text}`}
          >
            <span className="w-14 text-center">
              {!hasStarted ? "Start" : isRunning ? "Pause" : "Resume"}
            </span>
            <span className="w-14 text-center">Lap</span>
            <span className="w-14 text-center">Reset</span>
          </div>

          {/* Lap Times */}
          {laps.length > 0 && (
            <div
              className={`${themeClasses.lapContainer} rounded-2xl p-4 border`}
            >
              <h3
                className={`${themeClasses.text} font-semibold mb-3 text-center`}
              >
                Lap Times
              </h3>
              <div className="max-h-40 overflow-y-auto space-y-2 scrollbar-hide">
                {laps
                  .slice()
                  .reverse()
                  .map((lap) => (
                    <div
                      key={lap.number}
                      className={`flex justify-between items-center ${themeClasses.lapItem} rounded-lg p-2 border`}
                    >
                      <span className={`${themeClasses.text} font-medium`}>
                        Lap {lap.number}
                      </span>
                      <span
                        className={`${themeClasses.text} font-mono`}
                        style={{ fontFamily: "Courier New, monospace" }}
                      >
                        {formatTime(lap.time)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
