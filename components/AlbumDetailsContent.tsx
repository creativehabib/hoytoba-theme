"use client"
import {useEffect, useState} from "react";
import {Albums} from "@/types/Post";
import Image from "next/image";
import {formatDuration} from "@/lib/utils";
import fetchAlbumDetails from "@/components/actions/fetchAlbumData"
import SettingIcon from "@/components/SettingIcon";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Music, Play} from "lucide-react";
import Link from "next/link";


const AlbumDetailsContent = ({ slug }: { slug: string }) => {
    const [album, setAlbum] = useState<Albums | null>(null);

    useEffect(() => {
        const getAlbumDetails = async () => {
            const albumData = await fetchAlbumDetails(slug);
            setAlbum(albumData);
        };
        getAlbumDetails().then(r => r);
    }, [slug]);

    if (!album) {
        return <p>Loading...</p>;
    }

    const totalDuration = album.contents.reduce((acc, item) => acc + item.duration, 0);

    return (
        <div>
            <SettingIcon/>
            <div className="album-header">
                <Link href={`/albums`}><Button variant={'outline'} className="font-bold"><ArrowLeft/> Back to
                    list</Button></Link>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex space-x-1">
                            <Music/>
                            <h1 className="text-2xl font-bold">{album.album.title}</h1>
                        </div>
                        <p>Total Tracks: {album.contents.length}</p>
                        <p>Total Duration: {formatDuration(totalDuration)}</p>
                    </div>
                    <Image src={album.album.thumbnail_url} alt={album.album.title} width={150} height={150}/>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pb-4">
                {album.contents.map((track) => (
                    <Link href={track.stream_url} key={track.id}>
                        <div className="flex justify-between items-center shadow p-2 border border-gray-300 rounded-xl hover:bg-sky-100">
                            <button className="flex-none rounded-full flex items-center justify-center text-gray-500">
                                <Play size={20}/>
                            </button>
                            <div className="flex-grow pl-2">
                                <p className="text-sm font-medium">{track.title}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AlbumDetailsContent;
