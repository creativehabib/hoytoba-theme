import {getAlbums} from "@/components/actions/getAlbums";
import AlbumList from "@/components/AlbumList";
import {Metadata} from "next";

// Page-specific metadata
export const metadata: Metadata = {
    title: "মিডিয়া - Hoytoba",
    description: "Learn more about Hoytoba and our mission to connect music lovers.",
    openGraph: {
        title: "মিডিয়া - Hoytoba",
        description: "Explore Hoytoba's history and vision.",
        url: "https://hoytoba.vercel.app/albums",
    },
};

export default async function AlbumsList() {
    const initialAlbum = await getAlbums();
  return (
    <div>
      <AlbumList initialAlbums={initialAlbum}/>
    </div>
  )
}
