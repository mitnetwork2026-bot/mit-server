"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider, database } from "@/lib/firebase";
import { ref, set, get } from "firebase/database";

interface UserProfile {
  displayName: string;
  email: string;
  profileImage: string;
  bio: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
  coverImage: string;
  joinDate: string;
  skills: string[];
  status: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  displayName: "",
  email: "",
  profileImage: "",
  bio: "Cyber Security Expert | Network Specialist",
  phone: "",
  location: "",
  website: "",
  github: "",
  twitter: "",
  linkedin: "",
  coverImage: "",
  joinDate: new Date().toISOString(),
  skills: ["Network Security", "Penetration Testing", "Cryptography"],
  status: "online",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loadUserProfile = async (user: User) => {
    try {
      const profileRef = ref(database, `users/${user.uid}/profile`);
      const snapshot = await get(profileRef);
      if (snapshot.exists()) {
        setUserProfile(snapshot.val());
      } else {
        // Create default profile for new users
        const newProfile: UserProfile = {
          ...defaultProfile,
          displayName: user.displayName || user.email?.split("@")[0] || "User",
          email: user.email || "",
          profileImage: user.photoURL || "",
        };
        await set(profileRef, newProfile);
        setUserProfile(newProfile);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update auth profile
    await updateProfile(user, { displayName: name });

    // Create database profile
    const newProfile: UserProfile = {
      ...defaultProfile,
      displayName: name,
      email: email,
      profileImage: "",
    };

    const profileRef = ref(database, `users/${user.uid}/profile`);
    await set(profileRef, newProfile);
    setUserProfile(newProfile);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if profile exists, if not create it
    const profileRef = ref(database, `users/${user.uid}/profile`);
    const snapshot = await get(profileRef);
    
    if (!snapshot.exists()) {
      const newProfile: UserProfile = {
        ...defaultProfile,
        displayName: user.displayName || user.email?.split("@")[0] || "User",
        email: user.email || "",
        profileImage: user.photoURL || "",
      };
      await set(profileRef, newProfile);
      setUserProfile(newProfile);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  const updateUserProfile = async (profileUpdates: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const profileRef = ref(database, `users/${user.uid}/profile`);
      const snapshot = await get(profileRef);
      const currentProfile = snapshot.val() || defaultProfile;
      const updatedProfile = { ...currentProfile, ...profileUpdates };
      
      await set(profileRef, updatedProfile);
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, signUp, signInWithGoogle, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
