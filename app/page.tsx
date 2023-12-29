'use client'

import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Results } from "@/components/results";
import { typesense } from "@/config/typesense";
import { SearchResult } from "@/types";
import { Code, Input, Kbd } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../public/animal.json";

export default function Home() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!
	const [searchValue, setSearchValue] = useState(searchParams.get('query') || '')
	const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
	const [isToggled, setToggled] = useState(false);

	useEffect(() => {
		handleSearch(searchParams.get('query') as string)
	}, [isToggled])

	const toggleHandler = () => {
		setToggled((prevValue) => !prevValue);
	};

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
			.search({ q: query, query_by: 'animal_name,text', limit: 250, filter_by: `media_link:${isToggled ? '=' : '!='}""` })
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
					value={searchValue}
					radius="full"
					className="max-w-xl mx-auto py-3"
					autoFocus
					type="search"
					startContent={<SearchIcon className="text-neutral-400 mr-2" />}
				/>
				{!searchResults && (
					<>
						<Lottie
							loop
							animationData={lottieJson}
							play
							className="mx-auto mt-16"
							style={{ width: 180, height: 180 }}
						/>
						<p className="-mt-3 text-center mx-auto text-md text-gray-500">
							Search animal fun facts... Try <Code onClick={() => {
								handleSearch('rabbit')
							}} className="text-blue-600 cursor-pointer">rabbit</Code>.
						</p>
					</>
				)}
			</div>

			<Results results={searchResults} onShowImage={toggleHandler} />
		</section>
	);
}
