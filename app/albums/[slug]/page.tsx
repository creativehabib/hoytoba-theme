import Link from "next/link";
import {Albums} from "@/types/Post";
import SettingIcon from "@/components/SettingIcon";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music, Play, PlayIcon } from "lucide-react";
import Image from "next/image";

interface AlbumParams {
    params: {
        slug: string;
    };
}

async function fetchAlbumDetails(currentAlbumId: string | undefined) :Promise<Albums> {
    try {
        const apiResponse = await fetch(`https://api.bibijaan.com/v1/media/album/slug/${currentAlbumId}/content`);
        return await apiResponse.json();
    } catch (e) {
        throw new Error(`Failed to fetch Album details: ${e}`);
    }
}

const AlbumDetails = async ({params}:AlbumParams) => {
    const getAlbumDetails = await fetchAlbumDetails(params?.slug);

    const totalDuration = getAlbumDetails.contents.reduce((acc, item) => acc + item.duration, 0);

    // Convert total duration from seconds to a more readable format (hours:minutes:seconds)
    const formatDuration = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m ${secs}s`;
    };
    return (
        <div>
            <SettingIcon/>
            <Link href={`/albums`}><Button variant={'outline'} className="font-bold"><ArrowLeft/> Back to list</Button></Link>
            <div className="mt-5 flex items-center justify-between">
                <div>
                    <h4 className="text-2xl font-bold flex space-x-1">
                        <span className="font-bold"><Music/></span> 
                        <span>{getAlbumDetails.album.title}</span>
                    </h4>
                    <p>Total Tracks: {getAlbumDetails.contents.length}</p>
                    <p>Total Duration: {formatDuration(totalDuration)}</p>
                    
                </div>
                <div>
                    <Image src={getAlbumDetails.album.thumbnail_url} width={150} height={150} alt="hello" className="rounded-xl"/>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pb-4">
            {

                getAlbumDetails.contents && getAlbumDetails.contents.length > 0 ?
                    getAlbumDetails.contents.map(item => (
                                
                        <Link href={''}>
                            <div className={`flex justify-between items-center shadow p-2 border border-gray-300 rounded-xl hover:bg-sky-100`}>
                                <button
                                    className="flex-none rounded-full flex items-center justify-center text-gray-500"
                                >
                                    <Play size={20}/>
                                </button>
                                <div className="flex-grow pl-2">
                                    <p className="text-sm font-medium">{item.title}</p>
                                </div>
                            </div> 
                        </Link>

                    ))
                    : 'not found'
            }
              </div>
        </div>
    );
};

export default AlbumDetails;