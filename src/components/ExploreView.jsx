import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Filter, MapPin, PlayCircle, ShoppingBag } from 'lucide-react';

const categories = [
  { key: 'food', label: 'Food', color: 'from-rose-500 to-pink-500' },
  { key: 'cafe', label: 'Café', color: 'from-amber-500 to-rose-500' },
  { key: 'events', label: 'Events', color: 'from-violet-500 to-fuchsia-500' },
  { key: 'shops', label: 'Shops', color: 'from-cyan-500 to-blue-500' },
];

export default function ExploreView({ defaultTab = 'food', emphasizeReels = false }) {
  const [active, setActive] = useState(defaultTab);
  const [query, setQuery] = useState('');
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const filteredReels = useMemo(() => sampleReels.filter(r => r.tags.includes(active)), [active]);
  const filteredPlaces = useMemo(() => samplePlaces.filter(p => p.tags.includes(active)), [active]);

  useEffect(() => {
    setActive(defaultTab);
  }, [defaultTab]);

  return (
    <section ref={sectionRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Where are we exploring today?"
            className="w-full rounded-full bg-neutral-100 dark:bg-neutral-900 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/60"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <a
            href="https://www.zomato.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm hover:opacity-90"
          >
            <ShoppingBag className="h-4 w-4" />
            Order via Zomato
          </a>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm border transition ${
              active === c.key
                ? 'border-transparent text-white bg-gradient-to-r ' + c.color
                : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Reels grid */}
      <motion.div style={{ y }} className={`mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ${emphasizeReels ? '' : ''}`}>
        {filteredReels.slice(0, emphasizeReels ? 12 : 8).map((r) => (
          <motion.div
            key={r.id}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl bg-black"
          >
            <video
              src={r.src}
              muted
              playsInline
              autoPlay
              loop
              className="h-48 md:h-64 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
              <div>
                <p className="text-sm font-semibold">{r.title}</p>
                <p className="text-[11px] opacity-80">{r.distance} • {r.time}</p>
              </div>
              <PlayCircle className="h-6 w-6 opacity-90 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Map + Feed */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="aspect-[16/10] w-full">
            <iframe
              title="map"
              className="w-full h-full"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C12.90%2C77.70%2C13.06&layer=mapnik&marker=12.97%2C77.59`}
            />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="text-sm">
              <p className="font-semibold">Live map of hot spots</p>
              <p className="text-neutral-500">Tap pins to preview reels</p>
            </div>
            <a
              className="rounded-full px-4 py-2 text-sm bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              href="https://www.google.com/maps/search/cafes+near+me"
              target="_blank" rel="noreferrer"
            >Open Maps</a>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {filteredPlaces.slice(0, 6).map((p) => (
            <motion.div key={p.id} whileHover={{ y: -3 }} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 flex gap-4 items-center bg-white/70 dark:bg-black/40 backdrop-blur">
              <img src={p.image} alt={p.name} className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{p.name}</p>
                <p className="text-sm text-neutral-500 truncate">{p.desc}</p>
                <p className="text-xs text-rose-500 mt-1">{p.deal}</p>
              </div>
              <a
                href={p.cta}
                target="_blank"
                rel="noreferrer"
                className="text-sm rounded-full px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black"
              >
                Explore
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sample content (local assets or royalty-free links)
const sampleReels = [
  { id: 1, title: 'Latte art goals', src: 'https://cdn.coverr.co/videos/coverr-barista-making-coffee-1660/1080p.mp4', distance: '0.8 km', time: 'Now', tags: ['cafe', 'food'] },
  { id: 2, title: 'Street tacos vibe', src: 'https://cdn.coverr.co/videos/coverr-delicious-tacos-5237/1080p.mp4', distance: '1.2 km', time: 'Today', tags: ['food'] },
  { id: 3, title: 'Indie gig tonight', src: 'https://cdn.coverr.co/videos/coverr-live-music-1932/1080p.mp4', distance: '2.0 km', time: '8PM', tags: ['events'] },
  { id: 4, title: 'Thrift drop', src: 'https://cdn.coverr.co/videos/coverr-clothes-on-rack-5356/1080p.mp4', distance: '1.1 km', time: 'This week', tags: ['shops'] },
  { id: 5, title: 'Iced matcha chill', src: 'https://cdn.coverr.co/videos/coverr-pouring-iced-matcha-1512/1080p.mp4', distance: '0.5 km', time: 'Now', tags: ['cafe'] },
  { id: 6, title: 'Neon ramen bar', src: 'https://cdn.coverr.co/videos/coverr-ramen-noodles-1536/1080p.mp4', distance: '3.2 km', time: 'Tonight', tags: ['food'] },
  { id: 7, title: 'Art fair pop-up', src: 'https://cdn.coverr.co/videos/coverr-art-fair-2666/1080p.mp4', distance: '4.1 km', time: 'Weekend', tags: ['events'] },
  { id: 8, title: 'Sneaker consignment', src: 'https://cdn.coverr.co/videos/coverr-trying-on-shoes-7994/1080p.mp4', distance: '2.3 km', time: 'Today', tags: ['shops'] },
  { id: 9, title: 'Sunset patio', src: 'https://cdn.coverr.co/videos/coverr-sunset-terrace-1394/1080p.mp4', distance: '1.9 km', time: 'Golden hour', tags: ['cafe'] },
  { id: 10, title: 'Dumpling heaven', src: 'https://cdn.coverr.co/videos/coverr-dumplings-3098/1080p.mp4', distance: '2.8 km', time: 'Now', tags: ['food'] },
  { id: 11, title: 'Comedy open mic', src: 'https://cdn.coverr.co/videos/coverr-microphone-on-stage-6851/1080p.mp4', distance: '3.8 km', time: 'Tonight', tags: ['events'] },
  { id: 12, title: 'Vinyl digs', src: 'https://cdn.coverr.co/videos/coverr-flipping-vinyl-records-5088/1080p.mp4', distance: '2.2 km', time: 'Today', tags: ['shops'] },
];

const samplePlaces = [
  { id: 1, name: 'Bloom Café', desc: 'Minimal café • matcha • work-friendly', deal: 'Free croissant with latte — today only', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop', tags: ['cafe', 'food'], cta: 'https://www.zomato.com' },
  { id: 2, name: 'Noodle Lab', desc: 'Ramen • neon • late-night', deal: '1+1 bowls after 9PM', image: 'https://images.unsplash.com/photo-1552356976-998ea5f69a44?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCbG9vbSUyMENhZiVDMyVBOXxlbnwwfDB8fHwxNzYyMTE1MzE3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', tags: ['food'], cta: 'https://www.zomato.com' },
  { id: 3, name: 'Indie Stage', desc: 'Live music • local artists', deal: 'Free entry before 8PM', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop', tags: ['events'], cta: 'https://www.district.com' },
  { id: 4, name: 'Thrift District', desc: 'Thrift • vintage • sneakers', deal: 'New drop this Friday', image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop', tags: ['shops'], cta: 'https://www.district.com' },
  { id: 5, name: 'Street Bites', desc: 'Tacos • quick eats', deal: 'Combo under $5', image: 'https://images.unsplash.com/photo-1552356976-998ea5f69a44?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCbG9vbSUyMENhZiVDMyVBOXxlbnwwfDB8fHwxNzYyMTE1MzE3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', tags: ['food'], cta: 'https://www.zomato.com' },
  { id: 6, name: 'Book Nook', desc: 'Indie bookstore • cozy corners', deal: 'Bookmark on the house', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop', tags: ['shops'], cta: 'https://www.district.com' },
];
