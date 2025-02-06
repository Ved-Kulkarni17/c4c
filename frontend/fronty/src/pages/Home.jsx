import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); // Correctly call useNavigate

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-white">
      {/* Lowest Layer - Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-particle-wave-background_23-2150521668.jpg?t=st=1738838105~exp=1738841705~hmac=dbc872a13353510e2e6758704c12b9dd0a21a48ef2c2de4e47dd9bfd998e687c&w=1800')",
        }}
      ></div>

      {/* Middle Layer - Semi-transparent Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 scale-y-[-1]"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/technology-background-with-hexagonal-net_79603-303.jpg?semt=ais_hybrid')",
        }}
      ></div>

      {/* Full-Screen Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/6 backdrop-blur-lg"></div>

      {/* Left Social Icons */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-6 z-10">
        <a href="#" className="block text-white/80 hover:text-white transition">
          <FaFacebookF size={24} />
        </a>
        <a href="#" className="block text-white/80 hover:text-white transition">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="block text-white/80 hover:text-white transition">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="block text-white/80 hover:text-white transition">
          <FaYoutube size={24} />
        </a>
      </div>

      {/* Center Content */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 w-full max-w-md text-right">
        <h1 className="text-5xl font-bold tracking-wide">codeHive</h1>
        <p className="mt-4 text-lg">
        Redefining how developers discover, learn, and collaborate. Our AI-powered platform curates open-source projects tailored to your skills and interests, letting you swipe through them effortlessly. Need help? A developer's dream 
        </p>
        <button
          onClick={() => navigate("/Dash")}
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all"
        >
          Go to Dashboard!
        </button>
      </div>

     {/* Bottom Scrolling Text */}
<div className="absolute bottom-8 w-full overflow-hidden z-10">
  <div className="whitespace-nowrap animate-marquee text-2xl text-white/80">
    Unleash Your Potential | Innovate. Collaborate. Succeed. | Empowering Ideas, Elevating Futures
  </div>
</div>

<style>
  {`
    @keyframes marquee {
      from { transform: translateX(100%); }
      to { transform: translateX(-100%); }
    }
    .animate-marquee {
      display: inline-block;
      white-space: nowrap;
      animation: marquee 10s linear infinite;
    }
  `}
</style>
    </div>
  );
}
