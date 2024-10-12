import React from 'react';
import PostDetailsContent from "@/components/PostDetailsContent";

const PostDetails = ({ params }: { params: { slug: string } }) => {
    return (
        <div>
            <PostDetailsContent slug={params.slug} />
        </div>
    );
};

export default PostDetails;