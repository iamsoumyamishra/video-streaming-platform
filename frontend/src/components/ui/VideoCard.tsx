import Link from 'next/link';
import { Play } from 'lucide-react';

type VideoCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  match: string;
};

export default function VideoCard({ id, title, thumbnail, duration, match }: VideoCardProps) {
  return (
    <Link 
      href={`/watch/${id}`} 
      // FIX: Changed w-64 to w-44 (narrower) and aspect-video to aspect-[2/3] (vertical portrait)
      className="block group relative flex-none w-40 sm:w-44 md:w-48 aspect-2/3 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 focus:outline-none focus:ring-2 focus:ring-(--brand-start) shadow-lg"
    >
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      
      {/* Dark Overlay (always subtle, darkens on hover to show text) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Hover Content (Play Button) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-4 z-20">
        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 text-white border border-white/30 shadow-xl">
          <Play fill="currentColor" size={28} />
        </div>
      </div>

      {/* Bottom Text Information */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-1.5 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{title}</h3>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium mt-1">
          <span className="text-green-400 font-bold">{match}</span>
          <span className="text-gray-300 border border-gray-500 px-1 rounded-sm">16+</span>
          <span className="text-gray-300">{duration}</span>
        </div>
      </div>
      
    </Link>
  );
}