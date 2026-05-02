"use client";

import React, { useState, useEffect } from 'react';
import {
  Home,
  Heart,
  Film,
  Tv,
  PlaySquare,
  Swords,
  LogOut,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import path from 'path';

type NavItem = {
  name: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, href: "/" },
  { name: 'Favourites', icon: Heart, href: "/favourites" },
  { name: 'Movies', icon: Film, href: "/movies" },
  { name: 'Web Series', icon: Tv, href: "/web-series" },
  { name: 'Videos', icon: PlaySquare, href: "/videos" },
  { name: 'Anime', icon: Swords, href: "/anime" },
];

export default function Sidebar() {
  const themes = ['dark', 'light', 'midnight', 'oled-crimson', 'dune'];
  const [themeIndex, setThemeIndex] = useState(0);
  const pathname = usePathname();
  const activeTab = navItems.find(item => item.href === pathname)?.name || 'Home';

  // Update the DOM when the index changes
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[themeIndex];

    if (currentTheme === 'dark') {
      root.removeAttribute('data-theme'); // 'dark' is our default :root
    } else {
      root.setAttribute('data-theme', currentTheme);
    }
  }, [themeIndex]);

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <aside className="flex flex-col h-screen w-64 bg-(--surface-bg) text-(--text-main) border-r border-(--border-subtle) transition-colors duration-500 font-sans">

      {/* Brand Logo Section */}
      <div className="flex items-center justify-start px-8 h-20 border-b border-(--border-subtle)">
        <h1 className="text-xl font-bold tracking-wide bg-clip-text text-(--brand-start)">
          {process.env.NEXT_PUBLIC_APP_NAME || 'Streamify'}
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
        <p className="px-5 text-[11px] font-medium tracking-widest text-(--text-muted) uppercase mb-3">
          Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.href} // Use Next.js routing
              className={`relative flex items-center w-full gap-4 px-5 py-2.5 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-(--surface-active) text-(--text-active)' 
                  : 'hover:bg-(--surface-hover) text-(--text-muted) hover:text-(--text-strong)'
              }`}
            >
              {/* Minimal Vertical Active Indicator */}
              {isActive && (
                <div className="absolute left-0 w-1 h-1/2 bg-(--text-main) rounded-r-full" />
              )}
              
              <Icon 
                size={18} 
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-colors duration-300" 
              />
              <span className={`text-sm tracking-wide ${isActive ? 'font-medium' : 'font-normal'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions Section */}
      <div className="p-3 border-t border-(--border-subtle) space-y-1">

        {/* Theme Switcher Button */}
        <button
          onClick={cycleTheme}
          className="flex items-center w-full gap-4 px-5 py-2.5 rounded-lg text-(--text-muted) hover:bg-(--surface-hover) hover:text-(--text-strong) transition-all duration-300"
        >
          <span className="text-sm tracking-wide">
            {themes[themeIndex].toLocaleUpperCase()}
          </span>
        </button>

        <button className="flex items-center w-full gap-4 px-5 py-2.5 rounded-lg text-(--text-muted) hover:bg-(--surface-hover) hover:text-(--text-strong) transition-all duration-300">
          <Settings size={18} />
          <span className="text-sm tracking-wide">Settings</span>
        </button>
        <button className="flex items-center w-full gap-4 px-5 py-2.5 rounded-lg text-(--text-muted) hover:bg-(--danger-bg) hover:text-(--danger-text) transition-all duration-300">
          <LogOut size={18} />
          <span className="text-sm tracking-wide">Logout</span>
        </button>
      </div>

    </aside>
  );
}