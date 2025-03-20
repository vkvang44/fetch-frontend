import LoginForm from "@/components/login-form";

export default async function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <LoginForm />
    </div>
  );
}
