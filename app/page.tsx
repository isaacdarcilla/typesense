'use client'

import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Results } from "@/components/results";
import { typesense } from "@/config/typesense";
import { SearchResult } from "@/types";
import { Input } from '@nextui-org/input';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function Home() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [searchValue, setSearchValue] = useState(searchParams.get('query') || '')
	const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams]
	)

	const handleSearch = (query: string) => {
		setSearchValue(query);

		typesense.collections(process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_NAME as string)
			.documents()
			.search({ 'q': searchValue, 'query_by': 'animal_name,text' })
			.then(function (searchResults: any) {
				setSearchResults(searchResults)
			})

		router.push(pathname + "?" + createQueryString("query", query));
	};

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ size: "sm" })}>Search&nbsp;</h1>
				<h1 className={title({ color: "violet", size: "sm" })}>Animal Fun Facts</h1>
				<br />
			</div>

			<div className="w-full">
				<Input
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={searchValue}
					radius="full"
					className="max-w-xl mx-auto py-3"
					autoFocus
					startContent={<SearchIcon className="text-neutral-400 mr-2" />}
				/>
			</div>
			{searchResults && <small className="-mt-4">✨ {searchResults?.found} results found - Searched {searchResults?.out_of} recipes in {searchResults?.search_time_ms}ms.</small>}

			<Results results={searchResults} />
		</section>
	);
}
