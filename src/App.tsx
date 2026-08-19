import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { PhoneCallProvider } from './components/PhoneCallContext';
import { EmailProvider } from './components/EmailContext';
import { ThemeProvider } from './components/ThemeContext';
import { AnnouncementProvider } from './components/AnnouncementContext';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { AdminPanel } from './components/AdminPanel';
import { ProjectLightbox } from './components/ProjectLightbox';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SERVICES } from './data/services';
import { matchRedirect, normalizePath } from './data/redirects';
import { pathFromLocation, withBase } from './lib/basePath';
import { ProjectItem } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return normalizePath(pathFromLocation());
  });

  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const [quoteInitialService, setQuoteInitialService] = useState<string>('');

  const navigate = (path: string, replace = false) => {
    const [rawPath, query] = path.split('?');
    const pathname = normalizePath(rawPath || '/');
    const href = withBase(query ? `${pathname}?${query}` : pathname);
    if (replace) {
      window.history.replaceState({}, '', href);
    } else {
      window.history.pushState({}, '', href);
    }
    setCurrentPath(pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(pathFromLocation()));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const matchedRedirect = matchRedirect(currentPath);
    if (matchedRedirect) {
      navigate(matchedRedirect.to, true);
    }
  }, [currentPath]);

  const startQuote = (serviceName: string) => {
    setQuoteInitialService(serviceName);
    navigate('/quote');
  };

  const renderCurrentPage = () => {
    if (currentPath === '/') {
      return (
        <HomePage
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const matchedService = SERVICES.find((s) => s.slug === slug);
      if (matchedService) {
        return (
          <ServiceDetailPage
            service={matchedService}
            onNavigate={navigate}
            onOpenProjectLightbox={(proj) => setLightboxProject(proj)}
          />
        );
      }
    }

    if (currentPath === '/projects') {
      const catParam = new URLSearchParams(window.location.search).get('category') || 'all';
      return (
        <ProjectsPage
          initialCategory={catParam}
          onOpenLightbox={(proj) => setLightboxProject(proj)}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/process') {
      return <ProcessPage onNavigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage />;
    }

    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (currentPath === '/quote') {
      return (
        <QuotePage
          initialProjectType={quoteInitialService}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/privacy') {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <ThemeProvider>
      <AnnouncementProvider>
        <PhoneCallProvider>
          <EmailProvider>
            <div className="min-h-screen flex flex-col bg-canvas text-stone-100 font-sans">
              <div id="site-chrome" className="fixed top-0 right-0 left-0 z-50">
                <AnnouncementBanner onNavigate={navigate} />
                <Header currentPath={currentPath} onNavigate={navigate} />
              </div>

              <main id="site-main" className="flex-grow">
                {renderCurrentPage()}
              </main>

              <Footer onNavigate={navigate} />

              <MobileStickyCTA currentPath={currentPath} onNavigate={navigate} />
              <AdminPanel currentPath={currentPath} />

              {lightboxProject && (
                <ProjectLightbox
                  project={lightboxProject}
                  onClose={() => setLightboxProject(null)}
                  onRequestQuote={(project) => {
                    startQuote(project.serviceType);
                  }}
                />
              )}
            </div>
          </EmailProvider>
        </PhoneCallProvider>
      </AnnouncementProvider>
    </ThemeProvider>
  );
}
