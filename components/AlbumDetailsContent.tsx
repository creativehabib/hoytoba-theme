"use client"
import { useEffect, useState } from "react";
import { Albums, Track } from "@/types/Post";
import Image from "next/image";
import { formatDuration } from "@/lib/utils";
import fetchAlbumDetails from "@/components/actions/fetchAlbumData";
import SettingIcon from "@/components/SettingIcon";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {FaMusic, FaPause, FaPlay} from "react-icons/fa";
import { useMusicPlayer } from '@/context/MusicPlayerContext'; // Import the global music player context

const AlbumDetailsContent = ({ slug }: { slug: string }) => {
    const [album, setAlbum] = useState<Albums | null>(null);
    const { setTrack, isPlaying, currentTrack, togglePlayPause } = useMusicPlayer();  // Access global music player functions

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

    const handleTrackClick = (track: Track) => {
        // Set the track and provide the full track list
        const trackList = album.contents.map((track) => ({
            title: track.title,
            src: track.stream_url,
            cover: album.album.thumbnail_url,
        }));

        if(currentTrack?.src === track.stream_url){
            togglePlayPause();
        } else {
            setTrack(
                {
                    title: track.title,
                    src: track.stream_url,
                    cover: album.album.thumbnail_url,
                },
                trackList // Pass the entire tracklist
            );
        }
        
    };

    return (
        <div>
            <SettingIcon />
            <div className="album-header mt-6">
                <Link href={`/albums`}>
                    <Button variant="outline" className="font-bold mb-4">
                        <ArrowLeft /> <span>Back to Album</span>
                    </Button>
                </Link>
                <div className="flex sm:flex-row items-center justify-between">
                    <div className="sm:w-2/3 lg:w-1/2">
                        <div className="flex space-x-1 items-center">
                            <FaMusic size={20}/>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{album.album.title}</h1>
                        </div>
                        <p className="mt-2 text-sm sm:text-base">Total Tracks: {album.contents.length}</p>
                        <p className="text-sm sm:text-base">Total Duration: {formatDuration(totalDuration)}</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Image
                            src={album.album.thumbnail_url}
                            alt={album.album.title}
                            width={100}
                            height={100}
                            priority={true}
                            className="rounded-xl shadow"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 mt-5 pb-4">
            {album.contents.map((track) => {
                    const isCurrentTrackPlaying = currentTrack?.src === track.stream_url && isPlaying;

                    return (
                        <div
                            key={track.id}
                            className={`flex items-center justify-between shadow pl-4 p-2 border rounded-lg border-gray-300 cursor-pointer hover:bg-blue-100 ${
                                currentTrack?.title === track.title && isPlaying ? "bg-blue-100" : ""
                            }`}
                        >
                            {/* Play/Pause Button */}
                            <div onClick={() => handleTrackClick(track)} className="text-gray-700">
                                {isCurrentTrackPlaying ? (
                                    <FaPause size={13}/>
                                ) : (
                                    <FaPlay size={13} />
                                )}
                            </div>

                            {/* Track Info */}
                            <div className="flex-grow overflow-hidden pl-2" onClick={() => handleTrackClick(track)}>
                                <p className={`text-sm font-medium ${currentTrack?.title === track.title && isPlaying ? "font-bold" : ""}`}>{track.title}</p>
                            </div>

                        </div>
                    );
                })}
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
        </div>
    );
};

export default AlbumDetailsContent;
