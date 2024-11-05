import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

const MultiIcon = (props: { onClick?: () => void; icon: IconDefinition }) => {
  const { onClick, icon } = props;
  return (
    <div onClick={onClick}>
      <FontAwesomeIcon icon={icon} onClick={onClick} />
    </div>
  );
};

export default MultiIcon;
