import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setUserInfoState } from "../../store/auth";

const UserView = () => {
  const { user, userInfo } = useSelector(selectAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/userinfo/${user.id}`);
      dispatch(
        setUserInfoState({
          image_url: data.image_url,
          zip_code: data.zipcode,
          street: data.street,
          state: data.state?.split("||")[0],
          country: data.state?.split("||")[1],
        })
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .put(`/userinfo/${user.id}`, {
        zipcode: userInfo.zip_code,
        street: userInfo.street,
        state:
          userInfo.state &&
          userInfo.country &&
          userInfo.state + "||" + userInfo.country,
      })
      .then((res) => toast.success('Data Changed!'))
      .catch((err) =>
        toast.error(
          Object.keys(err.response.data)[0] +
            " : " +
            Object.values(err.response.data)[0]
        )
      );
  };
  const hiddenFileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [loader, setLoader] = useState<Boolean>(false);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = async (event: any) => {
    setLoader(true);
    const fileUploaded = event.target.files[0];
    await axios
      .put(
        `/userinfo/${user.id}`,
        {
          image_url: fileUploaded,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        dispatch(
          setUserInfoState({
            image_url: '/media/user_image/' + fileUploaded.name,
          })
        )
        setLoader(false);
        toast.success('Image Changed');
      })
      .catch((err) => {
        setLoader(false);
        toast.error(
          Object.keys(err.response.data)[0] +
            " : " +
            Object.values(err.response.data)[0]
        );
      });
  };
  return (
    <div>
      <div className="grid items-center justify-start gap-3 laptop:gap-10 laptop:flex">
        <button
          className="relative flex items-center justify-center w-20 h-20 overflow-hidden text-black duration-300 border rounded-full laptop:w-40 laptop:h-40 bg-greybackground border-greymedium hover:bg-greymedium hover:text-white"
          onClick={handleClick}
        >
          <input
            accept="image/png, image/jpeg"
            type={"file"}
            ref={hiddenFileInput}
            onChange={handleChange}
            className="hidden"
          />
          {userInfo.image_url ? (
            <Image
              src={"http://localhost:8000" + userInfo.image_url}
              alt={user.first_name}
              layout="fill"
              className="object-cover w-full h-full"
            />
          ) : (
            <FaUser className="w-10 h-10 laptop:w-20 laptop:h-20" />
          )}
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
      <form className="mt-5 laptop:mt-20" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="text-2xl">Current address:</h2>
        <input
          type="text"
          className="w-full h-10 p-3 mt-3 border rounded border-greymedium"
          placeholder="Street"
          value={userInfo.street}
          required
          onChange={(e) =>
            dispatch(
              setUserInfoState({
                image_url: userInfo.image_url,
                zip_code: userInfo.zip_code,
                state: userInfo.state,
                country: userInfo.country,
                street: e.target.value,
              })
            )
          }
        />
        <div className="flex gap-5 ">
          <input
            type="number"
            className="w-full h-10 p-3 mt-3 border rounded border-greymedium"
            placeholder="Zip Code"
            value={userInfo.zip_code ?? ""}
            required
            onChange={(e) =>
              dispatch(
                setUserInfoState({
                  zip_code: e.target.value,
                  image_url: userInfo.image_url,
                  street: userInfo.street,
                  state: userInfo.state,
                  country: userInfo.country,
                })
              )
            }
          />
          <input
            type="text"
            className="w-full h-10 p-3 mt-3 border rounded border-greymedium"
            placeholder="State"
            value={userInfo.state}
            required
            onChange={(e) =>
              dispatch(
                setUserInfoState({
                  zip_code: userInfo.zip_code,
                  image_url: userInfo.image_url,
                  street: userInfo.street,
                  state: e.target.value,
                  country: userInfo.country,
                })
              )
            }
          />
          <input
            type="text"
            className="w-full h-10 p-3 mt-3 border rounded border-greymedium"
            placeholder="Country"
            required
            value={userInfo.country}
            onChange={(e) =>
              dispatch(
                setUserInfoState({
                  zip_code: userInfo.zip_code,
                  image_url: userInfo.image_url,
                  street: userInfo.street,
                  state: userInfo.state,
                  country: e.target.value,
                })
              )
            }
          />
        </div>
        <div className="flex justify-end mt-5">
          <button
            className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-primary hover:bg-secondary"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserView;
