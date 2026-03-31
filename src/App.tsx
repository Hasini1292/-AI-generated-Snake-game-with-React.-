/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-cyan font-mono flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden glitch-container">
      <div className="static-noise" />
      <div className="scanline" />
      
      <header className="mb-8 w-full max-w-6xl border-b-4 border-magenta pb-4 relative z-10">
        <h1 className="text-5xl md:text-7xl font-pixel text-glitch text-cyan uppercase tracking-widest" data-text="SYS.OP.NEON_BEATS">
          SYS.OP.NEON_BEATS
        </h1>
        <p className="text-magenta font-mono tracking-widest text-sm uppercase mt-2">
          {'>'} INITIALIZING NEURAL LINK... ESTABLISHED.
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-4 items-start relative z-10">
        {/* Left Sidebar - Info/Stats */}
        <div className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
          <div className="p-4 bg-black border-2 border-cyan shadow-[4px_4px_0px_#FF00FF]">
            <h2 className="text-lg font-pixel text-magenta uppercase tracking-widest mb-4 border-b border-cyan pb-2">INPUT_PARAMETERS</h2>
            <ul className="space-y-2 text-xs font-mono text-cyan">
              <li className="flex justify-between">
                <span>{'>'} VECTOR_X/Y</span>
                <span className="text-magenta">WASD / ARROWS</span>
              </li>
              <li className="flex justify-between">
                <span>{'>'} HALT_EXEC</span>
                <span className="text-magenta">SPACEBAR</span>
              </li>
              <li className="flex justify-between">
                <span>{'>'} REBOOT</span>
                <span className="text-magenta">MANUAL_OVERRIDE</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-black border-2 border-magenta shadow-[4px_4px_0px_#00FFFF]">
            <h2 className="text-lg font-pixel text-cyan uppercase tracking-widest mb-4 border-b border-magenta pb-2">CORE_DIAGNOSTICS</h2>
            <div className="text-xs text-magenta font-mono space-y-2">
              <p>{'>'} CPU_TEMP: <span className="text-cyan animate-pulse">89°C [WARNING]</span></p>
              <p>{'>'} MEMORY: <span className="text-cyan">0x00FF88A</span></p>
              <p>{'>'} THREAT_LEVEL: <span className="text-cyan">ELEVATED</span></p>
            </div>
          </div>
        </div>

        {/* Center - Game */}
        <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
          <SnakeGame />
        </div>

        {/* Right Sidebar - Music Player */}
        <div className="lg:col-span-3 flex flex-col gap-4 order-3">
          <MusicPlayer />
        </div>
      </main>

      <footer className="mt-8 w-full max-w-6xl border-t-2 border-cyan pt-4 text-magenta text-xs font-mono tracking-[0.2em] uppercase flex justify-between relative z-10">
        <span>{'>'} END_OF_LINE</span>
        <span className="animate-pulse">_</span>
      </footer>
    </div>
  );
}
