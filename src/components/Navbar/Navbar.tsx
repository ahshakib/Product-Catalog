import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { toggleTheme } from "../../redux/themeSlice";
import { Link } from "react-router";

interface RootState {
  theme: {
    mode: string;
  };
}

function Navbar() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between items-center p-6 shadow-md dark:shadow-blue-700">
      <div className="text-3xl font-bold text-blue-500 tracking-widest uppercase">
        <Link to='/'>EStore</Link>
      </div>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition duration-500 ease-in-out"
      >
        {theme === "light" ? (
          <MoonIcon className="h-6 w-6 text-gray-800" />
        ) : (
          <SunIcon className="h-6 w-6 text-yellow-400" />
        )}
      </button>
    </nav>
  );
}

export default Navbar;