import { Footer } from "@/components/footer";
import "./globals.css";
import { NavBar } from "@/components/ui/tubelight-navbar"

export const metadata = {
  title: "Adkinsm",
  description: "Adkinsm Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased select-none bg-white dark:bg-neutral-950`}
      >
        <NavBar items={[
          { name: 'Home', url: '/' },
          { name: 'Blogs', url: '/posts' },
          { name: 'Tweets', url: '/pages/tweets' },
          { name: 'About', url: '/pages/about' },
        ]
        } />
        <div className="w-full">
          <div className="box-border min-w-[200px] max-w-3xl mx-auto">
            { children }
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
