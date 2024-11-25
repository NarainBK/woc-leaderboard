import Home from "../components/dashboard-components/Home";
import Snowfall from "../components/dashboard-components/Snowfall";
import Navbar from "../components/Navbar";
const Test = () => {
    return (
      <div className="h-screen w-screen bg-gradient-to-r from-[#070F2B] to-[#1B1A55]">
        <Navbar />
        <Snowfall />
        <Home />
      </div>
    );
  };
  
  export default Test;