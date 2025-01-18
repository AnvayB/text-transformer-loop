interface DocumentTabProps {
  type: "requirements" | "functional";
}

export function DocumentTab({ type }: DocumentTabProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {type === "requirements" ? "Requirements Document" : "Functional Specification"}
      </h2>
      <div className="prose max-w-none">
        <p className="text-gray-600">
          {type === "requirements"
            ? "Loading requirements document..."
            : "Loading functional specification..."}
        </p>
      </div>
    </div>
  );
}