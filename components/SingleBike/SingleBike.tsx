import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAuthState } from "../../store/auth";
import { BikeFormat } from "../../store/bikes";

interface Bikes {
  bike: BikeFormat;
}

const SingleBike = ({ bike }: Bikes) => {
  const { user, authenticated } = useSelector(selectAuthState);
  const [info, setInfo] = useState<BikeFormat>(bike);
  const owner = bike.owner_id === user.id;

  const handleChange = (e: any, name: string) => {
    setInfo({ ...info, [name]: e.target.value });
  };
  const handleChangeCheckbox = (e: any) => {
    if (owner) setInfo({ ...info, is_rented: e.target.checked });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `/bikes/${bike.id}`,
          {
            id: bike.id,
            description: info.description,
            is_rented: info.is_rented,
            name: info.name,
            owner_id: bike.owner_id,
            price: info.price,
          },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then(() => toast.success("Changed!"));
    } catch (error) {
      console.log(error);
      toast.error("An Error Happen Getting Oner DAta.");
    }
  };
  const router = useRouter()
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      await axios.delete(`/bikes/${bike.id}`).then(() => {
        toast.success("Deleted.");
        router.push("/");
      });
    } catch (error) {
      console.log(error);
      toast.error("An Error Happen Getting Oner DAta.");
    }
  };

  return (
    <section className="flex items-start justify-between w-11/12 h-full mx-auto mt-20 laptop:w-4/6">
      <div className="w-full laptop:w-1/2 h-[60vh] relative">
        <Image
          src={"http://localhost:8000" + bike.image_url}
          alt={bike.name}
          layout="fill"
        />
      </div>
      <div className="w-full pl-5 laptop:w-1/2">
        <form className="grid" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center gap-5 my-3">
            <label className="font-bold">Name:</label>
            <input
              type={"text"}
              required
              placeholder="Name"
              value={info.name}
              className={clsx(
                "w-full h-10 p-3 border rounded border-greymedium",
                !owner && "!border-none"
              )}
              disabled={!owner}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div className="flex items-center gap-5 my-3">
            <label className="font-bold">Description:</label>
            <input
              type={"text"}
              required
              placeholder="Description"
              value={info.description}
              className={clsx(
                "w-full h-10 p-3 border rounded border-greymedium",
                !owner && "!border-none"
              )}
              disabled={!owner}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>
          <div className="flex items-center gap-5 my-3">
            <label className="font-bold">Price:</label>
            <input
              type={"number"}
              required
              placeholder="Price"
              value={info.price}
              className={clsx(
                "w-full h-10 p-3 border rounded border-greymedium",
                !owner && "!border-none"
              )}
              disabled={!owner}
              onChange={(e) => handleChange(e, "price")}
            />
          </div>
          <div className="flex gap-5 my-3">
            <label className="font-bold">Is Available:</label>
            <input
              type={"checkbox"}
              required
              checked={info.is_rented}
              onChange={(e) => handleChangeCheckbox(e)}
            />
          </div>
          <div className="flex justify-end w-full gap-5">
            {!authenticated ? (
              <>
                {" "}
                <Link href="/login" passHref>
                  <a className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-primary hover:bg-secondary">
                    login
                  </a>
                </Link>
              </>
            ) : (
              owner && (
                <>
                  <button
                    className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-[red] opacity-70 hover:opacity-100"
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                  <button
                    className="flex items-center justify-center w-40 h-10 text-white capitalize duration-300 rounded-md bg-primary hover:bg-secondary"
                    type="submit"
                  >
                    change
                  </button>
                </>
              )
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default SingleBike;
