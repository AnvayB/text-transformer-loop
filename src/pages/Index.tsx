import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainTab } from "@/components/MainTab";
import { DocumentTab } from "@/components/DocumentTab";
import { DeploymentTab } from "@/components/DeploymentTab";
import { QuestionsSidebar } from "@/components/QuestionsSidebar";
import { UserProjectControls } from "@/components/UserProjectControls";

export default function Index() {
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

  const handleSecondSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (transformCommand.trim()) {
      const reversedText = initialText.split("").reverse().join("");
      setFinalText(reversedText.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 p-4">
        <UserProjectControls />
        
        <div className="mt-6">
          <Tabs defaultValue="main" className="w-full">
            <TabsList>
              <TabsTrigger value="main">Main</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="functional">Functional Spec</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>

            <TabsContent value="main" className="space-y-6">
              <MainTab />
              
              <Card className="p-6">
                <form onSubmit={handleFirstSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="initialText" className="text-sm font-medium text-gray-700">
                      Enter your text to be Reversed
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
                            Enter 2nd transformation command
                          </label>
                          <Input
                            id="transformCommand"
                            value={transformCommand}
                            onChange={(e) => setTransformCommand(e.target.value)}
                            placeholder="e.g., Capitalize all vowels only"
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
                      <p className="text-gray-700 break-words">{finalText}</p>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="requirements">
              <DocumentTab type="requirements" />
            </TabsContent>

            <TabsContent value="functional">
              <DocumentTab type="functional" />
            </TabsContent>

            <TabsContent value="deployment">
              <DeploymentTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <QuestionsSidebar />
    </div>
  );
}