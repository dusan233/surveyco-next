import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function NotFound() {
  const authState = auth();

  return (
    <div className="p-4 flex justify-center items-center flex-col sm:p-10 text-center bg-white sm:bg-accent min-h-screen">
      <div className="text-4xl text-primary mb-5">404.</div>
      <div className="bg-white border p-3 sm:p-10">
        <h2 className="text-2xl mb-2">{`We can't find the page you're looking for.`}</h2>
        <p>{`Please check the URL you entered to make sure it's spelled correctly.`}</p>
        <div className="flex mt-6 items-center justify-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/">Home</Link>
          </Button>

          {authState.userId && (
            <Button variant="outline" asChild>
              <Link href="/library">My Surveys</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
