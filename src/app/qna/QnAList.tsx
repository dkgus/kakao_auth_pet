"use client";
import React, { useState } from "react";
import data from "./qnaData.json";

const QnAList = () => {
  const [open, setOpen] = useState<number | null>(1);

  const toggle = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="p-5">
      <h3 className="pb-7">Q & A</h3>
      <div id="accordion-collapse" data-accordion="collapse">
        {data.qaList?.map((i, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === data.qaList.length - 1;

          return (
            <React.Fragment key={idx}>
              <h2 id={`accordion-collapse-heading-${idx + 1}`}>
                <button
                  type="button"
                  onClick={() => toggle(idx + 1)}
                  className={`
            flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500
            border border-gray-200
            ${!isLast ? "border-b-0" : ""}
            ${isFirst ? "rounded-t-xl" : ""}
            ${isLast ? "rounded-b-xl" : ""}
            focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400
            hover:bg-gray-100 dark:hover:bg-gray-800 gap-3
          `}
                  aria-expanded={open === idx + 1}
                  aria-controls={`accordion-collapse-body-${idx + 1}`}
                >
                  <span>{i.Q}</span>
                  <svg
                    data-accordion-icon
                    className={`w-3 h-3 shrink-0 ${
                      open === idx + 1 ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id={`accordion-collapse-body-${idx + 1}`}
                className={`${open === idx + 1 ? "" : "hidden"}`}
                aria-labelledby={`accordion-collapse-heading-${idx + 1}`}
              >
                <div
                  className={`
          p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900
          ${!isLast ? "border-b-0" : ""}
        `}
                >
                  <p className="mb-2 text-gray-500 dark:text-gray-400">{i.A}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default QnAList;
