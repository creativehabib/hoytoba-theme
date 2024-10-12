import Link from "next/link";
import {Music} from "lucide-react";
import PostList from "@/components/PostList";
import {getPosts} from "@/components/actions/getPosts";
import {POSTS_PER_PAGE} from "@/config/constant";
import {getAlbums} from "@/components/actions/getAlbums";
import AlbumCard from "@/components/AlbumCard";
import SettingIcon from "@/components/SettingIcon";

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

        {/* Setting Icons */}
        <SettingIcon/>          

          {/* post grid */}
          <PostList initialPosts={initialPost}/>

      </div>
  );
}
