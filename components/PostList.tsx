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
    const [loading, setLoading] = useState(false)

    const loadMorePosts = async () => {
        setLoading(true)
        if(hasMoreData) {
            const apiPosts = await getPosts(offset, POSTS_PER_PAGE)
            setLoading(false)
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
                {
                    initialPosts && initialPosts.length > 0 ?
                        posts.map((post: Post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                        : <p>Not Post Found</p>
                }
            </div>
            <div className="text-center mt-5">
                {hasMoreData ? (
                <button
                    className="px-4 py-3 bg-slate-500 hover:bg-slate-600 text-slate-50 rounded-md"
                    onClick={loadMorePosts}
                >
                    {loading ? 'Loading...' : 'Load More Posts'}
                </button>
                ) : (
                <p className="text-slate-600">No more posts to load</p>
                )}
            </div>
        </div>
    );
};

export default PostList;