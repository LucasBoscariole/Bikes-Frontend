import React from "react";
import SingleBike from "../../components/SingleBike/SingleBike";
import { BikeFormat } from "../../store/bikes";

interface Bikes {
  bike: BikeFormat;
}

const id = ({ bike }: Bikes) => {
  return <SingleBike bike={bike} />;
};

export default id;

export async function getServerSideProps({ query }: any) {
  // Fetch data from external API

  const res = await fetch(`http://localhost:8000/api/bikes/${query.id}`);
  const bike = await res.json();

  // Pass data to the page via props
  return { props: { bike } };
}
