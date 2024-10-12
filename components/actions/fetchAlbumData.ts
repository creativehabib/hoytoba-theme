import {Albums} from "@/types/Post";
export default async function fetchAlbumDetails(slug: string): Promise<Albums> {
    const response = await fetch(`https://api.bibijaan.com/v1/media/album/slug/${slug}/content`);
    return await response.json();
}
