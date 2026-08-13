import { Search, Bell, User, X, Menu } from "lucide-react";
import { useMusic } from "../context/MusicContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const { searchQuery, setSearchQuery } = useMusic();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      navigate("/search");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 sm:h-20 items-center justify-between border-b border-white/10 bg-black/20 px-3 sm:px-6 backdrop-blur-xl transition-all duration-300">
      
      {/* Search - Hidden on mobile when menu is open */}
      <div className={`relative w-full transition-all duration-300 ${isMobileMenuOpen ? "hidden" : "max-w-md"}`}>
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search songs, artists..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-full border border-white/10 bg-white/10 py-2 pl-12 pr-12 text-sm text-white outline-none placeholder:text-gray-500 transition duration-300 focus:bg-white/15 focus:border-white/20 sm:py-3"
        />

        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition duration-300 hover:scale-110 hover:text-white"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Right side - Desktop */}
      <div className="ml-3 hidden items-center gap-3 sm:ml-6 sm:flex">
        <button className="rounded-full p-2 text-gray-400 transition duration-300 hover:bg-white/10 hover:scale-110 hover:text-white">
          <Bell size={20} />
        </button>

        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 transition duration-300 hover:bg-white/15">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <User size={16} />
          </div>

          <span className="hidden text-sm md:block">
            Meet
          </span>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="sm:hidden ml-2 p-2 text-gray-400 transition duration-300 hover:bg-white/10 hover:text-white rounded-lg"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>
    </header>
  );
}

export default Navbar;