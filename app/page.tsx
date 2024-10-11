import Link from "next/link";
import { Maximize, Menu, Music, Settings} from "lucide-react";
import PostList from "@/components/PostList";
import {getPosts} from "@/components/actions/getPosts";
import {POSTS_PER_PAGE} from "@/config/constant";
import {getAlbums} from "@/components/actions/getAlbums";
import AlbumCard from "@/components/AlbumCard";

export default async function Home() {
    const initialPost = await getPosts(0, POSTS_PER_PAGE);
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


          <div className="flex items-center justify-end mt-3 mb-4 space-x-1 text-teal-900 font-extrabold">
              <button className="hover:text-teal-600"><Menu/></button>
              <button className="hover:text-teal-600"><Maximize/></button>
              <button className="hover:text-teal-600"><Settings/></button>
          </div>

          {/* post grid */}
          <PostList initialPosts={initialPost}/>

      </div>
  );
}
