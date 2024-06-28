"use client"

import { HoverEffect } from "@/components/hoverCard";
import { Suspense } from "react";
import Loading from "@/app/posts/loading";

export default function () {
  return (<Suspense fallback={<Loading />}>
    <div className="mx-auto relative isolate overflow-hidden py-12 sm:py-12 lg:overflow-visible px-7 flex items-center flex-col">
      <div>
        <div className="pt-6 pb-6 mb-0">
          <h1
            data-cursor="block"
            className="mb-8 text-3xl font-extrabold leading-9 text-gray-900 dark:text-white sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
          >
            朋友们
          </h1>
        </div>
        <div className="mb-8 w-full">
          <div>
            <div
              className="markdown-body text-base leading-7 text-gray-700 dark:text-slate-300 max-w-2xl px-0"
            >
              <div className="links max-w-5xl mx-auto px-8">
                <HoverEffect items={projects} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Suspense>
  );
}

export const projects = [
  {
    title: "雪舞灵颜",
    description:
      "随至爱见至美",
    link: "https://forevers.love",
    img: "https://friend.s3-us-east-1.ossfiles.com/b_1f7895cd0c20cf1ea2f6903ffabafdf1.jpg"
  }
];