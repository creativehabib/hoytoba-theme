import Link from "next/link";
import {Calendar, Maximize, Menu, Music, Settings, Clock, Feather} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";

export default function Home() {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Card className="hover:bg-sky-100 transition duration-300 relative">
                  <CardContent className="p-0">
                      <Link href={''}>
                          <h3 className="my-4 mx-5 text-xl">রিদ্দার মিছিল</h3>
                          <div className="w-full h-60">
                              <img src={'https://cms.bibijaan.com/wp-content/uploads/2020/03/riddar-michil.jpg'}
                                   className="h-full w-full object-cover"/>
                          </div>
                          <div className="px-6 py-4">
                              <p className="flex items-center space-x-1"><Feather size={12}/>
                                  <span>Bujhtesina Bishoyta</span></p>
                              <div className="mt-5 leading-7 text-justify mb-12">
                                  <p>একটা এপ ইন্সটল করার সময় টার্মস এন্ড কন্ডিশন থাকে, সেখানে &#34;I agree&#34; দিলেই
                                      কেবল আপনাকে এপটি ইন্সটল করার অনুমতি দেওয়া হবে। অন্যথায় আপনি যেই হোন না কেন, এপটি
                                      আপনাকে প্রবেশাধিকার দেবে না। একটা কো...</p>
                              </div>
                              <div
                                  className="text-sm text-gray-900 flex space-x-2 items-center px-6 py-4 absolute left-0 right-0 bottom-0">
                                  <Calendar size={12}/>
                                  <span>০২ নভেম্বর, ২০১২</span>
                                  <Clock size={12}/>
                                  <span>4 MIN READ</span>
                              </div>
                          </div>
                      </Link>
                  </CardContent>
              </Card>
              <Card className="hover:bg-sky-100 transition duration-300 relative">
                  <CardContent className="p-0">
                      <Link href={''}>
                          <h3 className="my-4 mx-5 text-xl">লাইফ ফ্যান্টাসি</h3>
                          <div className="w-full h-60">
                              <img src={'https://cms.bibijaan.com/wp-content/uploads/2019/03/11.jpg'}
                                   className="h-full w-full object-cover"/>
                          </div>
                          <div className="px-6 py-4">
                              <p className="flex items-center space-x-1"><Feather size={12}/>
                                  <span>Bujhtesina Bishoyta</span></p>
                              <div className="mt-5 leading-7 text-justify mb-12">
                                  <p>কলেজের সেই দুরন্ত সময়ে বিপ্লবের এক শিহরণ নিয়ে &#39;থ্রি ইডিয়টস&#34; মুভিটা
                                      দেখেছিলাম। তুখোড় মেধাবি এক ছেলে রানচোড় দাস একের পর এক সমাজ, শিক্ষাব্যবস্থা,
                                      আমাদের চিন্তাচেতনার ভুলগুলো চোখে আঙুল দিয়...</p>
                              </div>
                              <div
                                  className="text-sm text-gray-900 flex space-x-2 items-center px-6 py-4 absolute left-0 right-0 bottom-0">
                                  <Calendar size={12}/>
                                  <span>০২ নভেম্বর, ২০১২</span>
                                  <Clock size={12}/>
                                  <span>4 MIN READ</span>
                              </div>
                          </div>
                      </Link>
                  </CardContent>
              </Card>
              <Card className="hover:bg-sky-100 transition duration-300 relative">
                  <CardContent className="p-0">
                      <Link href={""}>
                          <h3 className="my-4 mx-5 text-xl">কাঁদিস না ভাই, মন খারাপ করিস না! সাফল্য এপারে নয়, সাফল্য
                              পৃথিবীর ওপারে</h3>
                          <div className="w-full h-60">
                              <img
                                  src={'https://cms.bibijaan.com/wp-content/uploads/2015/10/kadis-na-vai-mon-kharap-koris-na.jpg'}
                                  className="h-full w-full object-cover"/>
                          </div>
                          <div className="px-6 py-4">
                              <p className="flex items-center space-x-1"><Feather size={12}/> <span>অবুঝ বালক</span></p>
                              <div className="mt-5 mb-12 leading-7 text-justify">
                                  <p>গত অল্প কিছুদিনে আমার পরিচিত, বন্ধু, দীনি ভাই, কিংবা আত্মীয় স্বজনদের কাছ থেকে
                                      হতাশা দেখতে দেখতে একসময় নিজেই কেমন জানি হতাশ হয়ে পড়েছি। সেখান থেকেই এই লেখাটা
                                      লেখা। অন্য কারো জন্য কিনা জানি...</p>
                              </div>
                              <div
                                  className="text-sm text-gray-900 flex space-x-2 items-center px-6 py-4 absolute left-0 right-0 bottom-0">
                                  <Calendar size={12}/>
                                  <span>০২ নভেম্বর, ২০১২</span>
                                  <Clock size={12}/>
                                  <span>4 MIN READ</span>
                              </div>
                          </div>
                      </Link>
                  </CardContent>
              </Card>
              <Card className="hover:bg-sky-100 transition duration-300 relative">
                  <CardContent className="p-0">
                      <Link href={""}>
                          <h3 className="my-4 mx-5 text-xl">আমাদের আত্মপ্রতারণা</h3>
                          <div className="w-full h-60">
                              <img src={'https://cms.bibijaan.com/wp-content/uploads/2020/01/amader-attoprotarona.jpg'}
                                   className="h-full w-full object-cover"/>
                          </div>
                          <div className="px-6 py-4">
                              <p className="flex items-center space-x-1"><Feather size={12}/> <span>Zim Tanvir</span>
                              </p>
                              <div className="mt-5 mb-12 leading-7 text-justify">
                                  <p>[১] এটা প্রায়ই খুব গর্ব করে দাবি করা হয়, একুশ শতকে মানুষ অনেক এগিয়ে গেছে, অনেক
                                      উন্নত হয়েছে, তবে স্থান-কাল-পাত্র ভেদে “এগিয়ে যাওয়া” কিংবা “উন্নতি” – এই
                                      শব্দগুলোর অর্থ খুব একটা পরিষ্কার ...</p>
                              </div>
                              <div
                                  className="text-sm text-gray-900 flex space-x-2 items-center px-6 py-4 absolute left-0 right-0 bottom-0">
                                  <Calendar size={12}/>
                                  <span>০২ নভেম্বর, ২০১২</span>
                                  <Clock size={12}/>
                                  <span>4 MIN READ</span>
                              </div>
                          </div>
                      </Link>
                  </CardContent>
              </Card>
          </div>

      </div>
  );
}
