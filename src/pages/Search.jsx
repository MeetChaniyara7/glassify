import { useMusic } from "../context/MusicContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";
import MusicPlayer from "../components/MusicPlayer";

function Search() {
  const {
    searchQuery,
    filterType,
    setFilterType,
    selectedGenre,
    setSelectedGenre,
    getFilteredSongs,
    getAllGenres,
  } = useMusic();

  const filteredResults = getFilteredSongs();
  const allGenres = getAllGenres();

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "songs", label: "Songs" },
    { value: "albums", label: "Albums" },
    { value: "artists", label: "Artists" },
  ];

  const hasResults =
    filterType === "songs"
      ? filteredResults.length > 0
      : filteredResults.length > 0;

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 text-5xl sm:text-6xl">🎵</div>
      <h3 className="mb-2 text-lg sm:text-2xl font-semibold text-white">
        No music found
      </h3>
      <p className="text-xs sm:text-base text-gray-400">
        Try searching for another song, artist, or
        album.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-white pb-36">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-pink-600/10 blur-3xl" />
      </div>

      <Sidebar />

      <div className="md:ml-64">
        <Navbar />

        <main className="relative px-3 sm:px-6 pt-6 sm:pt-8">
          {/* Search Header */}
          <section className="mb-8 sm:mb-10">
            <p className="mb-2 text-xs sm:text-sm text-gray-400">
              Search Results
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              {searchQuery ? (
                <>
                  Results for{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    "{searchQuery}"
                  </span>
                </>
              ) : (
                "Search Music"
              )}
            </h1>
          </section>

          {/* Filter Buttons */}
          <section className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  filterType === option.value
                    ? "bg-white text-black shadow-lg"
                    : "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
                }`}
              >
                {option.label}
              </button>
            ))}
          </section>

          {/* Genre Filter */}
          <section className="mb-6 sm:mb-8">
            <p className="mb-2 sm:mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Genre
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                onClick={() => setSelectedGenre("all")}
                className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-200 ${
                  selectedGenre === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/20"
                }`}
              >
                All
              </button>
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-200 ${
                    selectedGenre === genre
                      ? "bg-purple-600 text-white"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/20"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </section>

          {/* Results */}
          {!searchQuery && !hasResults ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 text-5xl sm:text-6xl">🔍</div>
              <h3 className="mb-2 text-lg sm:text-2xl font-semibold text-white">
                Start searching
              </h3>
              <p className="text-xs sm:text-base text-gray-400">
                Search for songs, artists, or albums to
                get started
              </p>
            </div>
          ) : !hasResults ? (
            renderEmptyState()
          ) : filterType === "songs" || filterType === "all" ? (
            <section>
              <p className="mb-4 sm:mb-5 text-xs sm:text-sm text-gray-400">
                {filteredResults.length} song
                {filteredResults.length !== 1 ? "s" : ""}{" "}
                found
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 transition-all duration-300">
                {filteredResults.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                  />
                ))}
              </div>
            </section>
          ) : filterType === "albums" ? (
            <section>
              <p className="mb-4 sm:mb-5 text-xs sm:text-sm text-gray-400">
                {filteredResults.length} album
                {filteredResults.length !== 1 ? "s" : ""}{" "}
                found
              </p>
              <div className="space-y-6 sm:space-y-8">
                {filteredResults.map((albumData, idx) => (
                  <div key={idx}>
                    <h3 className="mb-3 text-base sm:text-lg font-semibold text-white">
                      {albumData.album}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {albumData.songs.map(
                        (song) => (
                          <SongCard
                            key={song.id}
                            song={song}
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section>
              <p className="mb-4 sm:mb-5 text-xs sm:text-sm text-gray-400">
                {filteredResults.length} artist
                {filteredResults.length !== 1 ? "s" : ""}{" "}
                found
              </p>
              <div className="space-y-6 sm:space-y-8">
                {filteredResults.map(
                  (artistData, idx) => (
                    <div key={idx}>
                      <h3 className="mb-3 text-base sm:text-lg font-semibold text-white">
                        {artistData.artist}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {artistData.songs.map(
                          (song) => (
                            <SongCard
                              key={song.id}
                              song={song}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          )}
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Search;