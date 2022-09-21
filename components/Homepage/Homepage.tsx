import React from "react";
import { BikeFormat } from "../../store/bikes";
import BikeItem from "../BikeItem/BikeItem";
interface DataInterface {
  bikes: BikeFormat[];
}
const Homepage = ({ bikes }: DataInterface) => {
  return (
    <section className="w-11/12 mx-auto my-20 laptop:w-4/6">
      <h1 className="mb-4 text-3xl font-bold">All Bikes Listed</h1>
      <div className="grid h-full grid-cols-2 gap-5 mx-auto laptop:grid-cols-4">
        {bikes.map((item: BikeFormat) => {
          return <BikeItem bike={item} key={item.id} />;
        })}
      </div>
    </section>
  );
};

export default Homepage;
