import {
  Home,
  Search,
  Library,
  Heart,
  Plus,
  Music2,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useMusic } from "../context/MusicContext";

function Sidebar() {
  const { getFavoriteSongs } = useMusic();
  const favoriteSongs = getFavoriteSongs();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Search",
      path: "/search",
      icon: Search,
    },
    {
      name: "Your Library",
      path: "/library",
      icon: Library,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-white/10 bg-white/5 p-5 backdrop-blur-2xl md:block">
      
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Music2 size={22} />
        </div>

        <h1 className="text-2xl font-bold tracking-wide">
          Glassify
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-white/15 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Library Section */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Your Library
          </p>

          <button className="text-gray-400 transition hover:text-white">
            <Plus size={18} />
          </button>
        </div>

        <div className="space-y-2">
          <NavLink
            to="/library"
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Heart size={18} />
            <div className="flex-1 overflow-hidden">
              <span className="block truncate">
                Liked Songs
              </span>
              <span className="block truncate text-xs text-gray-500">
                {favoriteSongs.length} song
                {favoriteSongs.length !== 1 ? "s" : ""}
              </span>
            </div>
          </NavLink>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-gray-400 transition hover:bg-white/10 hover:text-white">
            <Music2 size={18} />
            <span>My Playlist</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;