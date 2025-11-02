import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import ExploreView from './components/ExploreView.jsx';
import ProfileView from './components/ProfileView.jsx';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="fixed inset-0 -z-0 pointer-events-none">
        <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/3 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <Navbar currentPage={page} onNavigate={(p) => setPage(p)} />

      {page === 'home' && (
        <main className="space-y-10">
          <HeroSection onExplore={() => setPage('explore')} />
          <ExploreView defaultTab="cafe" />
        </main>
      )}

      {page === 'explore' && (
        <main className="space-y-10 pt-6">
          <ExploreView defaultTab="food" />
        </main>
      )}

      {page === 'reels' && (
        <main className="space-y-10 pt-6">
          <ExploreView defaultTab="food" emphasizeReels />
        </main>
      )}

      {page === 'profile' && (
        <main className="space-y-10 pt-6">
          <ProfileView />
        </main>
      )}

      <footer className="mt-16 py-10 text-center text-sm text-neutral-500">
        Built with love for local discovery • Menuza
      </footer>
    </div>
  );
}

export default App;
