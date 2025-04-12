import { useEffect, useRef, useState } from "react";
import { InputText } from "../Input";
import classNames from "classnames";
import { useNavigate } from "react-router";

function Navbar() {
  const ref = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // State
  const [searchValue, setSearchValue] = useState("");
  const [isInputFieldFocused, setIsInputFieldFocused] = useState(false);

  const handleClickIconSearch = () => {
    ref.current?.focus();
    setIsInputFieldFocused(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsInputFieldFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(
      `/?search=${searchValue}&order=asc&sort=name&page=1&type=multiple`
    );
  };

  return (
    <nav className="p-4 md:px-20 flex justify-between items-center">
      <img src="/logo.svg" alt="LOGO" />
      <form onSubmit={handleSubmitForm} className="relative w-[55%] md:w-[20%]">
        {!isInputFieldFocused && (
          <button
            type="button"
            className="absolute right-2 z-10 h-6 w-6 cursor-pointer"
            onClick={handleClickIconSearch}
          >
            <img
              src="/icons/magnifying-glass.svg"
              alt="search icon"
              className="w-6"
            />
          </button>
        )}
        <div
          className={classNames(
            "origin-right transform transition-transform duration-300 w-full",
            isInputFieldFocused ? "scale-x-100" : "scale-x-0"
          )}
        >
          <InputText
            id="search"
            ref={ref}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          />
        </div>
      </form>
    </nav>
  );
}

export default Navbar;
