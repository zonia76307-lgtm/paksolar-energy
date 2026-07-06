import Header from "./components/Header";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import Benefits from "./components/Benefits";
import Process from "./components/Process";
import Footer from "./components/Footer"; // Yeh line add karein

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Calculator />
      <Benefits />
      <Process />
      <Footer /> {/* Yeh line add karein */}
    </main>
  );
}