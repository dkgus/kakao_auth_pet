import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

const MultiIcon = ({
  icon,
  onClick,
}: {
  icon: IconDefinition;
  onClick?: () => void;
}) => {
  return (
    <div onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default MultiIcon;
