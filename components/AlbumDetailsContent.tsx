"use client"
import { useEffect, useState } from "react";
import { Albums, Track } from "@/types/Post";
import Image from "next/image";
import { formatDuration } from "@/lib/utils";
import fetchAlbumDetails from "@/components/actions/fetchAlbumData";
import SettingIcon from "@/components/SettingIcon";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music, Play, Pause, Shuffle } from "lucide-react"; // Import Pause icon
import Link from "next/link";
import MusicPlayer from "@/components/MusicPlayer";

type Track = {
    title: string;
    src: string;
};

const AlbumDetailsContent = ({ slug }: { slug: string }) => {
    const [album, setAlbum] = useState<Albums | null>(null);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false); // Track play/pause status

    useEffect(() => {
        const getAlbumDetails = async () => {
            const albumData = await fetchAlbumDetails(slug);
            setAlbum(albumData);
        };
        getAlbumDetails().then((r) => r);
    }, [slug]);

    if (!album) {
        return <p>Loading...</p>;
    }

    const totalDuration = album.contents.reduce((acc, item) => acc + item.duration, 0);

    const handleLinkClick = (track: Track) => {
        setCurrentTrack({
            title: track.title,
            src: track.stream_url
        });
        setIsPlaying(true)

    };

    const handleNextTrack = () => {
        if (album && currentTrack) {
            const currentIndex = album.contents.findIndex(
                (track) => track.title === currentTrack.title
            );
            const nextIndex = (currentIndex + 1) % album.contents.length; // Loop back to the first track
            const nextTrack = album.contents[nextIndex];
            if (nextTrack.stream_url) { // Ensure stream_url exists
                setCurrentTrack({
                    title: nextTrack.title,
                    src: nextTrack.stream_url,
                });
            }
        }
    };
    

    // Function to play a random track
    const handleRandomPlay = () => {
        const randomIndex = Math.floor(Math.random() * album.contents.length);
        const randomTrack = album.contents[randomIndex];
        setCurrentTrack({
            title: randomTrack.title,
            src: randomTrack.stream_url,
        });
        setIsPlaying(true); // Automatically play the random track
    };

    return (
        <div>
            <SettingIcon />
            <div className="album-header">
                <Link href={`/albums`}>
                    <Button variant={"outline"} className="font-bold">
                        <ArrowLeft /> Back to list
                    </Button>
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex space-x-1">
                            <Music />
                            <h1 className="text-2xl font-bold">{album.album.title}</h1>
                        </div>
                        <p>Total Tracks: {album.contents.length}</p>
                        <p>Total Duration: {formatDuration(totalDuration)}</p>
                    </div>
                    <div>
                        <Image
                            src={album.album.thumbnail_url}
                            alt={album.album.title}
                            width={150}
                            height={150}
                            priority={true}
                            className="rounded-xl shadow"
                        />
                    </div>
                </div>
            </div>

            {/* Button for random play */}
            <div className="my-4">
                <Button variant="primary" onClick={handleRandomPlay} className="flex items-center space-x-2">
                    <Shuffle size={20} />
                    <span>Random Play</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pb-4">
                {album.contents.map((track) => (
                    <div
                        key={track.id}
                        onClick={() => handleLinkClick(track)}
                        className={`flex justify-between items-center shadow p-2 border border-gray-300 rounded-xl hover:bg-sky-100 cursor-pointer ${
                            currentTrack?.title === track.title && isPlaying ? "bg-sky-200" : ""
                        }`} // Highlight the selected track
                    >
                        <button className="flex-none rounded-full flex items-center justify-center text-gray-500">
                            {currentTrack?.title === track.title && isPlaying ? (
                                <Pause size={20} /> // Display Pause icon if the current track is playing
                            ) : (
                                <Play size={20} /> // Display Play icon for all other tracks
                            )}
                        </button>
                        <div className="flex-grow pl-2">
                            <p className={`text-sm font-medium ${currentTrack?.title === track.title && isPlaying ? "font-bold" : ""}`}>
                                {track.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Social share link */}
            <div className="mt-4 mb-4 p-4 shadow border border-gray-300 rounded-xl">
                <div className="flex-row">
                    <p className="mb-2">
                        To listen media in <strong>offline,</strong> please download our app:
                    </p>
                    <div className="flex items-center space-x-2">
                        <a href={""}>
                            <img
                                width={200}
                                height={100}
                                src={"https://hoytoba.com/img/google-play-badge.png"}
                                alt="hoytoba"
                            />
                        </a>
                        <a href={""}>
                            <img
                                src={"https://hoytoba.com/img/app-store-badge.png"}
                                width={200}
                                height={100}
                                alt="App Store"
                            />
                        </a>
                    </div>
                    <div className="mt-3">
                        <a href={""}>Click Here for Desktop App</a>
                    </div>
                </div>
            </div>
            {/* Music player outside the map, playing the selected or random track */}
            <div className={`flex-row mt-20 ${currentTrack ? "" : "hidden"} sm:mt-30`}>
                {currentTrack ? (
                    <MusicPlayer 
                    src={currentTrack.src} 
                    title={currentTrack.title} 
                    cover={album.album.thumbnail_url} 
                    onTrackEnd={handleNextTrack}  // Call handleNextTrack when the current track ends
                    />
                ) : ''}
            </div>
        </div>
    );
};

export default AlbumDetailsContent;
