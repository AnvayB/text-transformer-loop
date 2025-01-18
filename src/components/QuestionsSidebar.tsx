export function QuestionsSidebar() {
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
          <li
            key={index}
            className="p-2 bg-sidebar-accent rounded-md text-sm text-sidebar-accent-foreground"
          >
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
}