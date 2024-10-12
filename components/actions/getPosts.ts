// actions / getPosts.ts

import { Post } from "@/types/Post"
import {getApiUrl} from "@/lib/getApiUrl";
import {handleError} from "@/lib/handleError";
import {shuffleArray} from "@/lib/utils";
import {POSTS_PER_PAGE} from "@/config/constant";


export const getPosts = async () => {
    const url = getApiUrl(POSTS_PER_PAGE)

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