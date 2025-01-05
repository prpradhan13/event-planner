import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/src/utils/supabase";
import { ActivityIndicator, View } from "react-native";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
          setIsReady(true);
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
    }, [])

    if (!isReady) {  
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
          <ActivityIndicator size="large" color="white"/>
        </View>
      );
    }

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null, isAuthenticated: !!session?.user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};