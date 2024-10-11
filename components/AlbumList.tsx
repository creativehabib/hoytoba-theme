"use client"

import { Album } from "@/types/Post";
import { useState } from "react";
import { getAlbums } from "@/components/actions/getAlbums"


type AlbumListProps = {
    initialAlbums: Album[]
}
const AlbumList = ({initialAlbums}:AlbumListProps) => {

    const [album, setAlbum] = useState<Album[]>(initialAlbums)

}

export default AlbumList;