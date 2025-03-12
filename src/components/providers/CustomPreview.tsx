import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import MultiIcon from "../icons/MultiIcon";

const CustomPreview = (props: {
  fileNm: {
    name?: string;
    type?: string;
    preview?: string | null;
    loading?: boolean;
    file?: File | null;
  };
  editImg: boolean;
  setEditImg: (value: boolean) => void;
}) => {
  const { fileNm, editImg, setEditImg } = props;
  return (
    <div className="md:pl-[6%] w-[97%] md:w-[46%] m-auto">
      <div className="flex justify-between text-[14px]">
        <div className="pb-[3%]">* 반려동물 사진 업로드</div>
        <div onClick={() => setEditImg(!editImg)}>
          {!editImg ? <MultiIcon icon={faPenToSquare} /> : "수정 취소하기"}
        </div>
      </div>
      <Image
        src={fileNm.preview ?? ""}
        alt="프로필 이미지"
        width={500}
        height={500}
        priority
      />
    </div>
  );
};

export default CustomPreview;
