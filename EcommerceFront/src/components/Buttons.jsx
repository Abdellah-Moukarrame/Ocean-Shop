import React from "react";

export default function Buttons({ type, text }) {
  return (
    <>
      <button type={type}>{text}</button>
    </>
  );
}
