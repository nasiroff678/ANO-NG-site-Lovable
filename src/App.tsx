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
          <Route
            path="/admin"
            element={
              <Suspense fallback={<AdminLoader />}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            element={
              <ProtectedRoute>
                <Suspense fallback={<AdminLoader />}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<Suspense fallback={<AdminLoader />}><AdminDashboard /></Suspense>} />
            <Route path="/admin/submissions" element={<Suspense fallback={<AdminLoader />}><AdminSubmissions /></Suspense>} />
            <Route path="/admin/sections" element={<Suspense fallback={<AdminLoader />}><AdminSections /></Suspense>} />
            <Route path="/admin/sections/:id" element={<Suspense fallback={<AdminLoader />}><SectionEditor /></Suspense>} />
            <Route path="/admin/navigation" element={<Suspense fallback={<AdminLoader />}><NavigationEditor /></Suspense>} />
            <Route path="/admin/settings" element={<Suspense fallback={<AdminLoader />}><SettingsEditor /></Suspense>} />
            <Route path="/admin/media" element={<Suspense fallback={<AdminLoader />}><MediaGallery /></Suspense>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

