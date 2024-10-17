import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaTimes, FaEllipsisH } from 'react-icons/fa';
import { Volume2, VolumeX, Volume1 } from "lucide-react"; // Import volume icons
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
    const [volume, setVolume] = useState<number>(1); // Volume control
    const [lastVolume, setLastVolume] = useState<number>(1); // Store last non-muted volume
    const [isMuted, setIsMuted] = useState<boolean>(false); // Mute state
    const [showVolumeBar, setShowVolumeBar] = useState<boolean>(false); // Control the visibility of the volume bar
    const volumeControlRef = useRef<HTMLDivElement | null>(null); // Ref for the volume control container

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
        setIsMuted(newVolume === 0); // Auto-mute if volume is set to 0
    };

    const toggleMute = () => {
        if (isMuted) {
            setVolume(lastVolume); // Restore the previous volume when unmuting
            setIsMuted(false); // Unmute
        } else {
            setLastVolume(volume); // Store the current volume before muting
            setVolume(0); // Mute by setting volume to 0
            setIsMuted(true); // Mute
        }
    };

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
    
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    // Toggle volume bar visibility when clicking on volume icon
    const toggleVolumeBar = () => {
        setShowVolumeBar(!showVolumeBar);
    };

    // Handle outside click to close the volume control
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
                setShowVolumeBar(false); // Hide the volume bar if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Volume icon rendering based on current volume level
    const renderVolumeIcon = () => {
        if (isMuted || volume === 0) {
            return <VolumeX size={20} />;
        } else if (volume < 0.33) {
            return <Volume1 size={20} />;
        } else {
            return <Volume2 size={20} />;
        }
    };

    return (
        <>
        <div className="relative p-2 px-4 sm:px-6 border shadow-md w-full bg-white border-t-2 border-teal-500 sticky bottom-0 z-10">
            {/* Seek Bar inside the border-t */}
            <div className="">
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="absolute top-0 left-0 w-full h-1 appearance-none focus:outline-none"
                style={{
                    background: `linear-gradient(to right, 
                        #0d9488 ${currentTime / duration * 100}%,  /* Darker color for played part */
                        #e5e7eb ${currentTime / duration * 100}% 100%)`,  /* Lighter color for unplayed part */
                    transform: 'translateY(-50%)',
                }}
            />
                        
            </div>
            
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={onTrackEnd} // Calls the onTrackEnd function passed from the provider
            />

            <div className="flex justify-between items-center">
                <div>
                    <span className="text-xs sm:text-sm">{formatTime(currentTime)}</span>
                </div>

                <div>
                    {/* Previous, Play/Pause, Next */}
                    <div className="flex items-center space-x-4 sm:space-x-4 md:space-x-8 lg:space-x-8">
                        {/* More Options */}
                        <FaEllipsisH size={16} className="cursor-pointer" />

                        {/* Volume Control */}
                        <div ref={volumeControlRef} className="flex items-center relative">
                            <div onClick={toggleVolumeBar} className="cursor-pointer">
                                {renderVolumeIcon()} {/* Volume Icon based on current volume */}
                            </div>
                            {showVolumeBar && (
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="absolute bottom-8 left-0 w-24" // Adjust position as needed
                                    style={{ width: '80px' }}
                                />
                            )}
                        </div>

                        <FaStepBackward size={16} className="cursor-pointer" onClick={onPrevious} />
                        <div onClick={onPlayPauseToggle} className="cursor-pointer">
                            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                        </div>
                        <FaStepForward size={16} className="cursor-pointer" onClick={onNext} />

                        {/* Close Button */}
                        <FaTimes size={16} className="cursor-pointer" />
                    </div>
                </div>

                <div>
                    <span className="text-xs sm:text-sm">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Track Info */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mt-2">
                <Image src={cover} alt={title} width={40} height={40} className="shadow border rounded" />
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold">{title}</h3>
                </div>
            </div>
        </div>

        </>
    );
};

export default MusicPlayer;
