import { motion } from 'framer-motion';
import { MapPin, User } from 'lucide-react';

export default function ProfileView() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
        <div className="h-40 md:h-56 bg-gradient-to-tr from-rose-500 via-pink-500 to-fuchsia-500" />
        <div className="-mt-12 px-6 pb-6">
          <div className="flex items-end gap-4">
            <div className="h-24 w-24 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-lg">
              <User className="h-12 w-12" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold">@you</h2>
              <p className="text-neutral-500 text-sm flex items-center gap-1"><MapPin className="h-4 w-4" /> Near you</p>
            </div>
            <button className="rounded-full px-4 py-2 bg-black text-white dark:bg-white dark:text-black">Edit</button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 aspect-square bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
        ))}
      </div>
    </section>
  );
}
