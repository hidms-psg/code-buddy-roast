import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles } from "lucide-react";
import gsap from "gsap";

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (heroRef.current && titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8" ref={heroRef}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Code2 className="w-12 h-12 text-primary" />
          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          >
            CodeBuddy
          </h1>
          <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
          Your friendly coding companion with a side of Tamil cinema roasts 🎬
        </p>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          "Vaa da! Code pannu, learn pannu, but fail aana roast guaranteed 😎"
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button 
            size="lg"
            className="text-lg px-8 py-6 shadow-hover hover:scale-105 transition-transform"
            onClick={() => navigate("/login")}
          >
            Get Started 🔥
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            onClick={() => navigate("/login")}
          >
            Login with Google
          </Button>
        </div>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card shadow-card hover:shadow-hover transition-shadow">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="font-semibold text-lg mb-2">Code & Compile</h3>
            <p className="text-sm text-muted-foreground">
              Write Python or Java, run tests, and get instant feedback
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card shadow-card hover:shadow-hover transition-shadow">
            <div className="text-4xl mb-4">😂</div>
            <h3 className="font-semibold text-lg mb-2">Tamil Roasts</h3>
            <p className="text-sm text-muted-foreground">
              Fail a test? Get roasted Tamil cinema style da!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card shadow-card hover:shadow-hover transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground">
              Monitor your tests, attempts, and level up your skills
            </p>
          </div>
        </div>

        <footer className="pt-12 text-sm text-muted-foreground">
          Made with 💙 by Kishor
        </footer>
      </div>
    </div>
  );
};

export default Landing;
