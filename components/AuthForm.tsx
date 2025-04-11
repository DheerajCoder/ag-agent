"use client"; // Ensure it's a Client Component

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signup } from "@/lib/actions/auth.actions";

// ✅ Define form validation schema

const authFormschema = (type: FormType) => {
  return z.object({
    name: type == "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

export default function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const formSchema = authFormschema(type);
  const signin = type === "sign-in";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // ✅ Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type == "sign-in") {
        const { email, password } = values;
        const userCredientail = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredientail.user.getIdToken();
        if (!idToken) {
          toast.error("Sigin in failed");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Sign in SuccessFull");
        router.push("/");
      } else {
        const { name, email, password } = values;
        const userCredientail = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signup({
          uid: userCredientail?.user?.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        } else {
          toast.success("Sign up successFull");
          router.push("/sign-in");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to login");
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10 ">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3 className="text-center">Pratice job interview With AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4 form"
          >
            {!signin && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            />
            <Button className="btn" type="submit">
              {signin ? "login" : "Create an Account"}
            </Button>
          </form>
          <p className="text-center">
            {signin ? "No Account yet?" : "Have an Account already?"}
            <Link
              href={signin ? "/sign-up" : "sign-in"}
              className="font-bold ml-1"
            >
              {signin ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
