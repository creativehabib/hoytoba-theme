"use client"
import React, {useEffect, useState} from 'react';
import {SinglePost} from "@/types/Post";
import fetchPostDetails from "@/components/actions/fetchPostData";
import Link from "next/link";
import {Calendar, Clock, Feather} from "lucide-react";
import SettingIcon from "@/components/SettingIcon";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import { formatDateToBangla } from '@/lib/utils';

const PostDetailsContent = ({ slug }: { slug: string }) => {
    const [posts, setPosts] = useState<SinglePost | null>(null);

    useEffect(() => {
        const getPostDetails = async () => {
            const postData = await fetchPostDetails(slug);
            setPosts(postData);
        };
        getPostDetails().then(r => r);
    }, [slug]);

    if (!posts) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <SettingIcon/>
            <div className="container mt-5 mb-6">
                <Link href={'/'}><Button variant={'outline'}>Back to Home</Button></Link>
                <div className="max-w-3xl mx-auto border border-gray-200 rounded-xl shadow">
                    <article className="p-6 text-gray-700 text-justify">
                        <div className="mt-3 mb-3">
                            <h2 className="px-3 pb-3 pt-0 text-2xl font-bold text-gray-600 text-center">{posts.the_post.post_title}</h2>
                            <ul className="mt-3 mb-4 flex flex-row items-center justify-center space-x-3 w-full mx-auto">
                                <li className="flex items-center space-x-2">
                                    <Feather size={18}/>
                                    <Link href={`/authors/${posts.the_post.author.slug}`}>{posts.the_post.author.name}</Link>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <Calendar size={18}/>
                                    <span>{formatDateToBangla(posts.the_post.post_date)}</span>
                                </li>
                                <li className="flex items-center space-x-2"><Clock size={18}/> <span>{posts.the_post.post_estimated} MIN READ</span></li>
                            </ul>
                            <ul className="mt-3 mb-4 flex flex-row items-center justify-center space-x-3">
                                {posts.the_post.categories.map((category,index) => (
                                    <li className="text-gray-600" key={index}><Link href={''}># {category.name}</Link></li>
                                    ))
                                }
                            </ul>
                        </div>
                        <Image
                            src={posts.the_post.thumbnail_url}
                            alt={posts.the_post.post_title}
                            width={100}
                            height={100}
                            style={{width:"100%", height:"100%"}}

                        />
                        <div id="single_post" className="leading-8 text-lg mt-5">
                            <div dangerouslySetInnerHTML={{__html: posts.the_post.post_content}}/>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default PostDetailsContent;