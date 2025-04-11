import Agent from "@/components/Agent";
import React from "react";

const page = () => {
  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName="you" userId="userOne" type="genrate" />
    </>
  );
};

export default page;
