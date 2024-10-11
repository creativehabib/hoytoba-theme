import {Album} from "@/types/Post";
import Link from "next/link";
import Image from "next/image";

interface AlbumListProps {
    initialAlbums: Album[]
}
const AlbumCard = ({initialAlbums}:AlbumListProps) => {
    const limitedAlbum = initialAlbums.slice(0, 4);
    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 border-b-2 pb-3 mb-4">
                {
                    limitedAlbum && limitedAlbum.length > 0 ?
                    limitedAlbum.map(album => 
                        <div key={album.id} className="hover:bg-sky-100 transition duration-300 hover:shadow p-2 rounded-xl mb-0">
                            <Link href={`/albums/${album.slug}`}>
                                <Image src={album.thumbnail_url} alt={album.title} width={180} height={100} className="object-cover h-40 mx-auto rounded-xl"/>
                                <p className="text-center text-gray-500 mt-2">{album.title}</p>
                            </Link>
                        </div>
                    )
                        :
                        <div className="max-w-7xl mx-auto">
                            <div>
                                <p>Not Post Found</p>
                            </div>
                        </div>
                }

            </div>
        </div>
    );
};

export default AlbumCard;