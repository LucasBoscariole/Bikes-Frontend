import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../store/auth";
import Link from "next/link";
import UserView from "./UserView";
import BikesView from "./BikesView";
import axios from "axios";
import { setUserBikes } from "../../store/bikes";

const Dashboard = () => {
  const { user, authenticated } = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const [userView, setUserView] = useState(true);
  useEffect(() => {
    if (user.id) {
      (async () => {
        await axios
          .get(`http://localhost:8000/api/bikes/owner-id/${user.id}`)
          .then((res) => dispatch(setUserBikes(res.data)));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>DashBoard | Bikes Rental | Lucas Boscariole Silva</title>
      </Head>
      <section className="flex flex-wrap w-11/12 h-full gap-20 mx-auto my-20 laptop:w-4/6">
        {!authenticated ? (
          <h1>
            Please,{" "}
            <Link href="/login" passHref>
              <a className="text-primary">login</a>
            </Link>{" "}
            first
          </h1>
        ) : (
          <>
            <div className="w-full rounded bg-greymedium laptop:w-1/5 h-fit">
              <button
                className="w-full py-3 text-white duration-300 border bg-greymedium hover:bg-greybackground hover:text-black border-greymedium"
                onClick={() => setUserView(true)}
              >
                User Info
              </button>
              <button
                className="w-full py-3 text-white duration-300 border bg-greymedium hover:bg-greybackground hover:text-black border-greymedium"
                onClick={() => setUserView(false)}
              >
                Bikes
              </button>
            </div>
            {userView ? <UserView /> : <BikesView />}
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
