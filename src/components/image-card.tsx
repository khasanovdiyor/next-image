import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";

interface ImageCardProps {
  imageData: {
    title: string;
    user: {
      name: string | null;
    };
    imageKey: string;
    description: string;
  };
}

export default function ImageCard({
  imageData: { title, imageKey, user, description },
}: ImageCardProps) {
  const baseURL = process.env.S3_BUCKET_URL;
  return (
    <Card>
      <CardContent>
        <Image
          alt={description}
          className="aspect-video object-cover border border-gray-200 rounded-lg overflow-hidden group-hover:scale-105 transition-transform w-full dark:border-gray-800"
          width={400}
          height={600}
          src={`${baseURL}/${imageKey}`}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-col pt-4 items-start">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div>by {user.name}</div>
      </CardFooter>
    </Card>
  );
}
