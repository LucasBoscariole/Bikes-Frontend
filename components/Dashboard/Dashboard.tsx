import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../store/auth";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/user");
      if (data) {
        dispatch(
          setAuthState({
            authenticated: true,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            id: data.id,
          })
        );
      } else {
        dispatch(
          setAuthState({
            authenticated: false,
            first_name: "",
            last_name: "",
            email: "",
            id: null
          })
        );
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <div>Dashboard</div>;
};

export default Dashboard;
