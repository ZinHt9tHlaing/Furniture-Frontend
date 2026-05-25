import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full animate-pulse items-center justify-center gap-2 text-center text-xl font-semibold">
      <Loader2 className="size-8 animate-spin" /> Loading...
    </div>
  );
}
