import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Plus, Play, User, LogOut } from "lucide-react";
import gsap from "gsap";

const motivationalQuotes = [
  "Vaa Kishor! Innum konjam code pannu da 😎",
  "Today's roast will be mild unless you mess up 🤭",
  "Semma mood da! Ipo test ezhudhalam 🔥",
  "Code pannadhuku ready ah? Let's go da 💪",
  "Innum oru test da, nee champion aagalaam 🏆",
  "Bug fix pannitu vaa first 😂",
  "Coffee kudichitiya? Seri va code panalam ☕"
];

const mockTests = [
  {
    id: 1,
    name: "Array Basics Challenge",
    description: "Master array operations - sorting, searching, manipulation",
    duration: "30 mins",
    difficulty: "Easy",
    attempts: 2,
    passed: false
  },
  {
    id: 2,
    name: "String Manipulation Pro",
    description: "Advanced string algorithms and pattern matching",
    duration: "45 mins",
    difficulty: "Medium",
    attempts: 0,
    passed: false
  },
  {
    id: 3,
    name: "Recursion Master",
    description: "Think recursive, code recursive - solve complex problems",
    duration: "60 mins",
    difficulty: "Hard",
    attempts: 1,
    passed: false
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [userRole] = useState<"admin" | "attendee">("attendee"); // Mock role
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
      });
    }
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-success";
      case "Medium": return "text-primary";
      case "Hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CodeBuddy
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/profile")}
            >
              <User className="w-5 h-5 mr-2" />
              Profile
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold">
            {quote}
          </h2>
          <p className="text-muted-foreground text-lg">
            {userRole === "admin" ? "Manage your tests and track student progress" : "Choose a test and start coding!"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {userRole === "admin" ? (
            <Button 
              size="lg"
              className="shadow-card hover:shadow-hover hover:scale-105 transition-all"
              onClick={() => navigate("/create-test")}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Test
            </Button>
          ) : null}
          
          <Button 
            size="lg"
            variant={userRole === "admin" ? "outline" : "default"}
            className="shadow-card hover:shadow-hover hover:scale-105 transition-all"
            onClick={() => {
              const role = userRole === "admin" ? "attendee" : "admin";
              alert(`Switching to ${role} view (Mock)`);
            }}
          >
            Switch to {userRole === "admin" ? "Attendee" : "Admin"} View
          </Button>
        </div>

        {/* Tests Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <Card 
              key={test.id}
              className="p-6 space-y-4 shadow-card hover:shadow-hover transition-all hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/compiler/${test.id}`)}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold">{test.name}</h3>
                <span className={`text-sm font-medium ${getDifficultyColor(test.difficulty)}`}>
                  {test.difficulty}
                </span>
              </div>

              <p className="text-muted-foreground text-sm">
                {test.description}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">⏱️ {test.duration}</span>
                <span className="text-muted-foreground">
                  {test.attempts > 0 ? `${test.attempts} attempts` : "Not attempted"}
                </span>
              </div>

              <Button className="w-full" variant={test.attempts > 0 ? "outline" : "default"}>
                <Play className="w-4 h-4 mr-2" />
                {test.attempts > 0 ? "Try Again" : "Start Test"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Admin Stats Section */}
        {userRole === "admin" && (
          <div className="pt-8">
            <h3 className="text-2xl font-bold mb-4">Test Results Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center shadow-card">
                <div className="text-4xl font-bold text-primary">12</div>
                <p className="text-muted-foreground mt-2">Total Students</p>
              </Card>
              <Card className="p-6 text-center shadow-card">
                <div className="text-4xl font-bold text-success">8</div>
                <p className="text-muted-foreground mt-2">Tests Passed</p>
              </Card>
              <Card className="p-6 text-center shadow-card">
                <div className="text-4xl font-bold text-destructive">4</div>
                <p className="text-muted-foreground mt-2">Needs Improvement</p>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
