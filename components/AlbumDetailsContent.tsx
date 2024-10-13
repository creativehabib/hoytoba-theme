"use client";

import { useEffect, useState } from "react";
import { Albums } from "@/types/Post";
import Image from "next/image";
import { formatDuration } from "@/lib/utils";
import fetchAlbumDetails from "@/components/actions/fetchAlbumData";
import SettingIcon from "@/components/SettingIcon";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music, Play } from "lucide-react";
import Link from "next/link";
import MusicPlayer from "@/components/MusicPlayer";

type Track = {
    title: string;
    src: string;
};

const AlbumDetailsContent = ({ slug }: { slug: string }) => {
    const [album, setAlbum] = useState<Albums | null>(null);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

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
        setCurrentTrack(track);
    };

    return (
        <div className="relative">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pb-4">
                {album.contents.map((track) => (
                    <div
                        key={track.id}
                        onClick={() =>
                            handleLinkClick({
                                title: track.title,
                                src: track.stream_url,
                            })
                        }
                        className="flex justify-between items-center shadow p-2 border border-gray-300 rounded-xl hover:bg-sky-100 cursor-pointer"
                    >
                        <button className="flex-none rounded-full flex items-center justify-center text-gray-500">
                            <Play size={20} />
                        </button>
                        <div className="flex-grow pl-2">
                            <p className="text-sm font-medium">{track.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Music player outside the map, playing the selected track */}
            <div className="mt-6">
                {currentTrack ? (
                    <MusicPlayer src={currentTrack.src} title={currentTrack.title} cover={album.album.thumbnail_url} />
                ) : (
                    <p>No track selected</p>
                )}
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
