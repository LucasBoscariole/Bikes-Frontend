import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Homepage from "../components/Homepage/Homepage";
import { BikeFormat, setAllBikes } from "../store/bikes";

interface DataInterface {
  bikes: BikeFormat[];
}

const Home = ({ bikes }: DataInterface) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAllBikes(bikes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Homepage bikes={bikes} />;
};

export default Home;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8000/api/bikes`);
  const bikes = await res.json();

  // Pass data to the page via props
  return { props: { bikes } };
}
