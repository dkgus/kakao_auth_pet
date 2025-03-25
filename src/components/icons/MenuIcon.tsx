import { useSession } from "next-auth/react";

import MultiIcon from "@/components/icons/MultiIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import "./style.css";

const MenuIcon = (props: { type: string; toggleMenu: () => void }) => {
  const { toggleMenu, type } = props;
  const { data: session } = useSession();
  const [profile, setProfile] = useState<string>("");
  useEffect(() => {
    if (session?.user?.image) setProfile(session?.user?.image);
  }, [session]);

  return (
    <div className="custom_menu">
      {type === "l_down" ? (
        <MultiIcon icon={faBars} onClick={toggleMenu} />
      ) : (
        <Avatar onClick={toggleMenu}>
          <AvatarImage
            src={profile !== "" ? profile : "https://github.com/shadcn.png"}
            alt="아바타 아이콘"
            className="w-auto h-auto max-w-full max-h-full object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MenuIcon;
