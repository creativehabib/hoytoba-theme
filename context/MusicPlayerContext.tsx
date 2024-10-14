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
    nextTrack: () => void;
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
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

    const setTrack = (track: CurrentTrack, tracks: CurrentTrack[]) => {
        if (currentTrack?.src === track.src) {
            // If the same track is clicked, toggle play/pause
            setIsPlaying((prev) => !prev);
        } else {
            // Set new track and start playing it
            setCurrentTrack(track);
            setTrackList(tracks);
            setCurrentTrackIndex(tracks.findIndex(t => t.src === track.src));
            setIsPlaying(true); // Autoplay when a new track is selected
        }
    };

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const nextTrack = () => {
        const nextIndex = currentTrackIndex + 1;
        if (nextIndex < trackList.length) {
            setCurrentTrack(trackList[nextIndex]);
            setCurrentTrackIndex(nextIndex);
            setIsPlaying(true); // Autoplay the next track
        }
    };

    return (
        <MusicPlayerContext.Provider value={{ currentTrack, isPlaying, setTrack, togglePlayPause, nextTrack }}>
            {children}
            {/* MusicPlayer component stays mounted globally */}
            {currentTrack && (
                <MusicPlayer
                    src={currentTrack.src}
                    title={currentTrack.title}
                    cover={currentTrack.cover}
                    isPlaying={isPlaying}
                    onTrackEnd={nextTrack}  // Autoplay next track
                    onPlayPauseToggle={togglePlayPause}
                />
            )}
        </MusicPlayerContext.Provider>
    );
};
