import React, { useRef, useState, useEffect } from 'react';
import {FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute} from 'react-icons/fa';
import Image from "next/image";

interface MusicPlayerProps {
    src: string;
    title: string;
    cover: string;
    onTrackEnd: () => void;
    isPlaying: boolean;
    onPlayPauseToggle: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, title, cover, onTrackEnd, isPlaying, onPlayPauseToggle, onNext, onPrevious }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1); // Add state for volume
    const [isMuted, setIsMuted] = useState<boolean>(false); // Mute state

    useEffect(() => {
        if (audioRef.current) {
            const updateDuration = () => setDuration(audioRef.current?.duration || 0);
            audioRef.current.addEventListener('loadedmetadata', updateDuration);

            return () => {
                audioRef.current?.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [src, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume; // Update volume or mute audio
        }
    }, [volume, isMuted]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = parseFloat(event.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        setIsMuted(false); // Unmute when the volume slider is used
    };

    const toggleMute = () => {
        setIsMuted((prev) => !prev); // Toggle mute state
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="p-2 px-4 sm:px-6 border shadow-md w-full bg-white border-t-2 border-teal-500 sticky bottom-0 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <audio
                    ref={audioRef}
                    src={src}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={onTrackEnd} // Calls the onTrackEnd function passed from the provider
                />

                {/* Controls */}
                <div className="flex items-center space-x-3">
                    <FaStepBackward size={16} className="cursor-pointer" onClick={onPrevious} /> {/* Previous Button */}
                    <div onClick={onPlayPauseToggle} className="cursor-pointer">
                        {isPlaying ? <FaPause size={16}/> : <FaPlay size={16}/> }
                    </div>
                    <FaStepForward size={16} className="cursor-pointer" onClick={onNext} /> {/* Next Button */}
                </div>

                {/* Seek Bar */}
                <div className="flex items-center space-x-2 w-full sm:w-1/2 lg:w-1/3">
                    <span className="text-xs sm:text-sm">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full"
                    />
                    <span className="text-xs sm:text-sm">{formatTime(duration)}</span>
                </div>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                    <div onClick={toggleMute} className="cursor-pointer">
                        {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />} {/* Mute/Unmute Toggle */}
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full"
                    />
                </div>

                {/* Track Info */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <Image src={cover} alt={title} width={40} height={40} className="shadow border rounded"/>
                    <div>
                        <h3 className="text-xs sm:text-sm font-semibold">{title}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
