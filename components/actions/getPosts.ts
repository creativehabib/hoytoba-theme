// actions / getPosts.ts

import { Post } from "@/types/Post"
import {getApiUrl} from "@/lib/getApiUrl";
import {handleError} from "@/lib/handleError";
import {shuffleArray} from "@/lib/utils";


export const getPosts = async (
    offset: number,
    limit: number
): Promise<Post[]> => {
    const url = getApiUrl(offset,limit)

    try {
        const response = await fetch(url)
        const data = await response.json()

        const randomData = shuffleArray(data.data.posts)

        if(!response.ok){
            throw await handleError(response)
        }

        return randomData;
    } catch (error: unknown){
        console.error("Error fetching data:", error)
        throw new Error(`An error happened: ${error}`)
    }
}