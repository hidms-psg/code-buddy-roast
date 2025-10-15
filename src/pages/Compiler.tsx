import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code2, Play, Send, ArrowLeft, Clock } from "lucide-react";
import Editor from "@monaco-editor/react";
import gsap from "gsap";
import { toast } from "sonner";

const roastMessages = [
  "Error da! Konjam yosichu podu da 😅",
  "Code fail aagiduchu da! Black coffee kudichu vaa da 😭",
  "Syntax error ah? Basic ah kuda theriyala? 🤦",
  "Runtime error da! Test case-a paathuttu code pannu 😤",
  "Enna da idhu? Logic ey illa! 🤔",
  "Semicolon miss panna? Aiyo kadavule 😂"
];

const successMessages = [
  "Nee jeichita maaraa 💥",
  "Semma da Kishor! Code vera level 🔥",
  "Mass da mass! All test cases passed 🎯",
  "Champion da nee! Next Sundar Pichai confirmed 😎",
  "Perfect execution da! Thalaivar level 🌟"
];

const pythonTemplate = `def solution():
    # Write your code here
    pass

# Don't modify below this line
if __name__ == "__main__":
    result = solution()
    print(result)`;

const javaTemplate = `public class Solution {
    public static void solution() {
        // Write your code here
    }
    
    // Don't modify below this line
    public static void main(String[] args) {
        solution();
    }
}`;

const Compiler = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(pythonTemplate);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Time's up da! Test auto-submit aagiduchu 😅");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(value === "python" ? pythonTemplate : javaTemplate);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Running test cases...\n");

    // Mock compilation - will integrate Judge0 later
    setTimeout(() => {
      const passed = Math.random() > 0.3;
      
      if (passed) {
        const successMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
        setOutput(`✅ All test cases passed!\n\n${successMsg}\n\nTest Case 1: ✅ Passed\nTest Case 2: ✅ Passed\nTest Case 3: ✅ Passed`);
        
        if (resultRef.current) {
          gsap.from(resultRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        }
        
        toast.success(successMsg);
      } else {
        const roastMsg = roastMessages[Math.floor(Math.random() * roastMessages.length)];
        setOutput(`❌ Some test cases failed\n\n${roastMsg}\n\nTest Case 1: ✅ Passed\nTest Case 2: ❌ Failed\nExpected: [1,2,3]\nGot: [1,2]\n\nTest Case 3: ❌ Failed`);
        toast.error(roastMsg);
      }
      
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    toast.success("Test submitted da! Results pathukalam 📊");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Array Basics Challenge</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-5 h-5 text-destructive" />
              <span className={timeLeft < 300 ? "text-destructive animate-pulse" : ""}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <Card className="p-6 space-y-4 shadow-card overflow-auto max-h-[calc(100vh-200px)]">
          <h2 className="text-2xl font-bold">Problem Statement</h2>
          <p className="text-muted-foreground">
            Write a function that takes an array of integers and returns them sorted in ascending order.
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Example 1:</h3>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div>Input: [3, 1, 4, 1, 5, 9, 2]</div>
              <div>Output: [1, 1, 2, 3, 4, 5, 9]</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Example 2:</h3>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <div>Input: [5, 2, 8, 1]</div>
              <div>Output: [1, 2, 5, 8]</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Constraints:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Array length will be between 1 and 1000</li>
              <li>Elements will be between -10000 and 10000</li>
              <li>Time limit: 2 seconds</li>
            </ul>
          </div>

          <div className="bg-accent p-4 rounded-lg">
            <p className="text-sm font-medium">
              💡 Hint: Konjam think pannu da! Sorting algorithm theriyuma? 🤔
            </p>
          </div>
        </Card>

        {/* Code Editor + Output */}
        <div className="space-y-4">
          <Card className="p-4 shadow-card">
            <Editor
              height="400px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                contextmenu: false, // Disable right-click
              }}
            />
          </Card>

          <div className="flex gap-4">
            <Button 
              className="flex-1 shadow-card hover:shadow-hover"
              onClick={handleRunCode}
              disabled={isRunning}
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Running..." : "Run Test"}
            </Button>
            <Button 
              className="flex-1 shadow-card hover:shadow-hover"
              variant="secondary"
              onClick={handleSubmit}
              disabled={isRunning}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Test
            </Button>
          </div>

          {output && (
            <Card ref={resultRef} className="p-4 shadow-card">
              <h3 className="font-semibold mb-2">Output:</h3>
              <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-4 rounded-lg">
                {output}
              </pre>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Compiler;
