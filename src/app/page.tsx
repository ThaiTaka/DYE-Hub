"use client";

import { useState } from "react";
import { InputForm } from "@/components/ui/input-form";
import { ResultDisplay } from "@/components/ui/result-display";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);

  function handleGenerate() {
    setIsGenerating(true);
    window.setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <InputForm onGenerate={handleGenerate} isGenerating={isGenerating} />
      <ResultDisplay />
    </div>
  );
}
