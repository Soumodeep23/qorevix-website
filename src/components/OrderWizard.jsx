import React, { useState } from 'react'

const websiteTypes = [
  { id: 'landing', label: 'Landing Page', basePrice: 499, baseDays: 5, icon: '🚀' },
  { id: 'business', label: 'Business Website', basePrice: 999, baseDays: 10, icon: '🏢' },
  { id: 'portfolio', label: 'Portfolio Website', basePrice: 699, baseDays: 7, icon: '🎨' },
  { id: 'ecommerce', label: 'Ecommerce Store', basePrice: 1799, baseDays: 18, icon: '🛒' },
  { id: 'crm', label: 'CRM / Custom App', basePrice: 2499, baseDays: 24, icon: '📊' },
  { id: 'ai', label: 'AI Platform', basePrice: 2999, baseDays: 28, icon: '🧠' },
]

const availableFeatures = [
  { id: 'auth', label: 'Authentication', price: 200, days: 2 },
  { id: 'payments', label: 'Payments (Stripe/Razorpay)', price: 300, days: 3 },
  { id: 'dashboard', label: 'User Dashboard', price: 450, days: 4 },
  { id: 'chatbot', label: 'AI Chatbot Integration', price: 500, days: 4 },
  { id: 'booking', label: 'Booking System', price: 250, days: 2 },
  { id: 'blog', label: 'CMS Blog System', price: 200, days: 2 },
  { id: 'admin', label: 'Admin Management Panel', price: 600, days: 5 },
  { id: 'analytics', label: 'Custom Analytics Telemetry', price: 150, days: 1 },
  { id: 'seo', label: 'Advanced SEO & Schema', price: 150, days: 1 },
  { id: 'hosting', label: 'Cloud Hosting & CI/CD Setup', price: 100, days: 1 },
]

