import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TestCase {
  input: string;
  output: string;
}

const CreateTest = () => {
  const navigate = useNavigate();
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("30");
  const [functionName, setFunctionName] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "", output: "" }
  ]);

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const removeTestCase = (index: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter((_, i) => i !== index));
    }
  };

  const updateTestCase = (index: number, field: "input" | "output", value: string) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const handleSubmit = () => {
    if (!testName || !description || !functionName) {
      toast.error("Ellam fill pannu da! All fields required 😅");
      return;
    }

    const emptyTestCase = testCases.some(tc => !tc.input || !tc.output);
    if (emptyTestCase) {
      toast.error("Test cases la ellam fill pannu da! 🤔");
      return;
    }

    toast.success("Test created successfully da! Mass 🔥");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Create New Test
          </h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-8 shadow-card space-y-6">
          {/* Test Name */}
          <div className="space-y-2">
            <Label htmlFor="testName">Test Name *</Label>
            <Input 
              id="testName"
              placeholder="e.g., Array Sorting Challenge"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea 
              id="description"
              placeholder="Describe what the test is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Duration & Function Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Input 
                id="duration"
                type="number"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="functionName">Function Name *</Label>
              <Input 
                id="functionName"
                placeholder="e.g., solution"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
              />
            </div>
          </div>

          {/* Test Cases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Test Cases *</Label>
              <Button 
                size="sm" 
                variant="outline"
                onClick={addTestCase}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Test Case
              </Button>
            </div>

            {testCases.map((testCase, index) => (
              <Card key={index} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Test Case {index + 1}</h4>
                  {testCases.length > 1 && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => removeTestCase(index)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Input</Label>
                  <Textarea 
                    placeholder="e.g., [3, 1, 4, 1, 5]"
                    value={testCase.input}
                    onChange={(e) => updateTestCase(index, "input", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expected Output</Label>
                  <Textarea 
                    placeholder="e.g., [1, 1, 3, 4, 5]"
                    value={testCase.output}
                    onChange={(e) => updateTestCase(index, "output", e.target.value)}
                    rows={2}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button 
              className="flex-1 shadow-card hover:shadow-hover"
              onClick={handleSubmit}
            >
              Create Test 🚀
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default CreateTest;
