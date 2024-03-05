import { redirect } from "next/navigation";
import ImageList from "@/components/image-list";
import { getImagesByTerm } from "@/db/queries/images";
import SearchInput from "@/components/search-input";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (!term) {
    redirect("/");
  }

  return (
    <div className="min-w-[80%]">
      <div className="py-4">
        <SearchInput />
      </div>

      <ImageList fetchImages={() => getImagesByTerm(term)} />
    </div>
  );
}
