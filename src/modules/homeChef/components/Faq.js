import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CHEFS_FAQ } from "../../../utils/constant";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="flex justify-evenly ">
        <div className="text-6xl font-extrabold w-1/3">
          Frequently asked questions
        </div>
        <div className="w-6/12">
          <div className="flex flex-col gap-2">
            {CHEFS_FAQ.map((faq, index) => (
              <div>
                <div
                  className="flex justify-between"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <p className="text-4xl mb-2">{faq.question}</p>{" "}
                  <span>
                    {openIndex === index ? (
                      <IoIosArrowDown />
                    ) : (
                      <IoIosArrowUp />
                    )}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="text-2xl">{faq.answer}</div>
                )}
                <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
