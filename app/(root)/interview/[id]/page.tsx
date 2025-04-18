import Agent from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import {
  getCurrentUser,
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/auth.actions";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  const interview = await getInterviewById(id);
  if (!interview) {
    redirect("/");
  }
  return (
    <div>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-2 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4  items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[45px]"
            />
            <h3>{interview.role} interview</h3>
          </div>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>
      <Agent
        userName={user?.name || ""}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </div>
  );
};

export default page;
