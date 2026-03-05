import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSubmissions from "./pages/AdminSubmissions";
import AdminSections from "./pages/AdminSections";
import SectionEditor from "./pages/SectionEditor";
import NavigationEditor from "./pages/NavigationEditor";
import SettingsEditor from "./pages/SettingsEditor";
import MediaGallery from "./pages/MediaGallery";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataConsent from "./pages/DataConsent";
import CookieBanner from "./components/CookieBanner";
import { Analytics } from "./components/Analytics";
import { ChatWidget } from "./components/chat/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CookieBanner />
        <Analytics />
        {/* <ChatWidget /> */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-consent" element={<DataConsent />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/submissions" element={<AdminSubmissions />} />
            <Route path="/admin/sections" element={<AdminSections />} />
            <Route path="/admin/sections/:id" element={<SectionEditor />} />
            <Route path="/admin/navigation" element={<NavigationEditor />} />
            <Route path="/admin/settings" element={<SettingsEditor />} />
            <Route path="/admin/media" element={<MediaGallery />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

