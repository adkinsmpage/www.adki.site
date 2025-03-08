'use client'

import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter-text"

function Hero() {
  const words = "Hello, There's Adkinsm.".split(" ")

  return (
    (<div
          className="h-screen flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="p-10 flex gap-4 flex-col bg-transparent">
            <div className="relative flex items-center justify-center overflow-hidden">
              <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="max-w-4xl mx-auto"
                >
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter">
                    {words.map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className="inline-block mr-4 last:mr-0"
                      >
                        {word.split("").map((letter, letterIndex) => (
                          <motion.span
                            key={`${wordIndex}-${letterIndex}`}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              delay:
                                wordIndex * 0.1 +
                                letterIndex * 0.03,
                              type: "spring",
                              stiffness: 150,
                              damping: 25,
                            }}
                            className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                        dark:from-white dark:to-white/80"
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </h1>
                </motion.div>
              </div>
            </div>

            <Typewriter
              text={["Front-end Developer / Open Sourceror / Blogger / Android Player"]}
              speed={100}
              loop={false}
              className="mt-8 font-medium text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground text-center"
            />
          </div>
        </div>)
  );
}

export { Hero };
