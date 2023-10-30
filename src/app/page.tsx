import CheckAuth from "@/components/check-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>dasdsa</h1>
      <CheckAuth />
      <UserButton afterSignOutUrl="/" />
      <Switch id="airplane-mode" />
      <Button>Click me!</Button>
    </main>
  );
}
