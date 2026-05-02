import React from 'react';
import VideoCard from '@/components/ui/VideoCard';

// --- MOCK DATA ---
const trendingVideos = [
  { id: '1', title: 'Cyberpunk Edgerunners', duration: '24m', match: '99% Match', thumbnail: 'https://images.unsplash.com/photo-1533972751384-543262c82662?q=80&w=600&auto=format&fit=crop' },
  { id: '2', title: 'Dune: Part Two', duration: '2h 46m', match: '96% Match', thumbnail: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=600&auto=format&fit=crop' },
  { id: '3', title: 'The Last of Us', duration: '55m', match: '98% Match', thumbnail: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop' },
  { id: '4', title: 'Blade Runner 2049', duration: '2h 44m', match: '92% Match', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop' },
  { id: '5', title: 'Interstellar', duration: '2h 49m', match: '95% Match', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop' },
  { id: '6', title: 'The Batman', duration: '2h 56m', match: '89% Match', thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop' },
];
// -----------------

export default function HomePage() {
  return (
    <div className="w-full pb-20 pt-10">
      
      {/* MINIMAL PAGE HEADER */}
      <div className="px-8 md:px-16 mb-10">
        <h1 className="text-3xl font-bold text-(--text-strong) tracking-tight">
          Browse
        </h1>
        <p className="text-(--text-muted) mt-1 text-sm">
          Discover your next favorite show or movie.
        </p>
      </div>

      {/* CONTENT ROWS */}
      <div className="px-8 md:px-16 space-y-12">
        
        {/* Row 1: Trending Now */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-(--text-strong)">Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {trendingVideos.map((video) => (
              <div key={video.id} className="snap-start shrink-0">
                <VideoCard {...video} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sci-Fi & Fantasy */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-(--text-strong)">Sci-Fi & Fantasy</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {[...trendingVideos].reverse().map((video) => (
              <div key={`scifi-${video.id}`} className="snap-start shrink-0">
                <VideoCard {...video} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Recently Added */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-(--text-strong)">Recently Added</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {/* Shuffling the array slightly for variation */}
            {[...trendingVideos].sort(() => Math.random() - 0.5).map((video) => (
              <div key={`recent-${video.id}`} className="snap-start shrink-0">
                <VideoCard {...video} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}