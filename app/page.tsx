"use client";

import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Results } from "@/components/results";
import { typesense } from "@/config/typesense";
import { SearchResult } from "@/types";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { Intro } from "@/components/intro";
import { Filter } from "@/components/filter";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") || "",
  );
  const [initialRender, setInitialRender] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    handleSearch(searchValue);
  }, [selectedYear]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleClearAll = () => {
    setSearchResults(null);
    setSearchValue("");
    setSelectedYear("");

    if (inputRef.current) {
      inputRef.current.value = "";
      router.push("/");
    }
  };

  const handleSearch = async (query: string) => {
    setSearchValue(query);

    await typesense
      .collections(process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_NAME as string)
      .documents()
      .search({
        q: query,
        query_by: "title,tagline,overview",
        limit: 250,
        sort_by: "release_date:desc",
        filter_by: selectedYear ? `release_date:!${selectedYear}` : undefined,
      })
      .then((searchResults: any) => {
        setSearchResults(searchResults);
      })
      .catch(() => setSearchResults(null));

    router.push(pathname + "?" + createQueryString("query", query));
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ size: "md" })}>Search&nbsp;</h1>
        <h1 className={title({ color: "violet", size: "md" })}>Movies</h1>
        <br />
        <div className="flex items-center gap-1 animate-pulse">
          <small>Powered by </small>
          <a
            href={siteConfig.typesenseSite}
            target="_blank"
            rel="noopener"
            title="Movie"
          >
            <Image
              width={100}
              height={120}
              alt="Image"
              src={siteConfig.typesenseImage}
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
          startContent={<SearchIcon className="text-neutral-400 mr-2" />}
          endContent={
            <Filter
              onClearAll={handleClearAll}
              onClearSelected={() => setSelectedYear("")}
              onSelect={(value) => setSelectedYear(value)}
            />
          }
        />

        {!searchResults && (
          <Intro
            movie="Inception"
            onSearch={(movie) => {
              handleSearch(movie);
            }}
          />
        )}
      </div>

      <Results results={searchResults} />
    </section>
  );
}
