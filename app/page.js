import { Hero } from "@/components/ui/animated-hero"

export const metadata = {
  title: '首页 | Adkins的个人网站',
  description: 'Adkins的个人网站首页 - 探索、创新、分享',
}

function App() {
  return (
    <div className="block">
      <Hero />
    </div>
  );
}

export default App;