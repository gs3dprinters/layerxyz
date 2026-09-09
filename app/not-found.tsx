import React from "react";
import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";
import { Button } from "@/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center text-foreground-muted mb-8">
        <Box className="w-8 h-8" />
      </div>

      <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
        ERROR // 404 MESH NOT FOUND
      </div>

      <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-foreground uppercase max-w-lg mb-6">
        THIS OBJECT DOESN'T EXIST.
      </h1>

      <p className="text-foreground-secondary text-sm sm:text-base max-w-md mb-10 leading-relaxed font-light">
        The coordinates or slug you navigated to have not been materialized in our
        studio directory.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/work" size="lg" icon>
          Back to Work
        </Button>
        <Button href="/" variant="outline" size="lg">
          Return to Studio Home
        </Button>
      </div>
    </div>
  );
}
