import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import PhoneCallTracker from '@/components/PhoneCallTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ProtectedRoute from '@/components/ProtectedRoute';
import LeadManagement from './pages/LeadManagement';
import PrivatePPO from './pages/PrivatePPO';
import SelfEmployed from './pages/SelfEmployed';
import ACA from './pages/ACA';
import GetCovered from './pages/GetCovered';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Licensing from './pages/Licensing';
import CoverageGuide from './pages/CoverageGuide';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import About from './pages/About';
import Contact from './pages/Contact';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/Marketplace" element={<ACA />} />
      <Route path="/GetCovered" element={<GetCovered />} />
      <Route path="/ppo" element={<PrivatePPO />} />
      <Route path="/self-employed" element={<SelfEmployed />} />
      <Route path="/Terms" element={<Terms />} />
      <Route path="/Privacy" element={<Privacy />} />
      <Route path="/Licensing" element={<Licensing />} />
      <Route path="/coverage-guide" element={<CoverageGuide />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/LeadManagement" element={
        <ProtectedRoute requiredRole="admin" unauthenticatedElement={<Navigate to="/" replace />}>
          <LeadManagement />
        </ProtectedRoute>
      } />
      {/* 301 redirects for old URLs Google has indexed */}
      <Route path="/terms-of-service" element={<Navigate to="/Terms" replace />} />
      <Route path="/privacy-policy" element={<Navigate to="/Privacy" replace />} />
      <Route path="/request-quote" element={<Navigate to="/Quote" replace />} />
      <Route path="/special-enrollment" element={<Navigate to="/Marketplace" replace />} />
      <Route path="/plans/short-term-coverage" element={<Navigate to="/ppo" replace />} />
      <Route path="/plans/family-plans" element={<Navigate to="/Quote" replace />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <PhoneCallTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App