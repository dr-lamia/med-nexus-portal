
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => void;
  user: UserData | null;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("medNexusUser");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("medNexusUser");
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call with timeout
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Mock login - in a real app, this would be an API call
          const mockUser = {
            id: "user123",
            email,
            firstName: "John",
            lastName: "Doe",
            userType: "patient"
          };
          
          localStorage.setItem("medNexusUser", JSON.stringify(mockUser));
          setUser(mockUser);
          setIsAuthenticated(true);
          
          toast({
            title: "Login successful",
            description: "Welcome back to MedNexus!",
          });
          
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1500);
    });
  };

  // Register function
  const register = async (formData: RegisterFormData) => {
    // Simulate API call with timeout
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Mock registration - in a real app, this would be an API call
          const mockUser = {
            id: "user" + Math.floor(Math.random() * 1000),
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            userType: formData.userType
          };
          
          localStorage.setItem("medNexusUser", JSON.stringify(mockUser));
          setUser(mockUser);
          setIsAuthenticated(true);
          
          toast({
            title: "Registration successful",
            description: "Your account has been created successfully!",
          });
          
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1500);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("medNexusUser");
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        logout,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
