import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyPhone from "./pages/VerifyPhone";
import Onboarding from "./pages/Onboarding";
import Discover from "./pages/Discover";
import ProfileView from "./pages/ProfileView";
import MyProfile from "./pages/MyProfile";
import ChatList from "./pages/ChatList";
import ChatRoom from "./pages/ChatRoom";
import Settings from "./pages/Settings";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify-phone" element={<VerifyPhone />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/chats/:id" element={<ChatRoom />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
