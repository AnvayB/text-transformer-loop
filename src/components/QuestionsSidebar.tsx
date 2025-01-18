import { Button } from "@/components/ui/button";

interface QuestionsSidebarProps {
  onQuestionClick?: (question: string) => void;
}

export function QuestionsSidebar({ onQuestionClick }: QuestionsSidebarProps) {
  const questions = [
    "What is the target audience?",
    "What are the security requirements?",
    "What is the expected timeline?",
  ];

  return (
    <div className="w-64 bg-sidebar p-4 border-l">
      <h3 className="font-semibold mb-4 text-sidebar-foreground">Open Questions</h3>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li key={index}>
            <Button
              variant="ghost"
              className="w-full justify-start text-left text-sm text-sidebar-accent-foreground hover:bg-sidebar-accent"
              onClick={() => onQuestionClick?.(question)}
            >
              {question}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}