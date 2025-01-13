import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [initialText, setInitialText] = useState("");
  const [transformCommand, setTransformCommand] = useState("");
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [finalText, setFinalText] = useState("");

  const handleFirstSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialText.trim()) {
      setShowSecondInput(true);
    }
  };

  const handleSecondSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transformCommand.trim()) {
      // Reverse the text and apply the transformation (in this case, uppercase if specified)
      const reversedText = initialText.split("").reverse().join("");
      const transformedText = transformCommand.toLowerCase().includes("capitalize") 
        ? reversedText.toUpperCase() 
        : reversedText;
      setFinalText(transformedText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-indigo-900 mb-8 text-center">
          Human-in-the-Loop ML Mockup
        </h1>

        <Card className="p-6">
          <form onSubmit={handleFirstSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="initialText" className="text-sm font-medium text-gray-700">
                Enter your text
              </label>
              <Input
                id="initialText"
                value={initialText}
                onChange={(e) => setInitialText(e.target.value)}
                placeholder="Type something..."
                className="w-full"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={!initialText.trim()}
            >
              Submit
            </Button>
          </form>
        </Card>

        <AnimatePresence>
          {showSecondInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <form onSubmit={handleSecondSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="transformCommand" className="text-sm font-medium text-gray-700">
                      Enter transformation command
                    </label>
                    <Input
                      id="transformCommand"
                      value={transformCommand}
                      onChange={(e) => setTransformCommand(e.target.value)}
                      placeholder="e.g., Capitalize all the letters"
                      className="w-full"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    disabled={!transformCommand.trim()}
                  >
                    Transform
                  </Button>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {finalText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Transformed Text
                </h2>
                <p className="text-gray-700 break-words">
                  {finalText}
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;