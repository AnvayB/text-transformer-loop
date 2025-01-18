import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { QuestionsSidebar } from "./QuestionsSidebar";

export function MainTab() {
  const [requirements, setRequirements] = useState("");

  const handleSubmit = () => {
    console.log("Requirements submitted:", requirements);
    // Here you would typically send the requirements to your backend
  };

  const handleQuestionClick = (question: string) => {
    setRequirements((prev) => {
      const newRequirements = prev ? `${prev}\n\n${question}` : question;
      return newRequirements;
    });
  };

  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        <Textarea
          placeholder="Enter your requirements here..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="min-h-[200px]"
        />
        <Button onClick={handleSubmit} className="w-full">
          Submit Requirements
        </Button>
      </div>
      <QuestionsSidebar onQuestionClick={handleQuestionClick} />
    </div>
  );
}