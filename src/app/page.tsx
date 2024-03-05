import ImageList from "@/components/image-list";
import SearchInput from "@/components/search-input";
import { getAllImages } from "@/db/queries/images";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-w-[80%]">
      <div className="py-4">
        <Suspense fallback="">
          <SearchInput />
        </Suspense>
      </div>

      <ImageList fetchImages={getAllImages} />
    </div>
  );
}
