"use client";

import { Toaster } from "@/components/ui/sonner";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [queryClient] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error: Error) => {
          if (error.cause instanceof Response) {
            toast.error(`${error.cause.status} ${error.message}`);

            if (error.cause.status == 401) {
              router.push("/");
            }
          } else {
            toast.error(error.message);
          }
        },
      }),
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors duration={5000} closeButton />
    </QueryClientProvider>
  );
}
