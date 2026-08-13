import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import songs from "../data/songs";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  // =========================
  // State
  // =========================

  const [currentSong, setCurrentSong] = useState(songs[0]);

  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(0.7);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [isShuffle, setIsShuffle] = useState(false);

  const [isRepeat, setIsRepeat] = useState(false);

  // =========================
  // Search & Filter State
  // =========================

  const [searchQuery, setSearchQuery] = useState("");

  const [filterType, setFilterType] = useState("all"); // all, songs, albums, artists

  const [selectedGenre, setSelectedGenre] = useState("all");

  // =========================
  // Favorites State
  // =========================

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(
      "glassify_favorites"
    );
    return saved ? JSON.parse(saved) : [];
  });

  // =========================
  // Audio Reference
  // =========================

  const audioRef = useRef(null);

  // =========================
  // Change Audio Source
  // =========================

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = currentSong.audio;

    audioRef.current.load();

    setCurrentTime(0);
  }, [currentSong]);

  // =========================
  // Play / Pause
  // =========================

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log("Audio playback error:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // =========================
  // Volume
  // =========================

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  // =========================
  // Track Progress
  // =========================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateTime);

    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);

      audio.removeEventListener(
        "loadedmetadata",
        updateDuration
      );
    };
  }, []);

  // =========================
  // Save Favorites to localStorage
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "glassify_favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // =========================
  // Next Song
  // =========================

  const playNext = () => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    let nextIndex;

    if (isShuffle) {
      do {
        nextIndex = Math.floor(
          Math.random() * songs.length
        );
      } while (
        songs.length > 1 &&
        nextIndex === currentIndex
      );
    } else {
      nextIndex =
        (currentIndex + 1) % songs.length;
    }

    setCurrentSong(songs[nextIndex]);

    setIsPlaying(true);
  };

  // =========================
  // Previous Song
  // =========================

  const playPrevious = () => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const previousIndex =
      (currentIndex - 1 + songs.length) %
      songs.length;

    setCurrentSong(songs[previousIndex]);

    setIsPlaying(true);
  };

  // =========================
  // Song End
  // =========================

  const handleSongEnd = () => {
    if (isRepeat) {
      if (!audioRef.current) return;

      audioRef.current.currentTime = 0;

      audioRef.current.play().catch((error) => {
        console.log("Repeat playback error:", error);
      });

      return;
    }

    playNext();
  };

  // =========================
  // Seek
  // =========================

  const seek = (time) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;

    setCurrentTime(time);
  };

  // =========================
  // Format Time
  // =========================

  const formatTime = (time) => {
    if (!time || isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // =========================
  // Search & Filter Logic
  // =========================

  const getFilteredSongs = () => {
    let filtered = songs;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((song) => {
        const matchesTitle = song.title
          .toLowerCase()
          .includes(query);
        const matchesArtist = song.artist
          .toLowerCase()
          .includes(query);
        const matchesAlbum = song.album
          .toLowerCase()
          .includes(query);
        return (
          matchesTitle || matchesArtist || matchesAlbum
        );
      });
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter(
        (song) =>
          song.genre.toLowerCase() ===
          selectedGenre.toLowerCase()
      );
    }

    // Filter by type
    if (filterType === "songs") {
      return filtered;
    }

    if (filterType === "albums") {
      // Return unique albums
      const albums = [
        ...new Set(filtered.map((s) => s.album)),
      ];
      return albums.map((album) => ({
        album,
        songs: filtered.filter((s) => s.album === album),
      }));
    }

    if (filterType === "artists") {
      // Return unique artists
      const artists = [
        ...new Set(filtered.map((s) => s.artist)),
      ];
      return artists.map((artist) => ({
        artist,
        songs: filtered.filter((s) => s.artist === artist),
      }));
    }

    return filtered;
  };

  const getAllGenres = () => {
    const genres = [
      ...new Set(songs.map((s) => s.genre)),
    ];
    return genres.sort();
  };

  // =========================
  // Favorites Functions
  // =========================

  const toggleFavorite = (songId) => {
    setFavorites((prev) => {
      const isFavorited = prev.includes(songId);
      if (isFavorited) {
        return prev.filter((id) => id !== songId);
      } else {
        return [...prev, songId];
      }
    });
  };

  const isFavorite = (songId) => {
    return favorites.includes(songId);
  };

  const getFavoriteSongs = () => {
    return songs.filter((song) =>
      favorites.includes(song.id)
    );
  };

  // =========================
  // Context Values
  // =========================

  const value = {
    songs,

    currentSong,
    setCurrentSong,

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

    handleSongEnd,

    formatTime,

    audioRef,

    // Search & Filter
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    selectedGenre,
    setSelectedGenre,
    getFilteredSongs,
    getAllGenres,

    // Favorites
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteSongs,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}

      <audio
        ref={audioRef}
        onEnded={handleSongEnd}
      />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}