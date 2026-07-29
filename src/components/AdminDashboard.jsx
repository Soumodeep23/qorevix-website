import React, { useState } from 'react'
import QorevixLogo from './QorevixLogo'

export default function AdminDashboard({ isOpen, onClose }) {
  if (!isOpen) return null

  const [activeTab, setActiveTab] = useState('overview')

  const [orders, setOrders] = useState([
    { id: 'ORD-901', client: 'Apex Financial', type: 'AI Platform', budget: '$4,500', status: 'In Development' },
    { id: 'ORD-902', client: 'Hyperion Timepieces', type: 'Ecommerce', budget: '$2,800', status: 'Pending Review' },
    { id: 'ORD-903', client: 'Synapse Global', type: 'AI Chatbot', budget: '$1,900', status: 'Approved' },
  ])

  const [leads, setLeads] = useState([
    { name: 'Quantum AI Systems', email: 'contact@quantump.io', interest: 'Custom Software', status: 'Qualified' },
    { name: 'Vance Robotics', email: 'ceo@vancerobotics.com', interest: 'Business Automation', status: 'New' },
  ])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'rgba(2, 2, 7, 0.94)',
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
          maxWidth: '1080px',
          width: '100%',
          background: 'var(--bg-s)',
          border: '1px solid var(--border-b)',
          borderRadius: '24px',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 0 70px rgba(124, 58, 237, 0.3)',
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '2rem' }}>
          <QorevixLogo height={34} />
          <div>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Qorevix Admin Operations Suite
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-s)', fontFamily: 'var(--font-m)' }}>
              System Status: <span style={{ color: '#4ade80' }}>All Systems Operational (99.99% Uptime)</span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            ['overview', '📊 Revenue & Analytics'],
            ['orders', '📦 Orders Management'],
            ['projects', '🚀 Active Projects'],
            ['crm', '👥 Client CRM & Leads'],
            ['invoices', '🧾 Invoices & Payroll'],
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
                background: activeTab === tabKey ? 'var(--purple)' : 'var(--bg)',
                color: activeTab === tabKey ? '#fff' : 'var(--text-s)',
                border: '1px solid',
                borderColor: activeTab === tabKey ? 'var(--purple-b)' : 'var(--border)',
              }}
            >
              {tabLabel}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-s)', fontFamily: 'var(--font-m)' }}>MONTHLY REVENUE</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--blue-b)' }}>$48,900</div>
                <div style={{ fontSize: '0.72rem', color: '#4ade80', marginTop: '4px' }}>↑ +24.5% vs last month</div>
              </div>

              <div style={{ padding: '1.2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-s)', fontFamily: 'var(--font-m)' }}>ACTIVE PROJECTS</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--purple-b)' }}>14</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-s)', marginTop: '4px' }}>8 on schedule, 6 in review</div>
              </div>

              <div style={{ padding: '1.2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-s)', fontFamily: 'var(--font-m)' }}>NEW ORDERS</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>28</div>
                <div style={{ fontSize: '0.72rem', color: '#4ade80', marginTop: '4px' }}>↑ +12 this week</div>
              </div>

              <div style={{ padding: '1.2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-s)', fontFamily: 'var(--font-m)' }}>LEAD CONVERSION</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', fontWeight: 800, color: '#fde047' }}>68.4%</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-s)', marginTop: '4px' }}>Avg deal size $3,200</div>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>
              Client Order Submissions Queue
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {orders.map((ord) => (
                <div key={ord.id} style={{ padding: '1.2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-m)', fontSize: '0.8rem', color: 'var(--blue-b)' }}>{ord.id}</span>
                    <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>{ord.client} — {ord.type}</h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 800, color: '#fff' }}>{ord.budget}</span>
                    <span style={{ padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', background: 'var(--glow-s)', color: 'var(--blue-b)' }}>{ord.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CRM */}
        {activeTab === 'crm' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>
              Client Lead Pipeline & CRM
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {leads.map((ld, idx) => (
                <div key={idx} style={{ padding: '1rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700 }}>{ld.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-s)' }}>{ld.email} • Interested in: {ld.interest}</div>
                  </div>
                  <button onClick={() => alert(`Converted lead ${ld.name} into active client project!`)} className="mag-btn mag-btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
                    Convert Lead →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
