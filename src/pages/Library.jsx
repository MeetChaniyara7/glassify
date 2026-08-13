import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";
import MusicPlayer from "../components/MusicPlayer";
import { useMusic } from "../context/MusicContext";

function Library() {
  const { getFavoriteSongs } = useMusic();
  const favoriteSongs = getFavoriteSongs();

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
          {/* Library Header */}
          <section className="mb-8 sm:mb-10">
            <p className="mb-2 text-xs sm:text-sm text-gray-400">
              Your Music
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              Liked Songs
            </h1>
            <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-base text-gray-400">
              {favoriteSongs.length === 0
                ? "Start liking songs to build your collection"
                : `You have ${favoriteSongs.length} liked song${
                    favoriteSongs.length !== 1 ? "s" : ""
                  }`}
            </p>
          </section>

          {/* Empty State */}
          {favoriteSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-6 text-5xl sm:text-7xl">💔</div>
              <h2 className="mb-2 text-lg sm:text-2xl font-bold text-white">
                Your liked songs will appear here
              </h2>
              <p className="max-w-md text-xs sm:text-base text-gray-400">
                Click the heart icon on any song to add it
                to your collection
              </p>
            </div>
          ) : (
            /* Liked Songs Grid */
            <section>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 transition-all duration-300">
                {favoriteSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default Library;