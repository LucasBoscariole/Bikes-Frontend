import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setAuthState } from "../../store/auth";
import { HamburgerStandReverse } from "react-animated-burgers";
import axios from "axios";

const NavBar = () => {
  const { authenticated } = useSelector(selectAuthState);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const toggleButton = useCallback(
    () => setToggleDropdown((prevState) => !prevState),
    []
  );

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

  
  const logout = async () => {
    await axios.post("/logout", {}, { withCredentials: true });
    axios.defaults.headers.common["Authorization"] = "";
    dispatch(setAuthState({
      authenticated: false,
      first_name: "",
      last_name: "",
      email: "",
      id: null
    }));
  };

  return (
    <nav className="w-full h-16 border-b border-greymedium">
      <div className="flex items-center justify-between w-11/12 h-full mx-auto laptop:w-4/6">
        <Link href="/" passHref>
          <a className="text-3xl font-bold leading-none tracking-widest text-primary font-Secondary">
            Bikes
          </a>
        </Link>
        <div className="items-center hidden gap-5 laptop:flex">
          {authenticated ? (
            <>
                <button onClick={logout} className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-secondary hover:bg-thrid">
                  logout
                </button>
              <Link href="/dashboard" passHref>
                <a className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-primary hover:bg-secondary">
                  dashboard
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" passHref>
                <a className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-secondary hover:bg-thrid">
                  register
                </a>
              </Link>
              <Link href="/login" passHref>
                <a className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-primary hover:bg-secondary">
                  login
                </a>
              </Link>
            </>
          )}
        </div>
        <div className="flex laptop:hidden">
          <HamburgerStandReverse
            buttonColor="#FFBC67"
            barColor="white"
            isActive={toggleDropdown}
            toggleButton={toggleButton}
            className="!bg-greymedium !p-2 !pt-2 !pb-1 rounded"
            buttonWidth={25}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
