import Header from "./components/Header";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import Benefits from "./components/Benefits";
import Process from "./components/Process";
import Footer from "./components/Footer"; 
import ChatBox from "./components/ChatBox"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <Header />
      <Hero />
      <Calculator />
      <Benefits />
      <Process />
      <Footer /> 
      
      {/* ChatBox rendered at the absolute bottom */}
      <ChatBox /> 
    </main>
  );
}