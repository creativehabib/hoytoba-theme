import Link from "next/link";
import { Maximize, Menu, Music, Settings} from "lucide-react";
import PostList from "@/components/PostList";
import {getPosts} from "@/components/actions/getPosts";
import {POSTS_PER_PAGE} from "@/config/constant";

export default async function Home() {
    const initialPost = await getPosts(0, POSTS_PER_PAGE);
  return (
      <div className="">
          <div className="mt-5 flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 font-extrabold text-gray-600">
                  <Music/>
                  <p>Media Albums</p>
              </div>
              <Link href={'/'} className="font-extrabold text-gray-600"><span>View All</span></Link>
          </div>

          {/* Album grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 border-b-2 pb-3 mb-4">
              <div className="hover:bg-sky-100 transition duration-300 hover:shadow p-2 rounded-xl mb-0">
                  <a href={''}>
                      <img
                          src={'https://cms.bibijaan.com/wp-content/uploads/2024/01/tawheed-series-2.jpg'}
                          alt={'Tawheed Series'}
                          className="object-cover h-40 mx-auto rounded-xl"
                      />
                      <p className="text-center text-gray-500 mt-2">Tawheed Series</p>
                  </a>
              </div>

              <div className="hover:bg-sky-100 transition duration-300 hover:shadow p-2 rounded-xl">
                  <a href={''}>
                      <img
                          src={'https://cms.bibijaan.com/wp-content/uploads/2024/01/seerah-makka-4.jpg'}
                          alt={'Life of the Prophet Muhammad'}
                          className="object-cover h-40 mx-auto rounded-xl"
                      />
                      <p className="text-center text-gray-500 mt-2">The Life of the Prophet Muhammad (Makkan Period)</p>
                  </a>
              </div>

              <div className="hover:bg-sky-100 transition duration-300 hover:shadow p-2 rounded-xl">
                  <a href={''}>
                      <img
                          src={'https://cms.bibijaan.com/wp-content/uploads/2024/01/sesher-golpo-1.jpg'}
                          alt={'শেষের গল্প রামাদান - ১৪৪৪'}
                          className="object-cover h-40 mx-auto rounded-xl"
                      />
                      <p className="text-center text-gray-500 mt-2">শেষের গল্প রামাদান - ১৪৪৪</p>
                  </a>
              </div>

              <div className="hover:bg-sky-100 transition duration-300 hover:shadow p-2 rounded-xl">
                  <a href={''}>
                      <img
                          src={'https://cms.bibijaan.com/wp-content/uploads/2024/01/seerah-2.jpg'}
                          alt={'Seerah Audio'}
                          className="object-cover h-40 mx-auto rounded-xl"
                      />
                      <p className="text-center text-gray-500 mt-2">সীরাহ অডিও</p>
                  </a>
              </div>
          </div>


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
