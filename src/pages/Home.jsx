import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SongCard from "../components/SongCard";
import AlbumCard from "../components/AlbumCard";
import MusicPlayer from "../components/MusicPlayer";

import songs from "../data/songs";

function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white pb-36">

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-pink-600/10 blur-3xl" />

      </div>

      <Sidebar />

      <div className="md:ml-64">

        <Navbar />

        <main className="relative px-3 sm:px-6 pt-6 sm:pt-8">

          <section className="mb-8 sm:mb-10">

            <p className="mb-2 text-xs sm:text-sm text-gray-400">
              Welcome back
            </p>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              Good evening, Meet 👋
            </h1>

            <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-base text-gray-400">
              Discover new music, revisit your favorites,
              and enjoy your personal soundscape.
            </p>

          </section>

          <section className="mb-10 sm:mb-12">

            <div className="mb-4 sm:mb-5 flex items-center justify-between">

              <h2 className="text-xl sm:text-2xl font-bold">
                Recently Played
              </h2>

              <button className="text-xs sm:text-sm text-gray-400 transition duration-300 hover:text-white">
                See all
              </button>

            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 transition-all duration-300">

              {songs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                />
              ))}

            </div>

          </section>

          <section>

            <div className="mb-4 sm:mb-5 flex items-center justify-between">

              <h2 className="text-xl sm:text-2xl font-bold">
                Made For You
              </h2>

              <button className="text-xs sm:text-sm text-gray-400 transition duration-300 hover:text-white">
                See all
              </button>

            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 transition-all duration-300">

              {songs.map((song) => (
                <AlbumCard
                  key={song.id}
                  song={song}
                />
              ))}

            </div>

          </section>

        </main>

      </div>

      <MusicPlayer />

    </div>
  );
}

export default Home;