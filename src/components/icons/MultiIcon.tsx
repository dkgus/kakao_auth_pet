import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

const MultiIcon = ({
  icon,
  onClick,
  color,
}: {
  icon: IconDefinition;
  onClick?: () => void;
  color?: string;
}) => {
  return (
    <div onClick={onClick}>
      <FontAwesomeIcon icon={icon} color={color ? color : ""} />
    </div>
  );
};

export default MultiIcon;
