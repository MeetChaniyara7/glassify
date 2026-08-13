import {
  Heart,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Shuffle,
  Repeat,
  Volume2,
} from "lucide-react";

import { useMusic } from "../context/MusicContext";

function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,

    volume,
    setVolume,

    currentTime,
    duration,

    isShuffle,
    setIsShuffle,

    isRepeat,
    setIsRepeat,

    playNext,
    playPrevious,

    seek,

    formatTime,
    
    toggleFavorite,
    isFavorite,
  } = useMusic();

  // =========================
  // Play / Pause
  // =========================

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // =========================
  // Progress Click
  // =========================

  const handleProgressClick = (event) => {
    const progressBar = event.currentTarget;

    const rect = progressBar.getBoundingClientRect();

    const clickPosition = event.clientX - rect.left;

    const percentage =
      clickPosition / rect.width;

    const newTime = percentage * duration;

    seek(newTime);
  };

  // =========================
  // Progress Percentage
  // =========================

  const progressPercentage =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/50 px-3 py-2 backdrop-blur-2xl transition-all duration-300 sm:px-4 sm:py-3">

      <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">

        {/* =================================
            Current Song
        ================================= */}

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">

          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="h-10 w-10 rounded-lg object-cover transition-transform duration-300 sm:h-14 sm:w-14"
          />

          <div className="min-w-0">
            <h4 className="truncate text-xs font-semibold text-white sm:text-sm">
              {currentSong.title}
            </h4>

            <p className="truncate text-xs text-gray-400">
              {currentSong.artist}
            </p>
          </div>

          <button 
            onClick={() => toggleFavorite(currentSong.id)}
            className="ml-1 flex-shrink-0 transition hover:scale-110 sm:ml-2" 
            aria-label="Add to favorites"
          >
            <Heart 
              size={16} 
              className={`sm:size-5 transition-all duration-300 ${
                isFavorite(currentSong.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            />
          </button>

        </div>


        {/* =================================
            Player Controls
        ================================= */}

        <div className="mx-auto w-full max-w-xl">

          {/* Controls */}

          <div className="mb-2 flex items-center justify-center gap-3 sm:gap-5">

            {/* Shuffle */}

            <button
              onClick={() =>
                setIsShuffle(!isShuffle)
              }
              className={`transition duration-300 ${
                isShuffle
                  ? "text-white"
                  : "text-gray-400"
              } hover:scale-110 hover:text-white`}
              title="Shuffle"
            >
              <Shuffle size={16} />
            </button>


            {/* Previous */}

            <button
              onClick={playPrevious}
              className="text-gray-300 transition duration-300 hover:scale-110 hover:text-white"
              title="Previous"
            >
              <SkipBack
                size={20}
                fill="currentColor"
              />
            </button>


            {/* Play / Pause */}

            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition duration-300 hover:scale-110 active:scale-95"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause
                  size={18}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={18}
                  fill="currentColor"
                />
              )}
            </button>


            {/* Next */}

            <button
              onClick={playNext}
              className="text-gray-300 transition duration-300 hover:scale-110 hover:text-white"
              title="Next"
            >
              <SkipForward
                size={20}
                fill="currentColor"
              />
            </button>


            {/* Repeat */}

            <button
              onClick={() =>
                setIsRepeat(!isRepeat)
              }
              className={`transition duration-300 ${
                isRepeat
                  ? "text-white"
                  : "text-gray-400"
              } hover:scale-110 hover:text-white`}
              title="Repeat"
            >
              <Repeat size={16} />
            </button>

          </div>


          {/* =================================
              Progress Bar
          ================================= */}

          <div className="flex items-center gap-2 sm:gap-3">

            <span className="w-6 text-right text-xs text-gray-500 sm:w-8">
              {formatTime(currentTime)}
            </span>

            <div
              onClick={handleProgressClick}
              className="group h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10 transition-all duration-300 hover:h-1.5"
            >
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-150"
                style={{
                  width: `${progressPercentage}%`,
                }}
              >
                {/* Progress Handle */}

                <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100" />
              </div>
            </div>

            <span className="w-6 text-xs text-gray-500 sm:w-8">
              {formatTime(duration)}
            </span>

          </div>

        </div>


        {/* =================================
            Volume
        ================================= */}

        <div className="hidden items-center justify-end gap-2 md:flex">

          <Volume2
            size={18}
            className="text-gray-400 transition-transform duration-300 hover:scale-110"
          />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) =>
              setVolume(
                Number(event.target.value)
              )
            }
            className="w-20 cursor-pointer accent-purple-500 transition-all duration-300 lg:w-24"
          />

        </div>

      </div>

    </footer>
  );
}

export default MusicPlayer;