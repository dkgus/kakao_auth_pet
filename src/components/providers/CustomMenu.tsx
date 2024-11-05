"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MenuIcon from "@/components/icons/MenuIcon";

const DropdownMenu = (props: {
  menuList: { key: string; value: string }[];
}) => {
  const { menuList } = props;
  const { data } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleOptionClick = (option: string) => {
    if (option === "event") {
      router.push("/event");
    }
    setIsOpen(false);
  };

  const btnClass =
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left";

  return (
    <div className="relative inline-block text-left">
      <MenuIcon toggleMenu={toggleMenu} />

      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuList?.map((item) => (
              <>
                {item.key === "event" ? (
                  <>
                    {data ? (
                      <button
                        className={btnClass}
                        onClick={() => handleOptionClick(item.key)}
                      >
                        {item.value}
                      </button>
                    ) : null}
                  </>
                ) : (
                  <button
                    className={btnClass}
                    onClick={() => handleOptionClick(item.key)}
                  >
                    {item.value}
                  </button>
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
