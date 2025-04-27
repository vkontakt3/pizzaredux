import Header from "./components/Header";
import "./scss/app.scss";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import FullPizza from "./Pages/FullPizza";
import { createContext, useState } from "react";

type SearchContextType = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType | null>(null)

function App() {
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className="wrapper">
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/pizza/:id" element={<FullPizza />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
