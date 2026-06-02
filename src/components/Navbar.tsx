import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Users, User, Settings, LogOut, LogIn } from "lucide-react";
import logoImg from "@/assets/honly-logo.svg";

interface NavbarProps {
  variant?: "landing" | "app";
}

export default function Navbar({ variant = "landing" }: NavbarProps) {
  const location = useLocation();

  const appLinks = [
    { href: "/discover", label: "Discover", icon: Users },
    { href: "/chats", label: "Chats", icon: MessageCircle },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="honly-nav sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <img src={logoImg} alt="HOnly logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold font-heading text-navy">
              H<span className="text-coral">Only</span>
            </span>
          </div>
        </Link>

        {variant === "landing" ? (
          <div className="flex items-center gap-3">
            <Link to="/how-it-works">
              <span className="text-sm font-medium hidden sm:block font-body text-navy">
                How it works
              </span>
            </Link>
            <Link to="/signin">
              <button className="honly-btn-outline text-sm px-5 py-2 flex items-center gap-1.5">
                <LogIn size={14} /> Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="honly-btn-primary text-sm px-5 py-2">Join HOnly</button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {appLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} to={href}>
                <button
                  className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors text-xs font-medium font-body"
                  style={{
                    color: location.pathname === href ? "hsl(var(--coral))" : "hsl(var(--navy))",
                    backgroundColor: location.pathname === href ? "hsl(var(--cream-dark))" : "transparent",
                  }}
                >
                  <Icon size={18} />
                  <span className="hidden sm:block">{label}</span>
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
