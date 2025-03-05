import ReservationInfo from "@/app/hotel/ReservationInfo";
import WelcomeTitle from "@/components/providers/WelcomeTitle";
import { layoutCSS } from "@/lib/constants";

const myPage = () => {
  return (
    <div className={layoutCSS + " " + "px-3 flex flex-col jusify-between"}>
      <div className="mx-auto w-[95%] overflow-hidden">
        <div className="flex-1">
          <WelcomeTitle />
        </div>

        <div className="flex-1">
          <ReservationInfo />
        </div>
      </div>
    </div>
  );
};

export default myPage;
