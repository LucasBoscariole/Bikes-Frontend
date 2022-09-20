import type { NextPage } from "next";
import { BikeFormat } from "../store/bikes";

interface DataInterface {
  bikes: BikeFormat[]
}

const Home = ({ bikes }: DataInterface) => {
  return (
    <div>
      {bikes.map((item: BikeFormat) => {
        return (
          <>
            <h1>{item.name}</h1>
          </>
        );
      })}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8000/api/bikes`);
  const bikes = await res.json();

  // Pass data to the page via props
  return { props: { bikes } };
}
