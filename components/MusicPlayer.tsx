import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

interface MusicPlayerProps {
    src: string;
    title: string;
    cover: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, title, cover }) => {
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
        <div className="flex justify-between flex-wrap mx-auto p-2 px-6 items-center space-x-4 border shadow-md w-full bg-white border-t-2 border-teal-500 bottom-0 left-0 right-0 fixed z-10">
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
            />

            {/* Controls */}
            <div className="flex items-center space-x-3">
                <FaStepBackward size={20} className="cursor-pointer" />
                <div onClick={togglePlay} className="cursor-pointer">
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </div>
                <FaStepForward size={20} className="cursor-pointer" />
            </div>

            {/* Seek Bar */}
            <div className="flex items-center space-x-3 w-64">
                <span className="text-sm">{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full"
                />
                <span className="text-sm">{formatTime(duration)}</span>
            </div>

            {/* Track Info */}
            <div className="flex items-center space-x-3">
                <img src={cover} alt={title} className="w-12 h-12 rounded" />
                <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
