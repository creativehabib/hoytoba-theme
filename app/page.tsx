import Link from "next/link";
import {Music} from "lucide-react";
import PostList from "@/components/PostList";
import {getAlbums} from "@/components/actions/getAlbums";
import AlbumCard from "@/components/AlbumCard";
import SettingIcon from "@/components/SettingIcon";
import {Metadata} from "next";


// Page-specific metadata
export const metadata: Metadata = {
    title: "মূলপাতা - Hoytoba",
    description: "Learn more about Hoytoba and our mission to connect music lovers.",
    openGraph: {
        title: "মূলপাতা - Hoytoba",
        description: "Explore Hoytoba's history and vision.",
        url: "https://hoytoba.vercel.app/",
    },
};


export default async function Home() {
    const initialAlbum = await getAlbums();
  return (
      <div className="">
          <div className="mt-5 flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 font-extrabold text-gray-600">
                  <Music/>
                  <p>Media Albums</p>
              </div>
              <Link href={'/albums'} className="font-extrabold text-gray-600"><span>View All</span></Link>
          </div>

          {/* Album grid */}
          <AlbumCard initialAlbums={initialAlbum}/>

        {/* Setting Icons */}
        <SettingIcon/>          

          {/* post grid */}
          <PostList/>

      </div>
  );
}
