import ImageCard from "./image-card";
import { ImageWithUser } from "@/db/queries/images";

interface ImageListProps {
  fetchImages: () => Promise<ImageWithUser[]>;
}
export default async function ImageList({ fetchImages }: ImageListProps) {
  const images = await fetchImages();

  const renderedImages = images.map((image) => {
    return <ImageCard key={image.id} imageData={image} />;
  });

  if (images.length === 0) {
    return (
      <div className="text-2xl text-center">
        No images found for given query
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {renderedImages}
    </div>
  );
}
