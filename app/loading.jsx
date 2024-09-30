"use client";
import React from "react";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  let [color, setColor] = useState("#0b2540");
  return (
    <div className="h-[100dvh] w-[99dvw] bg-lightGreen flex flex-col gap-3 items-center justify-center">
      <ClipLoader
        color={color}
        // loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="text-2xl">Loading...</p>
    </div>
  );
};

export default Loading;
