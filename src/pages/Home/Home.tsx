import Hero from "../../components/Home/Hero";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;
