'use client'

import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter-text"
import { useEffect, useState } from "react";

// 定义动画样式对象
const fadeInAnimationStyle = {
  opacity: 0,
  animation: 'fadeIn 1s ease forwards',
  WebkitAnimation: 'fadeIn 1s ease forwards',
};

function Hero() {
  const words = "Hello, There's Adkinsm.".split(" ")
  const [canAnimate, setCanAnimate] = useState(true);
  
  // 检测浏览器兼容性
  useEffect(() => {
    // 检查是否支持CSS动画和渐变
    const isCSSAnimationSupported = typeof document !== 'undefined' && 
      (typeof document.body.style.animation !== 'undefined' || 
       typeof document.body.style.webkitAnimation !== 'undefined');
    
    // 如果不支持，使用简单版本
    if (!isCSSAnimationSupported) {
      setCanAnimate(false);
    }

    // 动态添加关键帧动画到文档中
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @-webkit-keyframes fadeIn {
          from { opacity: 0; -webkit-transform: translateY(20px); }
          to { opacity: 1; -webkit-transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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
                  {canAnimate ? (
                    // 高级动画版本 - 支持现代浏览器
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
                              style={{
                                // 回退样式，增强兼容性
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                              }}
                            >
                              {letter}
                            </motion.span>
                          ))}
                        </span>
                      ))}
                    </h1>
                  ) : (
                    // 简单版本 - 适用于旧浏览器
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-gray-800 dark:text-white">
                      {words.map((word, wordIndex) => (
                        <span
                          key={wordIndex}
                          className="inline-block mr-4 last:mr-0"
                          style={{
                            ...fadeInAnimationStyle,
                            animationDelay: `${wordIndex * 0.1}s`,
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </h1>
                  )}
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
