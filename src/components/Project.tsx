/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useQueryClient, useInfiniteQuery } from "react-query";

import Loading from "./Loading";
import PhotoCard from "./PhotoCard";

const ACCESS_KEY = "frS4pvuZXVojHJwe5yniGI6kUGqht5Kwc-E8_Y2E1Ok";
const MAIN_URL = "https://api.unsplash.com/photos/?client_id=";
const SEARCH_URL = "https://api.unsplash.com/search/photos/?client_id=";

const Project = () => {
	const queryClient = useQueryClient();
	const [search, setSearch] = useState("");
	const [fetchSearch, setFetchSearch] = useState("");

	const fetchPhotos = async ({ pageParam = 0 }: any) => {
		const urlPage = `&page=${pageParam + 1}`;
		const urlQuery = `&query=${fetchSearch}`;

		let url = "";
		if (fetchSearch) url = `${SEARCH_URL}${ACCESS_KEY}${urlPage}${urlQuery}`;
		else url = `${MAIN_URL}${ACCESS_KEY}${urlPage}`;

		const res = await fetch(url);
		if (res.status !== 200) throw new Error();
		return await res.json();
	};

	const { hasNextPage, fetchNextPage, isFetchingNextPage, status, data } =
		useInfiniteQuery("photos", fetchPhotos, {
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.total_pages === pages.length) return;
				return pages.length;
			},
		});

	useEffect(() => {
		const listener = () => {
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight)
				if (hasNextPage && status !== "loading") fetchNextPage();
		};
		window.addEventListener("scroll", listener);
		return () => window.removeEventListener("scroll", listener);
	});

	return (
		<>
			<form className="flex items-center px-2 py-1 my-16 border-b-2 border-solid md:w-2/3 border-slate-600">
				<input
					className="flex-grow p-2 text-2xl bg-transparent outline-none text-slate-800 placeholder:capitalize placeholder:text-slate-600"
					type="text"
					value={search}
					placeholder="search"
					onChange={e => setSearch(e.target.value)}
				/>
				<button
					className="group"
					onClick={e => {
						e.preventDefault();
						setFetchSearch(search);
						queryClient.removeQueries("photos", { exact: true });
					}}>
					<FaSearch className="w-6 h-6 transition group-hover:text-slate-600 text-slate-400" />
				</button>
			</form>
			{status === "loading" ? (
				<Loading />
			) : status === "error" ? (
				<h1 className="text-3xl font-bold text-center">
					An error has occured (probably Unsplash's rate limiter)
				</h1>
			) : (
				<>
					<div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6">
						{data?.pages.map(p => {
							const iterable = fetchSearch ? p.results : p;
							return [
								...iterable.map((r: any) => <PhotoCard key={r.id} {...r} />),
							];
						})}
					</div>
					{isFetchingNextPage && <Loading />}
				</>
			)}
		</>
	);
};

export default Project;
