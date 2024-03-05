"use client";

import { useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { search } from "@/actions";

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <Input
        name="term"
        placeholder="Search"
        defaultValue={searchParams.get("term") || ""}
      />
    </form>
  );
}
