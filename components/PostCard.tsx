import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import {Calendar, Clock, Feather} from "lucide-react";
import React from "react";
import {Post} from "@/types/Post";
import Image from "next/image";

type PostCardProps = {
    post: Post,
    key?: number
}
export default function PostCard({post}: PostCardProps) {
    return (
        <Card className="hover:bg-sky-100 transition duration-300 relative">
            <CardContent className="p-0">
                <Link href={`/posts/${post.post_name}`}>
                    <h3 className="my-4 mx-5 text-xl">{post.post_title}</h3>
                    <div className="w-full">
                        <Image
                            src={post.thumbnail_url}
                            alt={post.post_title}
                            width={100}
                            height={100}
                            priority={true}
                            style={{objectFit: 'cover', width: '100%', height: 'auto'}} // Maintain aspect ratio
                        />
                    </div>
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                            <Feather size={12}/>
                            <p>{post.author.name}</p>
                        </div>

                        <div className="mt-5 leading-7 text-justify mb-12">
                            <div dangerouslySetInnerHTML={{__html: post.post_excerpt.substring(0, 190)}}/>
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