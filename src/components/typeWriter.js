"use client";

import { cn } from "@/utils/cn";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

const TypewriterEffect = ({ words, className, cursorClassName }) => {
    const wordsArray = words.map((word) => ({
        ...word,
        text: word.text.split(""),
    }));

    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);

    useEffect(() => {
        if (isInView) {
            animate(
                "span",
                {
                    display: "inline-block",
                    opacity: 1,
                    width: "fit-content",
                },
                {
                    duration: 0.3,
                    delay: stagger(0.1),
                    ease: "easeInOut",
                }
            );
        }
    }, [isInView, animate]);

    const renderWords = () => {
        return (
            <motion.span ref={scope} className="inline">
                {wordsArray.map((word, idx) => (
                    <span key={`word-${idx}`} className="inline-block">
                        {word.text.map((char, index) => (
                            <motion.span
                                initial={{}}
                                key={`char-${index}`}
                                className={cn(`opacity-0 hidden`, word.className)}
                            >
                                {char}
                            </motion.span>
                        ))}
                        &nbsp;
                    </span>
                ))}
            </motion.span>
        );
    };

    return (
        <div className={cn(className)}>
            {renderWords()}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className={cn(
                    "inline-block rounded-sm w-[4px] h-1 md:h-2 lg:h-3 bg-blue-500",
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};

export default TypewriterEffect;
