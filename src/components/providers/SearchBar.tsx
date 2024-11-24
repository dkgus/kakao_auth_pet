import React from "react";
import { Input } from "@/components/ui/input";
import { ChangeEvent, KeyboardEvent } from "react";

interface Props {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  setEnter: (value: string) => void;
}
const SearchBar = ({ onChange, value, setEnter }: Props) => {
  function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    );
  }

  return (
    <div className="flex items-center w-full space-x-2 rounded-lg border px-6 py-2 mb-2">
      <SearchIcon className="h-4 w-4" />
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        type="search"
        value={value}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") setEnter(value);
        }}
        placeholder="호텔명을 입력 후 Enter를 눌러주세요."
        className="w-full border-0 h-8 font-semibold "
        style={{ outline: "none", boxShadow: "none" }}
      />
    </div>
  );
};

export default SearchBar;
