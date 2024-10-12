import {SinglePost} from "@/types/Post";
export default async function fetchPostDetails(slug: string): Promise<SinglePost> {
    const response = await fetch(`https://api.bibijaan.com/v1/get_single_post?&slug=${slug}`);
    const data = await response.json();
    return data.data;
}