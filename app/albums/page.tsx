import {getAlbums} from "@/components/actions/getAlbums";
import AlbumList from "@/components/AlbumList";

export default async function AlbumsList() {
    const initialAlbum = await getAlbums();
  return (
    <div>
      <AlbumList initialAlbums={initialAlbum}/>
    </div>
  )
}
