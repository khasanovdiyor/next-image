import ImageList from "@/components/image-list";
import AddImageForm from "./add-image-form";
import { auth } from "@/auth";
import { getUserImages } from "@/db/queries/images";

export default async function MyImages() {
  const session = await auth();

  if (!session) {
    return (
      <div className="text-4xl text-center">
        You must be logged in to view this page
      </div>
    );
  }
  return (
    <div className="">
      <h1 className="text-2xl font-bold">My Images</h1>
      <AddImageForm />
      <ImageList fetchImages={() => getUserImages(session!.user!.id)} />
    </div>
  );
}
