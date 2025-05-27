"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="px-8 py-16 md:px-28 md:py-20 lg:px-52 lg:py-32 ">
      <div className="mt-8 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <p className="text-xl md:text-4xl font-bold">
            Upssssssss, lo sentimos, no se encontro esta pagina,{" "}
            <span
              onClick={() => router.back()}
              className="text-sky-500 hover:underline cursor-pointer"
            >
              volver
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/not-found.png"
            width={500}
            height={500}
            alt="not_found"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
