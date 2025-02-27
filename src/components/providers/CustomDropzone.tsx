import React from "react";

import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import MultiIcon from "../icons/MultiIcon";

interface FileType {
  fileNm: {
    name?: string;
    type?: string;
    preview?: string | null;
    loading?: boolean;
    file?: File | null;
  };
  setFileNm: (fileNm: FileType["fileNm"]) => void;
}

const CustomDropzone = ({ fileNm, setFileNm }: FileType) => {
  return (
    <>
      <div className="dropzoneBox flex flex-col">
        <label
          aria-label="uploadFile"
          className="w-[76%] bg-white text-gray-500 font-semibold text-base rounded max-w-md h-[35vh] flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 mb-2 fill-gray-500"
            viewBox="0 0 32 32"
          >
            <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
            <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
          </svg>
          Upload Image
          <input
            type="file"
            accept="image/*"
            id="uploadFile1"
            className="hidden"
            onChange={(e) => {
              console.log("edfx", e);
              const data = e?.target?.files?.[0];
              if (!data) return;

              if (
                !["image/png", "image/jpg", "image/jpeg"].includes(data.type)
              ) {
                alert("파일 타입오류");
                return;
              }

              const fileData = {
                name: data.name ?? "",
                type: data.type ?? "",
                preview: URL.createObjectURL(data),
                file: data,
                loading: false,
              };

              setFileNm(fileData);
            }}
          />
          <p className="text-xs font-medium text-gray-400 mt-2">
            한 장의 이미지만 업로드 가능합니다.
          </p>
        </label>
      </div>

      {fileNm.name !== "" && fileNm.type !== "" && (
        <div className="w-[76%] mx-auto my-[3%] grid gap-4">
          <div className="w-full grid gap-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={fileNm?.preview ?? ""}
                  alt="썸네일"
                  className="w-10 h-10 object-cover rounded-lg shadow-md"
                />

                <div className="grid gap-1">
                  <h4 className="text-gray-900 text-sm font-normal font-['Inter'] leading-snug">
                    {fileNm.name}
                  </h4>
                  <h5 className="text-gray-400   text-xs font-normal font-['Inter'] leading-[18px]">
                    {fileNm.loading ? (
                      <div className="flex">
                        <MultiIcon icon={faSpinner} color="red" />{" "}
                        <div className="pl-1">업로드 중</div>
                      </div>
                    ) : (
                      <div className="flex">
                        <MultiIcon icon={faCheck} color="green" />{" "}
                        <div className="pl-1">이미지 로드 완료</div>
                      </div>
                    )}
                  </h5>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => {
                  setFileNm({
                    name: "",
                    type: "",
                    preview: null,
                    loading: true,
                    file: null,
                  });
                }}
              >
                <g id="Upload 3">
                  <path
                    id="icon"
                    d="M15 9L12 12M12 12L9 15M12 12L9 9M12 12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="#e31e24"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomDropzone;
