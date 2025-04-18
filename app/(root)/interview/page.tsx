import Agent from "@/components/Agent";
import {
  getCurrentUser,
  getInterviewsByUserId,
} from "@/lib/actions/auth.actions";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Generation</h3>
      <Agent
        userName={user?.name!}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate"
      />
    </>
  );
};

export default page;
