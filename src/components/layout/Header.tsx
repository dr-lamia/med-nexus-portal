
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-primary">MedNexus</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/find-doctors" className="text-med-neutral-700 hover:text-primary transition-colors">
            Find Doctors
          </Link>
          <Link to="/services" className="text-med-neutral-700 hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/pharmacy" className="text-med-neutral-700 hover:text-primary transition-colors">
            Pharmacy
          </Link>
          <Link to="/about" className="text-med-neutral-700 hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5 text-med-neutral-700" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Messages">
                <MessageCircle className="h-5 w-5 text-med-neutral-700" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5 text-med-neutral-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.firstName} {user?.lastName}
                    <div className="text-xs font-normal text-gray-500">{user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/medical-records" className="w-full">Medical Records</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/find-doctors" className="w-full">Find Doctors</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
