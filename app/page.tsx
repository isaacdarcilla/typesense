"use client";

import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Results } from "@/components/results";
import { typesense } from "@/config/typesense";
import { SearchResult } from "@/types";
import { Code, Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../public/animation/movie.json";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") || "",
  );
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleClear = () => {
    setSearchResults(null);
    setSearchValue("");

    if (inputRef.current) {
      inputRef.current.value = "";
      router.push("/");
    }
  };

  const handleSearch = (query: string) => {
    setSearchValue(query);

    typesense
      .collections(process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_NAME as string)
      .documents()
      .search({
        q: query,
        query_by: "title,tagline,overview",
        limit: 250,
        sort_by: "release_date:desc",
      })
      .then(function (searchResults: any) {
        setSearchResults(searchResults);
      });

    router.push(pathname + "?" + createQueryString("query", query));
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ size: "md" })}>Search&nbsp;</h1>
        <h1 className={title({ color: "violet", size: "md" })}>Movies</h1>
        <br />
        <div className="flex items-center gap-1">
          <small>Powered by </small>
          <a
            href="https://typesense.org"
            target="_blank"
            rel="noopener"
            title="Movie"
          >
            <Image
              width={100}
              height={120}
              alt="Image"
              src="https://recipe-search.typesense.org/typesense.b64b6193.svg"
            />
          </a>
        </div>
      </div>

      <div className="w-full">
        <Input
          ref={inputRef}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchValue}
          radius="full"
          className="max-w-xl mx-auto py-3"
          autoFocus
          type="text"
          isClearable
          onClear={handleClear}
          startContent={<SearchIcon className="text-neutral-400 mr-2" />}
        />
        {!searchResults && (
          <>
            <Lottie
              loop
              animationData={lottieJson}
              play
              className="mx-auto mt-16 mb-6"
              style={{ width: 140, height: 140 }}
            />
            <p className="-mt-3 text-center mx-auto text-md text-gray-500">
              Search movies... Try{" "}
              <Code
                onClick={() => {
                  handleSearch("Inception");
                }}
                className="text-blue-600 cursor-pointer"
              >
                Inception
              </Code>
            </p>
          </>
        )}
      </div>

      <Results results={searchResults} />
    </section>
  );
}
