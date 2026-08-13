import { Play, Pause, Heart } from "lucide-react";

import { useMusic } from "../context/MusicContext";

function SongCard({ song }) {
  const {
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    toggleFavorite,
    isFavorite,
  } = useMusic();

  const isCurrentSong =
    currentSong?.id === song.id;

  const isFavorited = isFavorite(song.id);

  const handlePlay = (e) => {
    e.stopPropagation();

    if (!isCurrentSong) {
      setCurrentSong(song);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(!isPlaying);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(song.id);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:border-white/20">

      {/* Cover */}

      <div className="relative overflow-hidden rounded-xl">

        <img
          src={song.cover}
          alt={song.title}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Play Button */}

        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex h-9 w-9 sm:h-11 sm:w-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Play song"
        >
          {isCurrentSong && isPlaying ? (
            <Pause
              size={18}
              className="sm:size-20"
              fill="currentColor"
            />
          ) : (
            <Play
              size={18}
              className="sm:size-20"
              fill="currentColor"
            />
          )}
        </button>

        {/* Like Button */}

        <button
          onClick={handleFavorite}
          className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex h-9 w-9 sm:h-11 sm:w-11 translate-y-2 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            className={`sm:size-5 transition-all duration-300 ${
              isFavorited
                ? "fill-red-500 text-red-500"
                : "text-white"
            }`}
          />
        </button>

      </div>

      {/* Song Details */}

      <div className="mt-3 sm:mt-4">

        <h3 className="truncate font-semibold text-white text-sm sm:text-base">
          {song.title}
        </h3>

        <p className="mt-1 truncate text-xs text-gray-400 sm:text-sm">
          {song.artist}
        </p>

      </div>

    </div>
  );
}

export default SongCard;