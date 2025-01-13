import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { OpenAI } from "openai";
import { NextApiRequest, NextApiResponse } from "next";



// Initialize OpenAI client with the API key from the environment
const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "<api-key>",
  dangerouslyAllowBrowser: true
});


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

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-2024-08-06",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that processes and transforms text based on user instructions.",
            },
            {
              role: "user",
              content: `Transform the following text based on the instruction:\n\nText: "${reversedText}"\nInstruction: "${transformCommand}"\n\nTransformed Text:`,
            },
          ],
          max_tokens: 100,
          temperature: 0.7,
        });

        const transformedText = response.choices[0].message.content.trim();
        setFinalText(transformedText);
      } catch (error) {
        console.error("Error with OpenAI API:", error);
        setFinalText("An error occurred while processing your transformation.");
      }
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
      </div>
    </div>
  );
};

// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";

// const Index = () => {
//   const [initialText, setInitialText] = useState("");
//   const [transformCommand, setTransformCommand] = useState("");
//   const [showSecondInput, setShowSecondInput] = useState(false);
//   const [finalText, setFinalText] = useState("");

//   const handleFirstSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (initialText.trim()) {
//       setShowSecondInput(true);
//     }
//   };

//   const handleSecondSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (transformCommand.trim()) {
//       try {
//         // Specify the full URL with port 3000 for API calls
//         const response = await fetch("http://localhost:3000/api/openai", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ text: initialText, transformCommand }),
//         });
  
//         if (!response.ok) {
//           throw new Error("Failed to fetch transformed text");
//         }
  
//         const data = await response.json();
//         setFinalText(data.transformedText);
//       } catch (error) {
//         console.error("Error with OpenAI API:", error);
//         setFinalText("An error occurred while processing your transformation.");
//       }
//     }
//   };
  

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 sm:p-6 md:p-8">
//       <div className="max-w-2xl mx-auto space-y-6">
//         <h1 className="text-3xl font-bold text-indigo-900 mb-8 text-center">
//           Human-in-the-Loop ML Mockup
//         </h1>

//         <Card className="p-6">
//           <form onSubmit={handleFirstSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="initialText" className="text-sm font-medium text-gray-700">
//                 Enter your text to be Reversed
//               </label>
//               <Input
//                 id="initialText"
//                 value={initialText}
//                 onChange={(e) => setInitialText(e.target.value)}
//                 placeholder="Type something..."
//                 className="w-full"
//               />
//             </div>
//             <Button
//               type="submit"
//               className="w-full bg-indigo-600 hover:bg-indigo-700"
//               disabled={!initialText.trim()}
//             >
//               Submit
//             </Button>
//           </form>
//         </Card>

//         <AnimatePresence>
//           {showSecondInput && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Card className="p-6">
//                 <form onSubmit={handleSecondSubmit} className="space-y-4">
//                   <div className="space-y-2">
//                     <label htmlFor="transformCommand" className="text-sm font-medium text-gray-700">
//                       Enter 2nd transformation command
//                     </label>
//                     <Input
//                       id="transformCommand"
//                       value={transformCommand}
//                       onChange={(e) => setTransformCommand(e.target.value)}
//                       placeholder="e.g., Capitalize all vowels only"
//                       className="w-full"
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     className="w-full bg-indigo-600 hover:bg-indigo-700"
//                     disabled={!transformCommand.trim()}
//                   >
//                     Transform
//                   </Button>
//                 </form>
//               </Card>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {finalText && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Card className="p-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-3">
//                   Transformed Text
//                 </h2>
//                 <p className="text-gray-700 break-words">{finalText}</p>
//               </Card>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Index;
