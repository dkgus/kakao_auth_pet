import MultiIcon from "@/components/icons/MultiIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const MenuIcon = (props: { type: string; toggleMenu: () => void }) => {
  const { toggleMenu, type } = props;

  return (
    <div className="custom_menu">
      {type === "l_down" ? (
        <MultiIcon icon={faBars} onClick={toggleMenu} />
      ) : (
        <Avatar onClick={toggleMenu}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MenuIcon;
