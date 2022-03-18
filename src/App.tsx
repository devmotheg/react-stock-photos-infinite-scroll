/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Project from "./components/Project";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

const App = () => (
	<QueryClientProvider client={queryClient}>
		<Project queryClient={queryClient} />
		<a
			className="block mx-auto mt-12 mb-4 text-sm font-bold w-fit"
			href="https://github.com/devmotheg">
			Coded by Mohamed Muntasir
		</a>
	</QueryClientProvider>
);

export default App;
