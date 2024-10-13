// app/authors/[author_slug]/page.tsx
"use client"
import { useEffect, useState } from 'react';
import { Post, AuthorPost } from '@/types/Post';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/config/constant';

type AuthorPageProps = {
  params: {
    author_slug: string; // Dynamic parameter for author slug
  };
};

const AuthorPage = ({ params }: AuthorPageProps) => {
  const { author_slug } = params; // Access the author_slug directly from params

  const [posts, setPosts] = useState<Post[]>([]);
  const [author, setAuthor] = useState<AuthorPost | null>(null);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch posts
  const fetchPosts = async (slug: string, page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/get_author?&author_slug=${slug}&page=${page}`);
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data.posts)) {
        setPosts(data.data.posts);
        setAuthor(data.data.author.name);
        setTotalPosts(data.data.total_posts);
      } else {
        setError('No posts found or invalid data structure');
      }
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    if (author_slug) {
      fetchPosts(author_slug, currentPage); // Fetch posts when author_slug is available
    }
  }, [author_slug, currentPage]); // Dependencies for effect

  // Load more posts
  const loadMorePosts = () => {
    if (posts.length < totalPosts) {
      setCurrentPage((prev) => prev + 1); // Increment page number
    }
  };


  // Render loading state or error message
  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
      <div>
        <h1>Posts by Author: {author} <strong>({totalPosts})</strong></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
              <PostCard key={post.id} post={post} /> // Render PostCard component for each post
          ))}
        </div>
        <div className="text-center mt-5 mb-4">
          {posts.length < totalPosts && (
              <Button onClick={loadMorePosts} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Load More Posts'}
              </Button>
          )}
        </div>
      </div>
  );
};

export default AuthorPage;