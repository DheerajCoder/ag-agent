import InterViewCard from "@/components/InterViewCard";
import { Button } from "@/components/ui/button";
import { dummyInterView } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback.
          </p>
          <Button
            asChild
            className="btn-primary flex items-center max-sm:w-full"
          >
            <Link href="/interview">start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {/* <p>You haven&apos;t taken any interviews yet</p> */}
          {dummyInterView.map((interview) => (
            <InterViewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {/* <p>There are no interviews available</p> */}

          {dummyInterView.map((interview) => (
            <InterViewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
