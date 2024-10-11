"use client"
import React, {useState} from 'react';
import {Post} from "@/types/Post";
import {POSTS_PER_PAGE} from "@/config/constant";
import {getPosts} from "@/components/actions/getPosts";
import PostCard from "@/components/PostCard";

type PostListProps = {
    initialPosts: Post[]
}

const PostList = ({ initialPosts }: PostListProps) => {
    const [offset, setOffset] = useState(POSTS_PER_PAGE);
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);

    const loadMorePosts = async () => {
        if(hasMoreData) {
            const apiPosts = await getPosts(offset, POSTS_PER_PAGE)

            if(!apiPosts.length) {
                setHasMoreData(false)
            }

            setPosts((prevPosts) => [...prevPosts, ...apiPosts]);
            setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE)
        }
    }
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default PostList;