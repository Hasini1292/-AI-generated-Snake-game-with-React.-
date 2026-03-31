import React, { useState, useRef, useEffect } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

const DUMMY_SONGS: Song[] = [
  { id: 1, title: "0x00_CORRUPTION", artist: "NULL_POINTER", duration: "3:45" },
  { id: 2, title: "MEMORY_LEAK", artist: "SEG_FAULT", duration: "4:12" },
  { id: 3, title: "BUFFER_OVERRUN", artist: "SYS_ADMIN", duration: "2:58" },
];

export const MusicPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const currentSong = DUMMY_SONGS[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % DUMMY_SONGS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + DUMMY_SONGS.length) % DUMMY_SONGS.length);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-md p-4 bg-black border-2 border-magenta shadow-[4px_4px_0px_#00FFFF] flex flex-col gap-4">
      <h2 className="text-lg font-pixel text-cyan uppercase tracking-widest border-b border-magenta pb-2">AUDIO_STREAM_DECODER</h2>
      
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 bg-black border-2 border-cyan flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
           <div className="text-magenta font-pixel text-2xl">WAV</div>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-xl font-pixel text-glitch text-cyan truncate uppercase" data-text={currentSong.title}>{currentSong.title}</h3>
          <p className="text-magenta font-mono text-xs uppercase">{'>'} SRC: {currentSong.artist}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-black border border-cyan relative overflow-hidden">
          <div 
            className="h-full bg-magenta opacity-80"
            style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
          />
          {/* Grid overlay for progress bar */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '10px 100%' }} />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-cyan">
          <span>[0:00]</span>
          <span>[{currentSong.duration}]</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-cyan pt-4">
        <button 
          onClick={handlePrev}
          className="px-3 py-1 bg-black border border-magenta text-magenta font-pixel hover:bg-magenta hover:text-black transition-colors"
        >
          {'<<'}
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-6 py-1 bg-cyan text-black font-pixel text-xl hover:bg-white transition-colors uppercase"
        >
          {isPlaying ? '[ PAUSE ]' : '[ PLAY ]'}
        </button>
        <button 
          onClick={handleNext}
          className="px-3 py-1 bg-black border border-magenta text-magenta font-pixel hover:bg-magenta hover:text-black transition-colors"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};
