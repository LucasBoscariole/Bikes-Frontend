import React from "react";
import { useSelector } from "react-redux";
import { selectBikeState } from "../../store/bikes";
import BikeItem from "../BikeItem/BikeItem";

const BikesView = () => {
  const { bikesByUser } = useSelector(selectBikeState);
  return bikesByUser?.length === 0 ? (
    <h1>You currently don&apos;t have any bicycle listed, try adding on.</h1>
  ) : (
    <div className="grid grid-cols-3 gap-5 w-full laptop:w-[78%]">
      {bikesByUser?.map((item) => {
        return <BikeItem bike={item} key={item.id} />;
      })}
    </div>
  );
};

export default BikesView;
