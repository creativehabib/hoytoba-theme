import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import {Calendar, Clock, Feather} from "lucide-react";
import React from "react";
import {Post} from "@/types/Post";
import Image from "next/image";

type PostCardProps = {
    post: Post;
}
export default function PostCard({post}: PostCardProps){
    return (
        <Card className="hover:bg-sky-100 transition duration-300 relative">
            <CardContent className="p-0">
                <Link href={''}>
                    <h3 className="my-4 mx-5 text-xl">{post.post_title}</h3>
                    <div className="w-full h-60">
                        <Image
                            src={post.thumbnail_url}
                            alt={post.post_title}
                            width={100}
                            height={100}
                            // style={{ width: '100%', height: 'auto' }} // Maintain aspect ratio
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="px-6 py-4">
                        <p className="flex items-center space-x-1"><Feather size={12}/>
                            <span>{post.author.name}</span></p>
                        <div className="mt-5 leading-7 text-justify mb-12">
                            <div dangerouslySetInnerHTML={{__html: post.post_excerpt.substring(0,190)}}/>
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
    )
}