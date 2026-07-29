import { useEffect, useState, lazy, Suspense } from 'react'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import HeroText from './components/hero/HeroText'
import Marquee from './components/Marquee'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

// Code splitting heavy interactive components with React.lazy
const Scene3D = lazy(() => import('./components/hero/Scene3D'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const OrderWizard = lazy(() => import('./components/OrderWizard'))
const ClientDashboard = lazy(() => import('./components/ClientDashboard'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))

function SuspenseFallback() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-s)', fontFamily: 'var(--font-m)', fontSize: '0.85rem' }}>
      ⚡ Loading Interactive Engine...
    </div>
  )
}

export default function App() {
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false)
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) =>
      io.observe(el)
    )
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <Nav
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />
      <main>
        <section id="hero" className="hero">
          <div className="hero-bg-glow" />
          <div className="hero-grid" />
          <HeroText />
          <Suspense fallback={<div className="hero-3d" />}>
            <Scene3D />
          </Suspense>
        </section>

        <Marquee />
        <Services />

        <Suspense fallback={<SuspenseFallback />}>
          <Portfolio />
        </Suspense>

        <Suspense fallback={<SuspenseFallback />}>
          <OrderWizard />
        </Suspense>

        <WhyUs />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />

      {/* Portals & Dashboards loaded asynchronously */}
      <Suspense fallback={null}>
        <ClientDashboard
          isOpen={isClientPortalOpen}
          onClose={() => setIsClientPortalOpen(false)}
        />
        <AdminDashboard
          isOpen={isAdminPortalOpen}
          onClose={() => setIsAdminPortalOpen(false)}
        />
      </Suspense>
    </>
  )
}
