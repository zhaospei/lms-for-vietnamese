"use client";

import { useCallback, useEffect, useState } from "react";
import Fetcher from '@/api/Fetcher';

type ProgressbarProps = {
  target: React.RefObject<HTMLElement>;
};

export const ProgressBar = ({ target }: ProgressbarProps) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);

  const scrollListener = useCallback(() => {
    console.log("scroll", target);
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight;
    const windowScrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
    if (maxProgress < Math.round((windowScrollTop / totalHeight) * 10)) {
        setMaxProgress(Math.round((windowScrollTop / totalHeight) * 10));
        console.log((windowScrollTop / totalHeight) * 10)
        // console.log(Math.round((windowScrollTop / totalHeight) * 10))
        console.log(maxProgress);
        Fetcher.post<any, any>('/users/changeLearn/', {
            "score": Math.round((windowScrollTop / totalHeight) * 10),
            "link": window.location.pathname,
          }).then((response : any) => {
            if (response.message === "Comment successfully created") {
              // router.reload();
              // setReply('')
              // setIsSending(1)
            //   setNewState(response.CommentId)
            //   setCntAdd(cntAdd + 1)
            }
          //   console.log(response)
          }).catch((error) => {
          //   console.log(error)
          })
    }
  }, [target, maxProgress]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <div className="w-full fixed top-[60px] left-0 right-0 z-[1000]">
      <div
        className="h-[6px] bg-gradient-to-r from-[#90D26D] to-[#2C7865]"
        style={{
          width: `${readingProgress}%`,
        }}
      />
    </div>
  );
};