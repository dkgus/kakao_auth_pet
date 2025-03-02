import { useSession } from "next-auth/react";

import MultiIcon from "@/components/icons/MultiIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import { useEffect, useState } from "react";

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
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MenuIcon;
