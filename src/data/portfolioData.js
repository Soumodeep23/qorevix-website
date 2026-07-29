export const portfolioData = [
  {
    id: 'apex-analytics',
    title: 'Apex Financial Intelligence Platform',
    category: 'SaaS / AI',
    tagline: 'Real-time 3D telemetry and neural financial forecasting engine',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    caseStudy: {
      problem:
        'Apex Data needed a high-frequency telemetry dashboard capable of rendering 100,000+ data points simultaneously without UI stutter or memory leaks on standard laptops.',
      solution:
        'Engineered a WebGL hardware-accelerated dashboard with custom Three.js shader instancing and a WebWorker data streaming pipeline that maintains a constant 60fps.',
      technologies: ['React 18', 'Three.js', 'FastAPI', 'PostgreSQL', 'Tailwind', 'GSAP'],
      timeTaken: '6 Weeks',
      clientReview: {
        quote:
          '“Qorevix transformed our analytics platform into a lightning-fast 3D workstation. Our enterprise trial conversion jumped 240% within the first month.”',
        author: 'Elena Rostova',
        role: 'VP of Engineering, Apex Financial',
      },
      demoUrl: 'https://demo.qorevix.tech/apex',
      githubUrl: 'https://github.com/qorevix/apex-financial-demo',
      stats: [
        { label: 'FPS Maintained', value: '60 FPS' },
        { label: 'Data Throughput', value: '100K pts/sec' },
        { label: 'Conversion Lift', value: '+240%' },
      ],
    },
  },
  {
    id: 'hyperion-commerce',
    title: 'Hyperion Luxury E-commerce & 3D Configurator',
    category: 'E-commerce',
    tagline: 'Interactive 3D product customizer with sub-second checkout',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    caseStudy: {
      problem:
        'Hyperion faced high cart abandonment due to static 2D product images that failed to showcase customization options for premium watches.',
      solution:
        'Developed a 360-degree real-time 3D watch configurator with dynamic material swapping, instant Razorpay payments, and automated order fulfillment sync.',
      technologies: ['Next.js', 'React Three Fiber', 'Tailwind', 'Razorpay', 'Cloudflare R2'],
      timeTaken: '4 Weeks',
      clientReview: {
        quote:
          '“The interactive 3D watch customizer blew our customers away. Average order value increased by 45% immediately after launch.”',
        author: 'Marcus Vance',
        role: 'Founder & CEO, Hyperion Timepieces',
      },
      demoUrl: 'https://demo.qorevix.tech/hyperion',
      githubUrl: 'https://github.com/qorevix/hyperion-3d-configurator',
      stats: [
        { label: 'Avg Order Value', value: '+45%' },
        { label: 'Page Load Speed', value: '0.4s' },
        { label: 'Return Rate', value: '-38%' },
      ],
    },
  },
  {
    id: 'synapse-ai-chatbot',
    title: 'Synapse Enterprise AI Support Agent',
    category: 'AI Chatbots',
    tagline: 'Autonomous RAG customer service bot with multi-channel routing',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    caseStudy: {
      problem:
        'Customer support ticket backlogs reached 48 hours for common technical questions across global time zones.',
      solution:
        'Deployed a custom RAG (Retrieval-Augmented Generation) chatbot trained on 10,000+ internal documentation pages with live agent handoff fallback.',
      technologies: ['Python FastAPI', 'Supabase Vector', 'React', 'Clerk Auth', 'LangChain'],
      timeTaken: '3 Weeks',
      clientReview: {
        quote:
          '“Synapse handles 82% of customer inquiries instantly without human intervention. Our support staff can now focus on high-value client accounts.”',
        author: 'Dr. Sarah Lin',
        role: 'Chief Operations Officer, Synapse Global',
      },
      demoUrl: 'https://demo.qorevix.tech/synapse',
      githubUrl: null,
      stats: [
        { label: 'Inquiries Automated', value: '82%' },
        { label: 'Response Time', value: '< 1.2s' },
        { label: 'CSAT Score', value: '4.9/5' },
      ],
    },
  },
  {
    id: 'orbit-crm',
    title: 'Orbit Operations & Lead CRM Suite',
    category: 'Enterprise CRM',
    tagline: 'All-in-one client CRM, automated invoicing, and milestone portal',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    caseStudy: {
      problem:
        'Managing client projects across email, spreadsheets, and third-party invoice software caused missed deadlines and accounting delays.',
      solution:
        'Engineered an integrated CRM with automated lead scoring, client milestone approval workflows, live chat, and automated PDF invoice generation.',
      technologies: ['React 18', 'PostgreSQL', 'Tailwind', 'Framer Motion', 'Clerk'],
      timeTaken: '5 Weeks',
      clientReview: {
        quote:
          '“Orbit centralized our entire agency operation into a single dashboard. Project turnaround speed improved by 60%.”',
        author: 'David Chen',
        role: 'Managing Director, Orbit Digital',
      },
      demoUrl: 'https://demo.qorevix.tech/orbit',
      githubUrl: 'https://github.com/qorevix/orbit-crm-open',
      stats: [
        { label: 'Project Speed', value: '+60%' },
        { label: 'Invoicing Time', value: '-85%' },
        { label: 'Client Satisfaction', value: '99%' },
      ],
    },
  },
]
