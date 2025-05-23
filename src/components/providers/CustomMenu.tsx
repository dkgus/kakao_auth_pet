"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import MenuIcon from "@/components/icons/MenuIcon";

const DropdownMenu = (props: {
  type: string;
  menuList: { key: string; value: string }[];
}) => {
  const { menuList, type } = props;
  const { data } = useSession();
  const router = useRouter();
  const direction = type === "l_down" ? "left-0" : "right-0";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleOptionClick = async (option: string) => {
    console.log("option", option);
    const actions: { [key: string]: () => Promise<void> | void } = {
      qna: () => router.push("/qna"),
      event: () => router.push("/event"),
      hotel: () => router.push("/hotel"),
      myPage: () => router.push(`/my-page/${data?.userId}`),
      logout: async () => {
        await signOut({ callbackUrl: "/" });
      },
    };

    const action = actions[option];
    if (action) await action();

    setIsOpen(false);
  };

  const btnClass =
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left";

  return (
    <div className="relative inline-block text-left">
      <MenuIcon toggleMenu={toggleMenu} type={type} />
      {isOpen && (
        <div
          className={`absolute ${direction} z-10 mt-1 w-[170px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuList?.map((item, idx) => (
              <div key={idx}>
                <button
                  className={btnClass}
                  onClick={() => handleOptionClick(item.key)}
                >
                  {item.value}
                </button>
                {/* {item.key === "event" ? (
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
                )} */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
