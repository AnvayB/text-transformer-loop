import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function MainTab() {
  const [requirements, setRequirements] = useState("");

  const handleSubmit = () => {
    console.log("Requirements submitted:", requirements);
    // Here you would typically send the requirements to your backend
  };

  return (
    <div className="space-y-4">
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
  );
}