export default function OrderWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    websiteType: 'business',
    features: ['seo', 'hosting'],
    logoFileName: '',
    docFileName: '',
    budget: '$1,000 - $3,000',
    deadline: 'Within 2 Weeks',
    additionalReqs: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Dynamic calculations
  const currentTypeObj = websiteTypes.find((t) => t.id === formData.websiteType) || websiteTypes[1]
  const selectedFeatureObjs = availableFeatures.filter((f) => formData.features.includes(f.id))

  const estimatedCost =
    currentTypeObj.basePrice + selectedFeatureObjs.reduce((acc, curr) => acc + curr.price, 0)
  const estimatedTimelineDays =
    currentTypeObj.baseDays + selectedFeatureObjs.reduce((acc, curr) => acc + curr.days, 0)

  const toggleFeature = (id) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }))
  }

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file.name }))
    }
  }

  const TOTAL_STEPS = 10 // Step 1 to 9 + Final Summary Step 10

  return (
    <section id="order-wizard" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-label">INTERACTIVE ORDER SYSTEM</div>
        <h2 className="cta-headline" style={{ textAlign: 'left' }}>
          Order Your <span className="text-gradient">Custom Website</span>
        </h2>
        <p className="hero-sub" style={{ opacity: 1, margin: '0.8rem 0 3rem' }}>
          Configure your requirements step-by-step. Get an instant automated timeline & cost estimation.
        </p>

        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            background: 'var(--bg-s)',
            border: '1px solid var(--border-b)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 0 50px rgba(45, 126, 255, 0.15)',
          }}
        >
          {/* Progress Bar */}
          {!isSubmitted && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.8rem',
                  fontSize: '0.82rem',
                  color: 'var(--text-s)',
                  fontFamily: 'var(--font-m)',
                }}
              >
                <span>STEP {step} OF 10</span>
                <span>{Math.round((step / TOTAL_STEPS) * 100)}% COMPLETED</span>
              </div>
              <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${(step / TOTAL_STEPS) * 100}%`,
                    background: 'linear-gradient(90deg, var(--blue), var(--purple-b))',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          )}

          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
              <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
                Order Submitted Successfully!
              </h3>
              <p style={{ color: 'var(--text-s)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                Thank you, <strong>{formData.businessName || 'Valued Client'}</strong>. Your custom project configuration has been routed to our lead solution architect.
              </p>
              <div
                style={{
                  display: 'inline-block',
                  background: 'var(--bg)',
                  border: '1px solid var(--border-b)',
                  borderRadius: '16px',
                  padding: '1.5rem 2rem',
                  textAlign: 'left',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ color: 'var(--blue-b)', fontFamily: 'var(--font-m)', fontSize: '0.8rem' }}>ESTIMATED SUMMARY</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0.4rem 0' }}>
                  Total: ${estimatedCost.toLocaleString()} USD
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-s)' }}>
                  Delivery Window: approx {estimatedTimelineDays} business days
                </div>
              </div>
              <div>
                <button
                  onClick={() => { setIsSubmitted(false); setStep(1); }}
                  className="mag-btn mag-btn-ghost"
                >
                  Configure Another Project
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: Business Name */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 1: What is your Business or Project Name?
                  </h3>
                  <input
                    type="text"
                    placeholder="e.g. Apex Neural Labs"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      borderRadius: '12px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              {/* STEP 2: Industry */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 2: What industry do you operate in?
                  </h3>
                  <input
                    type="text"
                    placeholder="e.g. AI SaaS, FinTech, E-commerce, Healthcare"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      borderRadius: '12px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                  />
                </div>
              )}

              {/* STEP 3: Website Type */}
              {step === 3 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 3: Select Website Type
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    {websiteTypes.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setFormData({ ...formData, websiteType: t.id })}
                        style={{
                          padding: '1.2rem',
                          borderRadius: '16px',
                          background: formData.websiteType === t.id ? 'var(--glow-s)' : 'var(--bg)',
                          border: '1px solid',
                          borderColor: formData.websiteType === t.id ? 'var(--blue-b)' : 'var(--border)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{t.icon}</div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{t.label}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-s)', marginTop: '4px' }}>
                          From ${t.basePrice} • ~{t.baseDays} days
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Choose Features */}
              {step === 4 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 4: Select Required Features
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem' }}>
                    {availableFeatures.map((f) => {
                      const isSelected = formData.features.includes(f.id)
                      return (
                        <div
                          key={f.id}
                          onClick={() => toggleFeature(f.id)}
                          style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            background: isSelected ? 'var(--glow-s)' : 'var(--bg)',
                            border: '1px solid',
                            borderColor: isSelected ? 'var(--blue-b)' : 'var(--border)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{f.label}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-m)' }}>+${f.price} • +{f.days} days</div>
                          </div>
                          <span style={{ fontSize: '1.2rem', color: isSelected ? 'var(--blue-b)' : 'var(--text-m)' }}>
                            {isSelected ? '☑' : '☐'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Upload Logo */}
              {step === 5 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 5: Upload Logo Assets (Optional)
                  </h3>
                  <div
                    style={{
                      border: '2px dashed var(--border-b)',
                      borderRadius: '16px',
                      padding: '3rem 1.5rem',
                      textAlign: 'center',
                      background: 'var(--bg)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📁</div>
                    <p style={{ color: 'var(--text-s)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      Drag & drop your logo files (SVG, PNG, AI, PSD) or click to browse
                    </p>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'logoFileName')}
                      style={{ display: 'none' }}
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="mag-btn mag-btn-ghost">
                      Browse Files
                    </label>
                    {formData.logoFileName && (
                      <div style={{ marginTop: '1rem', color: 'var(--blue-b)', fontWeight: 600 }}>
                        Selected: {formData.logoFileName}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 6: Upload Documents */}
              {step === 6 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 6: Upload Brand Guidelines or Brief (Optional)
                  </h3>
                  <div
                    style={{
                      border: '2px dashed var(--border-b)',
                      borderRadius: '16px',
                      padding: '3rem 1.5rem',
                      textAlign: 'center',
                      background: 'var(--bg)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📄</div>
                    <p style={{ color: 'var(--text-s)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      Upload any wireframe PDFs, content documents, or specification briefs
                    </p>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'docFileName')}
                      style={{ display: 'none' }}
                      id="doc-upload"
                    />
                    <label htmlFor="doc-upload" className="mag-btn mag-btn-ghost">
                      Browse Documents
                    </label>
                    {formData.docFileName && (
                      <div style={{ marginTop: '1rem', color: 'var(--blue-b)', fontWeight: 600 }}>
                        Selected: {formData.docFileName}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 7: Budget */}
              {step === 7 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 7: Select Target Budget Bracket
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {['$500 - $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000+ Enterprise'].map((b) => (
                      <div
                        key={b}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        style={{
                          padding: '1.2rem',
                          borderRadius: '12px',
                          background: formData.budget === b ? 'var(--glow-s)' : 'var(--bg)',
                          border: '1px solid',
                          borderColor: formData.budget === b ? 'var(--blue-b)' : 'var(--border)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          fontWeight: 600,
                          color: '#fff',
                        }}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 8: Deadline */}
              {step === 8 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 8: What is your target launch deadline?
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {['ASAP (Rush 7 Days)', 'Within 2 Weeks', 'Within 1 Month', 'Flexible Timeline'].map((d) => (
                      <div
                        key={d}
                        onClick={() => setFormData({ ...formData, deadline: d })}
                        style={{
                          padding: '1.2rem',
                          borderRadius: '12px',
                          background: formData.deadline === d ? 'var(--glow-s)' : 'var(--bg)',
                          border: '1px solid',
                          borderColor: formData.deadline === d ? 'var(--blue-b)' : 'var(--border)',
                          cursor: 'pointer',
                          textAlign: 'center',
                          fontWeight: 600,
                          color: '#fff',
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 9: Additional Requirements */}
              {step === 9 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Step 9: Any Additional Requirements or Design Notes?
                  </h3>
                  <textarea
                    rows={5}
                    placeholder="Mention specific color preferences, competitor sites you like, or special integrations..."
                    value={formData.additionalReqs}
                    onChange={(e) => setFormData({ ...formData, additionalReqs: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      borderRadius: '12px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>
              )}

              {/* STEP 10: Summary & Submission */}
              {step === 10 && (
                <div>
                  <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                    Final Step: Review & Confirm Order
                  </h3>

                  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      <div><strong style={{ color: 'var(--text-s)' }}>Business Name:</strong> <span style={{ color: '#fff' }}>{formData.businessName || 'N/A'}</span></div>
                      <div><strong style={{ color: 'var(--text-s)' }}>Industry:</strong> <span style={{ color: '#fff' }}>{formData.industry || 'N/A'}</span></div>
                      <div><strong style={{ color: 'var(--text-s)' }}>Website Type:</strong> <span style={{ color: 'var(--blue-b)' }}>{currentTypeObj.label}</span></div>
                      <div><strong style={{ color: 'var(--text-s)' }}>Target Deadline:</strong> <span style={{ color: '#fff' }}>{formData.deadline}</span></div>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-s)', marginBottom: '1rem' }}>
                      <strong>Selected Features:</strong> {selectedFeatureObjs.map((f) => f.label).join(', ') || 'Standard Features'}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-m)', fontSize: '0.75rem', color: 'var(--blue)' }}>DYNAMIC ESTIMATED COST</div>
                        <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--blue-b)' }}>
                          ${estimatedCost.toLocaleString()} USD
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-m)', fontSize: '0.75rem', color: 'var(--text-m)' }}>ESTIMATED TIMELINE</div>
                        <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                          ~{estimatedTimelineDays} Days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="mag-btn mag-btn-ghost">
                    ← Previous
                  </button>
                ) : <div />}

                {step < 10 ? (
                  <button onClick={() => setStep(step + 1)} className="mag-btn mag-btn-primary">
                    Next Step →
                  </button>
                ) : (
                  <button onClick={() => setIsSubmitted(true)} className="mag-btn mag-btn-primary">
                    Submit Website Order 🚀
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
