import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, Trophy, Target, Clock } from "lucide-react";

const mockProfile = {
  name: "Kishor",
  email: "kishor@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kishor",
  testsAttempted: 5,
  testsPassed: 3,
  testsFailed: 2,
  totalTime: "3h 45m",
  recentTests: [
    { name: "Array Basics Challenge", status: "passed", score: 100, date: "2 days ago" },
    { name: "String Manipulation Pro", status: "failed", score: 60, date: "3 days ago" },
    { name: "Recursion Master", status: "passed", score: 85, date: "5 days ago" },
  ]
};

const Profile = () => {
  const navigate = useNavigate();

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
            My Profile
          </h1>
          <div className="w-24" /> {/* Spacer for center alignment */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Profile Card */}
        <Card className="p-8 shadow-card">
          <div className="flex items-center gap-6">
            <img 
              src={mockProfile.avatar} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-primary"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{mockProfile.name}</h2>
              <p className="text-muted-foreground text-lg">{mockProfile.email}</p>
              <p className="text-primary font-medium mt-2">
                "Semma coder da! Keep going 🔥"
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6 text-center shadow-card hover:shadow-hover transition-shadow">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold">{mockProfile.testsAttempted}</div>
            <p className="text-sm text-muted-foreground mt-1">Tests Attempted</p>
          </Card>

          <Card className="p-6 text-center shadow-card hover:shadow-hover transition-shadow">
            <Trophy className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-3xl font-bold text-success">{mockProfile.testsPassed}</div>
            <p className="text-sm text-muted-foreground mt-1">Tests Passed</p>
          </Card>

          <Card className="p-6 text-center shadow-card hover:shadow-hover transition-shadow">
            <User className="w-8 h-8 text-destructive mx-auto mb-2" />
            <div className="text-3xl font-bold text-destructive">{mockProfile.testsFailed}</div>
            <p className="text-sm text-muted-foreground mt-1">Tests Failed</p>
          </Card>

          <Card className="p-6 text-center shadow-card hover:shadow-hover transition-shadow">
            <Clock className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-3xl font-bold">{mockProfile.totalTime}</div>
            <p className="text-sm text-muted-foreground mt-1">Total Time</p>
          </Card>
        </div>

        {/* Recent Tests */}
        <Card className="p-6 shadow-card">
          <h3 className="text-2xl font-bold mb-4">Recent Test History</h3>
          <div className="space-y-4">
            {mockProfile.recentTests.map((test, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{test.name}</h4>
                  <p className="text-sm text-muted-foreground">{test.date}</p>
                </div>
                
                <div className="text-center px-4">
                  <div className={`text-2xl font-bold ${
                    test.status === "passed" ? "text-success" : "text-destructive"
                  }`}>
                    {test.score}%
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-full font-medium ${
                  test.status === "passed" 
                    ? "bg-success/20 text-success" 
                    : "bg-destructive/20 text-destructive"
                }`}>
                  {test.status === "passed" ? "✅ Passed" : "❌ Failed"}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Motivational Section */}
        <Card className="p-8 text-center shadow-card bg-gradient-primary">
          <h3 className="text-2xl font-bold text-white mb-4">
            Keep it up da! 💪
          </h3>
          <p className="text-white/90 text-lg">
            "Oru test fail aacha? Tension aagaadha da, next time jeichiralam! 🚀"
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
