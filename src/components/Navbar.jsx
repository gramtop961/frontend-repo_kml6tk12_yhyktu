import { Home, Search, MapPin, PlayCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ currentPage, onNavigate }) {
  const navItems = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'explore', label: 'Explore', icon: MapPin },
    { key: 'reels', label: 'Reels', icon: PlayCircle },
    { key: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-black/40 border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }} className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 shadow-md shadow-rose-500/30" />
          <span className="font-extrabold text-xl tracking-tight">Menuza</span>
        </motion.div>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              className="w-full rounded-full bg-neutral-100 dark:bg-neutral-900 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60 shadow-inner"
              placeholder="Search cafés, events, shops…"
            />
          </div>
        </div>

        <nav className="ml-auto hidden md:flex items-center gap-2">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                currentPage === key
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon className={`h-4 w-4 ${currentPage === key ? 'text-white dark:text-black' : 'text-neutral-500'}`} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile bottom bar */}
      <div className="md:hidden border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl grid grid-cols-4">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex flex-col items-center justify-center py-2 ${currentPage === key ? 'text-rose-500' : 'text-neutral-500'}`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
