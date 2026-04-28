import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { lazy, Suspense } from "react";
const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground text-sm">Загрузка админ-панели...</p>
    </div>
  </div>
);
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminSubmissions = lazy(() => import("./pages/AdminSubmissions"));
const AdminSections = lazy(() => import("./pages/AdminSections"));
const SectionEditor = lazy(() => import("./pages/SectionEditor"));
const NavigationEditor = lazy(() => import("./pages/NavigationEditor"));
const SettingsEditor = lazy(() => import("./pages/SettingsEditor"));
const MediaGallery = lazy(() => import("./pages/MediaGallery"));
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
                <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>}>
                  <AdminLayout />
                </Suspense>
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

