import {AlbumContents} from "@/types/Post";
import Link from "next/link";

interface AlbumParams {
    params: {
        slug: string;
    };
}

async function fetchAlbumDetails(currentAlbumId: string | undefined) : Promise<AlbumContents[]> {
    try {
        const apiResponse = await fetch(`https://api.bibijaan.com/v1/media/album/slug/${currentAlbumId}/content`);
        return await apiResponse.json();
    } catch (e) {
        throw new Error(`Failed to fetch Album details: ${e}`);
    }
}

// Main AlbumDetails component
const AlbumDetails = async ({ params }: AlbumParams) => {
    const getAlbumDetails = await fetchAlbumDetails(params?.slug);
    console.log(getAlbumDetails.album);
    return (
        <div>
            <Link href={`/albums`}>Back to list</Link>
            <p>{getAlbumDetails.album.title}</p>
            <p>{getAlbumDetails.contents.length}</p>
            {

                getAlbumDetails.contents && getAlbumDetails.contents.length > 0 ?
                    getAlbumDetails.contents.map((item: AlbumContents) => (
                        <p key={item.id}>{item.title}</p>
                    ))
                    : 'not found'
            }
        </div>
    );
};

export default AlbumDetails;