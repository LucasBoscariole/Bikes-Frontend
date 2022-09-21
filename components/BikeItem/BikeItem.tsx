/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { BikeFormat } from "../../store/bikes";

interface DataType {
  bike: BikeFormat;
}

const BikeItem = ({ bike }: DataType) => {
  const { id, name, owner_id, price, description, image_url, is_rented } = bike;
  return (
    <Link href={"/bikes/" + id} passHref>
      <a className="gap-10 p-4 rounded bg-[#e6e5e5]">
        <img
          src={"http://localhost:8000" + image_url}
          alt={name}
          className="object-cover w-full h-60"
        />
        <h2 className="mt-3 text-xl font-bold">{name}</h2>
        <p className="mt-2 text-base text-greymedium">
          {description.slice(0, 150)}
          {description.length > 150 ?? "..."}
        </p>
        <h4
          className={clsx(
            "text-base font-bold mt-2 mb-1",
            is_rented ? "text-[red]" : "text-[green]"
          )}
        >
          {is_rented ? "Not Available." : "Available"}
        </h4>
        <div className="flex items-center gap-2">
          <h3 className="text-[green] font-bold text-lg ">Price:</h3>
          <h3 className="text-lg font-bold">{price} USD</h3>
        </div>
      </a>
    </Link>
  );
};

export default BikeItem;
