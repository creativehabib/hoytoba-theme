import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import Image from "next/image";

interface MusicPlayerProps {
    src: string;
    title: string;
    cover: string;
    onTrackEnd: () => void; // add a new prop to handle track end
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, title, cover, onTrackEnd }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        if (audioRef.current) {
            const updateDuration = () => setDuration(audioRef.current?.duration || 0);
            if ("addEventListener" in audioRef.current) {
                audioRef.current.addEventListener('loadedmetadata', updateDuration);
            }

            return () => {
                audioRef.current?.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if ("play" in audioRef.current) {
                audioRef.current.play();
            }
            setIsPlaying(true);
        }
    }, [src]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            if ("pause" in audioRef.current) {
                audioRef.current.pause();
            }
        } else {
            if ("play" in audioRef.current) {
                audioRef.current.play();
            }
        }

        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            if ("currentTime" in audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
            }
        }
    };

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = parseFloat(event.target.value);
            if ("currentTime" in audioRef.current) {
                audioRef.current.currentTime = newTime;
            }
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="p-2 px-4 sm:px-6 border shadow-md w-full bg-white border-t-2 border-teal-500 bottom-0 left-0 right-0 fixed z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <audio
                    ref={audioRef}
                    src={src}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={onTrackEnd}
                />

                {/* Controls */}
                <div className="flex items-center space-x-3">
                    <FaStepBackward size={16} className="cursor-pointer"/>
                    <div onClick={togglePlay} className="cursor-pointer">
                        {isPlaying ? <FaPause size={16}/> : <FaPlay size={16}/>}
                    </div>
                    <FaStepForward size={16} className="cursor-pointer"/>
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
