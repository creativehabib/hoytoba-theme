"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import MusicPlayer from '@/components/MusicPlayer';

type CurrentTrack = {
    title: string;
    src: string;
    cover: string;
};

interface MusicPlayerContextProps {
    currentTrack: CurrentTrack | null;
    isPlaying: boolean;
    setTrack: (track: CurrentTrack, trackList: CurrentTrack[]) => void;
    togglePlayPause: () => void;
    nextTrack: () => void; // New method for next track
    previousTrack: () => void; // New method for previous track
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(undefined);

export const useMusicPlayer = () => {
    const context = useContext(MusicPlayerContext);
    if (!context) {
        throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
    return context;
};

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [trackList, setTrackList] = useState<CurrentTrack[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0); // Track index

    const setTrack = (track: CurrentTrack, tracks: CurrentTrack[]) => {
        setCurrentTrack(track);
        setTrackList(tracks); // Set the track list
        setCurrentIndex(tracks.findIndex(t => t.src === track.src)); // Update current index
        setIsPlaying(true); // Auto-play when a new track is selected
    };

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const nextTrack = () => {
        if (trackList.length === 0) return; // No tracks to play
        const nextIndex = (currentIndex + 1) % trackList.length; // Loop to the first track
        setCurrentIndex(nextIndex);
        setCurrentTrack(trackList[nextIndex]);
        setIsPlaying(true); // Automatically play the next track
    };

    const previousTrack = () => {
        if (trackList.length === 0) return; // No tracks to play
        const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length; // Loop to the last track
        setCurrentIndex(prevIndex);
        setCurrentTrack(trackList[prevIndex]);
        setIsPlaying(true); // Automatically play the previous track
    };

    return (
        <MusicPlayerContext.Provider value={{ currentTrack, isPlaying, setTrack, togglePlayPause, nextTrack, previousTrack }}>
            {children}
            {/* MusicPlayer component stays mounted globally */}
            {currentTrack && (
                <MusicPlayer
                    src={currentTrack.src}
                    title={currentTrack.title}
                    cover={currentTrack.cover}
                    isPlaying={isPlaying}
                    onTrackEnd={nextTrack} // Go to next track when the current one ends
                    onPlayPauseToggle={togglePlayPause}
                    onNext={nextTrack} // Pass the next function
                    onPrevious={previousTrack} // Pass the previous function
                />
            )}
        </MusicPlayerContext.Provider>
    );
};
