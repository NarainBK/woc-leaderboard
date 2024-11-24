import Home from "../components/dashboard-components/Home";
import Snowfall from "../components/dashboard-components/Snowfall";
const Test = () => {
    return (
      <div className="h-screen w-screen bg-gradient-to-r from-[#070F2B] to-[#1B1A55]">
        <Snowfall />
        <Home />
      </div>
    );
  };
  
  export default Test;