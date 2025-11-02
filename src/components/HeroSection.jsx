import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroSection({ onExplore }) {
  return (
    <section className="relative">
      <div className="h-[60vh] md:h-[70vh] w-full">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/50" />

      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pb-8 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Find your next favorite spot.
            </h1>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
              Short reels, real vibes. Discover cafés, events, and indie shops around you — zero corporate cringe.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 pointer-events-auto">
              <button
                onClick={onExplore}
                className="rounded-full px-6 py-3 bg-gradient-to-tr from-rose-600 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/40 hover:shadow-rose-500/60 transition"
              >
                Start Exploring
              </button>
              <button
                onClick={onExplore}
                className="rounded-full px-6 py-3 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              >
                Show me what's nearby
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
