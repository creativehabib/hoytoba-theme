"use client"
// components/PostList.tsx
import { useState, useEffect } from 'react';
import {Post} from "@/types/Post";
import PostCard from './PostCard';
import { API_URL } from '@/config/constant';
import { Button } from './ui/button';



type ApiResponse = {
  data: {
    current_page: number;
    total_posts: number;
    posts_per_page: number;
    posts: Post[];
  };
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch initial posts when the component mounts
    fetchPosts(currentPage);
  }, []);

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/get_posts?&post_type=post&page=${page}`);
      const data: ApiResponse = await response.json(); 
      setPosts((prevPosts) => [...prevPosts, ...data.data.posts]); // Append new posts
      setTotalPosts(data.data.total_posts); // Set total post count
    } catch (error) {
      console.error('Failed to load posts', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePosts = () => {
    const nextPage = currentPage + 1;
    if (posts.length < totalPosts) {
      setCurrentPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
            
        </div>
        <div className='text-center mt-5 mb-5'>
        {posts.length < totalPosts && (
                <Button onClick={loadMorePosts} disabled={isLoading}>{isLoading ? 'Loading...' : 'Load More Posts'}</Button>
            )}
        </div>
    </div>
  );
};

export default PostList;
