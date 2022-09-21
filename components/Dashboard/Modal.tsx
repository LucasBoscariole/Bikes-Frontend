import React, { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  BikeFormat,
  selectBikeState,
  setAllBikes,
  setUserBikes,
} from "../../store/bikes";
import { selectAuthState } from "../../store/auth";
import axios from "axios";

interface ReceivedTypes {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
interface MyNewType extends Omit<BikeFormat, "id"> {}

const Modal = ({ openModal, setOpenModal }: ReceivedTypes) => {
  const { user, authenticated } = useSelector(selectAuthState);

  const [info, setInfo] = useState<MyNewType>({
    description: "",
    image_url: "",
    is_rented: true,
    name: "",
    owner_id: user.id || 0,
    price: 0,
  });

  const handleChangeImage = (e: any) => {
    const fileUploaded = e.target.files[0];
    setInfo({ ...info, image_url: fileUploaded });
  };

  const handleChange = (e: any, name: string) => {
    setInfo({ ...info, [name]: e.target.value });
  };
  const handleChangeCheckbox = (e: any) => {
    setInfo({ ...info, is_rented: e.target.checked });
  };

  const handleUser = async () => {
    try {
      await axios
        .get(`/bikes/owner-id/${user.id}`)
        .then((res) => dispatch(setUserBikes(res.data)));
    } catch (error) {
      console.log(error);
      toast.error("An Error Happen Getting Oner DAta.");
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (authenticated) {
        await axios.get(`/bikes`).then((res) => {
          (async () => {
            await axios
              .post(
                "/bikes",
                {
                  id: res.data.slice(res.data.length - 1)[0].id + 1,
                  description: info.description,
                  image_url: info.image_url,
                  is_rented: !info.is_rented,
                  name: info.name,
                  owner_id: info.owner_id === 0 ? user.id : info.owner_id,
                  price: info.price,
                },
                {
                  headers: {
                    "content-type": "multipart/form-data",
                  },
                }
              )
              .then((r) => toast.success("Added Successfully!"))
              .then(() => handleUser())
              .catch((err) => {
                console.log(err);
                toast.error("An error happen!");
              });
          })();
          dispatch(setAllBikes(res.data));
        });
      } else {
        toast.error("Try Loging in again, please!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some Error Happened, try again please.");
    }
    setOpenModal(false);
  };
  return (
    <div
      className={clsx(
        "fixed w-full h-screen top-0 left-0 bg-[#00000095] items-center justify-center",
        openModal ? "flex" : "hidden"
      )}
    >
      <div className="w-11/12 laptop:w-1/2 min-h-[20vh] bg-greybackground rounded-lg p-4">
        <form className="grid" onSubmit={(e) => handleSubmit(e)}>
          <label>Name:</label>
          <input
            type={"text"}
            required
            placeholder="Name"
            value={info.name}
            className="w-full h-10 p-3 mb-3 border rounded border-greymedium"
            onChange={(e) => handleChange(e, "name")}
          />
          <label>Description:</label>
          <input
            type={"text"}
            required
            placeholder="Description"
            value={info.description}
            className="w-full h-10 p-3 mb-3 border rounded border-greymedium"
            onChange={(e) => handleChange(e, "description")}
          />
          <label>Price:</label>
          <input
            type={"number"}
            required
            placeholder="Price"
            value={info.price}
            className="w-full h-10 p-3 border rounded border-greymedium"
            onChange={(e) => handleChange(e, "price")}
          />
          <div className="flex gap-5 my-3">
            <label>Is Available:</label>
            <input
              type={"checkbox"}
              required
              checked={info.is_rented}
              onChange={(e) => handleChangeCheckbox(e)}
            />
          </div>
          <div className="flex gap-5 mt-3">
            <label>Picture:</label>
            <input
              accept="image/png, image/jpeg"
              type={"file"}
              onChange={handleChangeImage}
              required
            />
          </div>
          <div className="flex justify-end gap-5 mt-4">
            <button
              onClick={() => setOpenModal(false)}
              className="flex items-center justify-center w-40 h-10 mt-3 text-white duration-300 border rounded outline-none bg-[red] opacity-60 hover:opacity-100 "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center w-40 h-10 mt-3 text-white duration-300 border rounded outline-none border-primary bg-primary hover:bg-secondary hover:border-secondary"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
