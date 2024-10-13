import {Albums} from "@/types/Post";
export default async function fetchAuthorData(page: number, author:string): Promise<Albums> {
    const response = await fetch(`https://api.bibijaan.com/v1/get_author?&author_slug=${author}&page=${page}`);
    return await response.json();
}