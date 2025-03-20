"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";
import { login } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const req = {
      name: formData.get("name")!.toString(),
      email: formData.get("email")!.toString(),
    };

    const res = await login(req);

    if (!res.ok) {
      alert("Something went wrong!");
    } else {
      router.push("/search");
    }
  };

  return (
    <>
      <form action={handleSubmit} className="p-12 border border-border rounded">
        <div className="flex flex-col gap-6">
          <Image
            className="m-auto"
            src="/fetch-logo.svg"
            alt="Fetch Logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="font-bold text-2xl text-center">
            Welcome to FurEver Finder!
          </h1>
          <h2 className="text-muted-foreground text-center">
            Please sign in to find your perfect dog!
          </h2>
          <div className="grid gap-2">
            <label>Name</label>
            <Input name="name" placeholder="John Doe" required></Input>
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="jdoe@email.com"
              required
            ></Input>
          </div>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </>
  );
}
