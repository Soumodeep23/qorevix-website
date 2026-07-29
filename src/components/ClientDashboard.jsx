import React, { useState } from 'react'
import QorevixLogo from './QorevixLogo'

export default function ClientDashboard({ isOpen, onClose }) {
  if (!isOpen) return null

  const [activeTab, setActiveTab] = useState('project')
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-001', amount: '$2,450.00', status: 'Paid', date: '2026-07-10', item: 'Phase 1 Core Architecture' },
    { id: 'INV-2026-002', amount: '$1,800.00', status: 'Pending', date: '2026-07-24', item: 'Phase 2 3D Shader Integration' },
  ])

  const [messages, setMessages] = useState([
    { sender: 'Qorevix Lead Architect', text: '3D Neural Mesh shader performance optimization complete. Frame rate holding steady at 60fps.', time: '10:30 AM' },
    { sender: 'Client', text: 'Looks incredible! Can we adjust the blue glow intensity on the central sphere?', time: '11:15 AM' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [revisions, setRevisions] = useState([
    { id: 'REV-01', title: 'Adjust particle speed', status: 'In Progress' },
  ])
  const [revisionInput, setRevisionInput] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Client (You)', text: newMessage, time: 'Just now' }])
      setNewMessage('')
    }
  }

  const handleAddRevision = (e) => {
    e.preventDefault()
    if (revisionInput.trim()) {
      setRevisions([...revisions, { id: `REV-0${revisions.length + 1}`, title: revisionInput, status: 'Submitted' }])
      setRevisionInput('')
    }
  }

  const handlePayInvoice = (invId) => {
    setInvoices(invoices.map((inv) => (inv.id === invId ? { ...inv, status: 'Paid' } : inv)))
    alert(`Payment of ${invId} processed successfully! Invoice marked as Paid.`)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'rgba(2, 2, 7, 0.92)',
        backdropFilter: 'blur(24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          background: 'var(--bg-s)',
          border: '1px solid var(--border-b)',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 0 60px rgba(45, 126, 255, 0.3)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-gl)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* Portal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '2rem' }}>
          <QorevixLogo height={32} />
          <div>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Client Portal Dashboard
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-s)', fontFamily: 'var(--font-m)' }}>
              Project: Apex Financial WebGL Engine • Status: <span style={{ color: 'var(--blue-b)' }}>Active Development (75%)</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            ['project', '📌 Project Tracker'],
            ['invoices', '💳 Invoices & Payments'],
            ['revisions', '✏️ Revisions & Approvals'],
            ['messages', '💬 Team Chat'],
            ['downloads', '📦 Source Code & Assets'],
          ].map(([tabKey, tabLabel]) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeTab === tabKey ? 'var(--blue)' : 'var(--bg)',
                color: activeTab === tabKey ? '#fff' : 'var(--text-s)',
                border: '1px solid',
                borderColor: activeTab === tabKey ? 'var(--blue-b)' : 'var(--border)',
              }}
            >
              {tabLabel}
            </button>
          ))}
        </div>

        {/* TAB 1: Project Tracker */}
        {activeTab === 'project' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#fff' }}>
              Milestone Progress Bar
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { name: '1. Neural Architecture & Blueprinting', status: 'Completed', date: 'Jul 10' },
                { name: '2. 3D Shader & Particle Engine Development', status: 'Completed', date: 'Jul 18' },
                { name: '3. Full-Stack WebGL Component Integration', status: 'In Progress (85%)', date: 'Jul 28' },
                { name: '4. Optimization & Security Audit Launch', status: 'Upcoming', date: 'Aug 05' },
              ].map((ms, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.2rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{ms.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-m)', marginTop: '4px' }}>Target Date: {ms.date}</div>
                  </div>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-m)',
                      background: ms.status.includes('Completed') ? 'rgba(34,197,94,0.15)' : 'var(--glow-s)',
                      color: ms.status.includes('Completed') ? '#4ade80' : 'var(--blue-b)',
                      border: '1px solid var(--border-b)',
                    }}
                  >
                    {ms.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Invoices */}
        {activeTab === 'invoices' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#fff' }}>
              Invoices & Online Razorpay Payment
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  style={{
                    padding: '1.2rem',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-m)', color: 'var(--blue-b)', fontSize: '0.85rem' }}>{inv.id}</div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>{inv.amount}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-s)' }}>{inv.item} • {inv.date}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-m)',
                        background: inv.status === 'Paid' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
                        color: inv.status === 'Paid' ? '#4ade80' : '#fde047',
                      }}
                    >
                      {inv.status}
                    </span>
                    {inv.status === 'Pending' ? (
                      <button onClick={() => handlePayInvoice(inv.id)} className="mag-btn mag-btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                        Pay Online (Razorpay) 💳
                      </button>
                    ) : (
                      <button onClick={() => alert(`Downloading PDF Invoice ${inv.id}...`)} className="mag-btn mag-btn-ghost" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                        Download Invoice PDF 📄
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Revisions & Approvals */}
        {activeTab === 'revisions' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>
              Design Approvals & Revision Requests
            </h3>
            <form onSubmit={handleAddRevision} style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Describe your design revision request..."
                value={revisionInput}
                onChange={(e) => setRevisionInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.8rem 1.2rem',
                  borderRadius: '10px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: '#fff',
                  outline: 'none',
                }}
              />
              <button type="submit" className="mag-btn mag-btn-primary">
                Submit Request
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {revisions.map((rev) => (
                <div key={rev.id} style={{ padding: '1rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#fff', fontSize: '0.9rem' }}>{rev.title}</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-m)', color: 'var(--blue-b)' }}>{rev.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Team Messages */}
        {activeTab === 'messages' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>
              Direct Team Chat & Meetings
            </h3>
            <div style={{ height: '220px', overflowY: 'auto', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ padding: '0.8rem', borderRadius: '10px', background: m.sender.includes('Client') ? 'var(--glow-s)' : 'var(--bg-e)' }}>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-m)', color: 'var(--blue-b)', marginBottom: '4px' }}>
                    {m.sender} • {m.time}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#fff' }}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.8rem' }}>
              <input
                type="text"
                placeholder="Type message to solution architect..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ flex: 1, padding: '0.8rem 1.2rem', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', outline: 'none' }}
              />
              <button type="submit" className="mag-btn mag-btn-primary">
                Send 💬
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: Downloads */}
        {activeTab === 'downloads' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>
              Download Deliverables & Source Code
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px' }}>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>📦 Full Source Code Bundle (.zip)</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-s)', marginBottom: '1rem' }}>Includes React 18, Three.js shaders, components, and documentation.</p>
                <button onClick={() => alert('Downloading Source Code Archive...')} className="mag-btn mag-btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  Download Code Zip 💾
                </button>
              </div>

              <div style={{ padding: '1.5rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px' }}>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>📄 Legal & License Certificate</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-s)', marginBottom: '1rem' }}>Full IP transfer document and commercial license certificate.</p>
                <button onClick={() => alert('Downloading IP Transfer PDF...')} className="mag-btn mag-btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  Download License PDF 📜
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
