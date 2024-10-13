// types/Post.ts
export interface Post {
    id: number,
    post_date: string,
    post_title: string,
    post_name: string,
    post_modified: string,
    post_type: string,
    post_serial: number,
    is_featured: boolean,
    thumbnail_url: string,
    original_content_link: string,
    author: Author,
    post_estimated: number,
    post_excerpt: string,
    has_pdf: boolean,
    view_count: string,
    slug: string
}
export interface AuthorPost {
    command: string;
    data: {
      author: Author;  // Update according to your author data structure
      posts_per_page: number;
      current_page: number;
      total_posts: number;
      posts: Post[];
    };
  }
export interface Author {
    slug: string;
    name: string;
}

export interface Album {
    id: number,
    slug: string,
    title: string,
    english: string,
    desc: string,
    thumbnail_url: string,
    r2_base_url: string,
    album_type: string,
    language: string,
    author_id: number,
    author_uuid: string,
    status: string,
    created_at: string,
    updated_at: string,
}

export interface SinglePost{
    the_post:{
        id: number,
        post_date: string|number,
        post_title: string,
        post_name: string,
        post_modified: string,
        post_type: string,
        post_serial: number,
        is_featured: boolean,
        post_content: string,
        thumbnail_url: string,
        original_content_link: string,
        author: Author,
        post_estimated: number,
        categories: PostCategory[],
        has_pdf: boolean,
        view_count:number
    };
    next_post:NexAndPrevPost[];
    prev_post: NexAndPrevPost[];
}
export interface PostCategory{
    name: string,
    slug: string,
}
export interface NexAndPrevPost {
    id: number,
    post_date: string,
    post_title: string,
    post_name: string,
    post_modified: string,
    post_type: string,
    post_serial: number,
    is_featured: boolean,
    thumbnail_url: string,
    original_content_link: string,
    author: Author,
    post_estimated: number,
    has_pdf: boolean,
    view_count: number
}
export interface Albums{
    album: {
        id: number,
        slug: string,
        title: string,
        english: string,
        desc: string,
        thumbnail_url: string,
        r2_base_url: string,
        album_type: string,
        language: string,
        author_id: number,
        author_uuid: string,
        status: string,
        created_at: string,
        updated_at: string,
        deleted_at: string
    };
    contents: AlbumContents[];
}

export interface AlbumContents {
    id: number,
    slug: string,
    title: string,
    english: string,
    desc: string,
    content_type: string,
    album_id: number,
    album_uuid: string,
    thumbnail_url: string,
    stream_url: string,
    site: string,
    post_id: string,
    post_type: string,
    post_title: string,
    file_extension: string,
    duration: number,
    size: number,
    sha: string,
    status: string,
    created_at: string,
    updated_at: string,
    deleted_at: string
}
