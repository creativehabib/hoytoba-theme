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
    view_count: string
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