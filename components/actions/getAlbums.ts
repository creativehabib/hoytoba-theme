// actions / getPosts.ts

import {Album} from "@/types/Post"
import {handleError} from "@/lib/handleError";
import {shuffleArray} from "@/lib/utils";
import {API_URL} from "@/config/constant";


export const getAlbums = async ():Promise<Album[]> => {
    try {
        const response = await fetch(`${API_URL}/media/album`)
        const data = await response.json()

        const randomData = shuffleArray(data)

        if(!response.ok){
            throw await handleError(response)
        }

        return randomData;
    } catch (error: unknown){
        console.error("Error fetching data:", error)
        throw new Error(`An error happened: ${error}`)
    }
}