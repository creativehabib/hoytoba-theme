import AlbumDetailsContent from "@/components/AlbumDetailsContent";

const AlbumDetails = ({ params }: { params: { slug: string } }) => {
    return (
        <div>
            <AlbumDetailsContent slug={params.slug}/>
        </div>
    );
};

export default AlbumDetails;