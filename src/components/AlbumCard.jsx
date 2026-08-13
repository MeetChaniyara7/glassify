import { Play } from "lucide-react";
import { useMusic } from "../context/MusicContext";

function AlbumCard({ song }) {
  const {
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
  } = useMusic();

  const isCurrentSong =
    currentSong?.id === song.id;

  const handlePlay = (e) => {
    e.stopPropagation();
    if (!isCurrentSong) {
      setCurrentSong(song);
      setIsPlaying(true);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl">

      {/* Album Cover */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={song.cover}
          alt={song.album}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Play Button */}
        <button
          onClick={handlePlay}
          className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          aria-label="Play album"
        >
          <Play size={20} fill="currentColor" />
        </button>
      </div>

      {/* Album Details */}
      <div className="mt-4">
        <h3 className="truncate font-semibold text-white">
          {song.album}
        </h3>

        <p className="mt-1 truncate text-sm text-gray-400">
          {song.artist}
        </p>
      </div>

    </div>
  );
}

export default AlbumCard;