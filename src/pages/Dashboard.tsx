import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Plus, Play, User, LogOut, Clock, CheckCircle2 } from "lucide-react";
import gsap from "gsap";

const mockTests = [
  {
    id: 1,
    name: "Array Fundamentals",
    description: "Master array operations, sorting, and searching algorithms",
    duration: "45 mins",
    questionsCount: 5,
    difficulty: "Easy",
    attempts: 2,
    passed: false
  },
  {
    id: 2,
    name: "String Algorithms",
    description: "Advanced string manipulation and pattern matching techniques",
    duration: "60 mins",
    questionsCount: 8,
    difficulty: "Medium",
    attempts: 0,
    passed: false
  },
  {
    id: 3,
    name: "Recursion Mastery",
    description: "Solve complex problems using recursive approaches",
    duration: "90 mins",
    questionsCount: 10,
    difficulty: "Hard",
    attempts: 1,
    passed: false
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole] = useState<"admin" | "attendee">("attendee");
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
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
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">If(Error) Roast();</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/profile")}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">
            Welcome back, Kishor
          </h2>
          <p className="text-muted-foreground text-lg">
            {userRole === "admin" ? "Manage tests and track progress" : "Choose a test and start coding"}
          </p>
        </div>

        {/* Admin Actions */}
        {userRole === "admin" && (
          <div className="flex gap-4">
            <Button 
              size="lg"
              onClick={() => navigate("/create-test")}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Test
            </Button>
          </div>
        )}

        {/* Tests Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <Card 
              key={test.id}
              className="p-6 space-y-4 hover:shadow-md transition-all cursor-pointer border border-border"
              onClick={() => navigate(`/compiler/${test.id}`)}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold pr-4">{test.name}</h3>
                <span className={`text-sm font-medium ${getDifficultyColor(test.difficulty)}`}>
                  {test.difficulty}
                </span>
              </div>

              <p className="text-muted-foreground text-sm">
                {test.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{test.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{test.questionsCount} questions</span>
                </div>
              </div>

              <div className="pt-2">
                {test.attempts > 0 ? (
                  <p className="text-sm text-muted-foreground mb-2">
                    {test.attempts} attempt{test.attempts > 1 ? "s" : ""}
                  </p>
                ) : null}
                <Button className="w-full" variant={test.attempts > 0 ? "outline" : "default"}>
                  <Play className="w-4 h-4 mr-2" />
                  {test.attempts > 0 ? "Try Again" : "Start Test"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Admin Stats */}
        {userRole === "admin" && (
          <div className="pt-8">
            <h3 className="text-2xl font-bold mb-6">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center border border-border">
                <div className="text-4xl font-bold text-primary mb-2">12</div>
                <p className="text-muted-foreground">Total Students</p>
              </Card>
              <Card className="p-6 text-center border border-border">
                <div className="text-4xl font-bold text-success mb-2">8</div>
                <p className="text-muted-foreground">Tests Passed</p>
              </Card>
              <Card className="p-6 text-center border border-border">
                <div className="text-4xl font-bold text-destructive mb-2">4</div>
                <p className="text-muted-foreground">Needs Improvement</p>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
