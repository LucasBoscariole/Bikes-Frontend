import React from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/auth";

const UserView = () => {
  const { user } = useSelector(selectAuthState);

  return (
    <div>
      <div className="grid items-center justify-start gap-3 laptop:gap-10 laptop:flex">
        <button className="flex items-center justify-center w-20 h-20 text-black duration-300 border rounded-full laptop:w-40 laptop:h-40 bg-greybackground border-greymedium hover:bg-greymedium hover:text-white">
          <FaUser className="w-10 h-10 laptop:w-20 laptop:h-20" />
        </button>
        <div>
          <h1 className="text-xl laptop:text-4xl">
            <b>Name:</b> {user.first_name + " " + user.last_name}
          </h1>
          <h1 className="mt-5 text-xl laptop:text-4xl">
            <b>Email:</b> {user.email}
          </h1>
        </div>
      </div>
      <div className="mt-5 laptop:mt-20">
        <h2 className="text-2xl">Current address:</h2>
        <input
          type="text"
          className="w-full h-10 p-3 mt-3 border rounded border-greymedium"
          placeholder="Street"
        />
        <div className="flex gap-5 ">
          <input
            type="number"
            className="w-full h-10 p-3 mt-3 border rounded border-greymedium"
            placeholder="Zip Code"
          />
          <input
            type="text"
            className="w-full h-10 p-3 mt-3 border rounded border-greymedium"
            placeholder="State"
          />
          <input
            type="text"
            className="w-full h-10 p-3 mt-3 border rounded border-greymedium"
            placeholder="Country"
          />
        </div>
        <div className="flex justify-end mt-5">
          <button className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-primary hover:bg-secondary">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserView;
