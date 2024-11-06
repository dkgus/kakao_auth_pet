import { layoutCSS } from "@/lib/constants";
import HotelList from "@/app/hotel/HotelList";

const HotelPage = () => {
  return (
    <div className={layoutCSS + " " + "px-3"}>
      <HotelList />
    </div>
  );
};

export default HotelPage;
