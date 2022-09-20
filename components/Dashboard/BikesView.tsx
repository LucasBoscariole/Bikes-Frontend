import React from "react";
import { useSelector } from "react-redux";
import { selectBikeState } from "../../store/bikes";

const BikesView = () => {
  const { bikesByUser } = useSelector(selectBikeState);
  return (
    <div>
      {bikesByUser?.length === 0 ? (
        <h1>
          You currently don&apos;t have any bicycle listed, try adding on.
        </h1>
      ) : (
        <>
          {bikesByUser?.map((item) => {
            return <h1 key={item.id}>{item.name}</h1>
          })}
        </>
      )}
    </div>
  );
};

export default BikesView;
