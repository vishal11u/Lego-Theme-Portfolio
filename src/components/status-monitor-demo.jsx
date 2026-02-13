import React, { useState } from 'react';

// Types
type StatusLevel = 'operational' | 'degraded' | 'outage';

interface StatusPeriod {
  start: Date;
  end: Date;
  level: StatusLevel;
  title?: string;
  description?: string;
}

type TimeGranularity = 'hourly' | 'daily' | 'monthly';

interface StatusMonitorProps {
  title: string;
  subtitle?: string;
  periods: StatusPeriod[];
  granularity?: TimeGranularity;
  totalDays?: number;
  className?: string;
  onPeriodClick?: (period: StatusPeriod) => void;
}

// Utility functions
const getLevelColor = (level: StatusLevel): string => {
  switch (level) {
    case 'operational': return '#10b981';
    case 'degraded': return '#f59e0b';
    case 'outage': return '#ef4444';
    default: return '#10b981';
  }
};

const getLevelLabel = (level: StatusLevel): string => {
  switch (level) {
    case 'operational': return 'Operational';
    case 'degraded': return 'Degraded Performance';
    case 'outage': return 'Major Outage';
    default: return 'Unknown';
  }
};

const formatDate = (date: Date, granularity: TimeGranularity): string => {
  switch (granularity) {
    case 'hourly':
      return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    case 'daily':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    case 'monthly':
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
};

const calculateUptime = (periods: StatusPeriod[]): number => {
  if (periods.length === 0) return 100;
  const totalMinutes = periods.reduce((acc, period) => {
    const duration = (period.end.getTime() - period.start.getTime()) / (1000 * 60);
    return acc + duration;
  }, 0);
  const operationalMinutes = periods.reduce((acc, period) => {
    if (period.level === 'operational') {
      const duration = (period.end.getTime() - period.start.getTime()) / (1000 * 60);
      return acc + duration;
    }
    return acc;
  }, 0);
  return (operationalMinutes / totalMinutes) * 100;
};

// Tooltip Component
const Tooltip = ({ period, granularity, position }) => {
  const duration = (period.end.getTime() - period.start.getTime()) / (1000 * 60);
  
  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        minWidth: '200px',
        pointerEvents: 'none',
        animation: 'tooltipFadeIn 0.15s ease-out',
      }}
    >
      <style>{`
        @keyframes tooltipFadeIn {
          from { opacity: 0; transform: translate(-50%, calc(-100% - 5px)); }
          to { opacity: 1; transform: translate(-50%, -100%); }
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getLevelColor(period.level) }} />
        <span style={{ fontWeight: 600, fontSize: '13px', color: '#1f2937' }}>{getLevelLabel(period.level)}</span>
      </div>
      
      {period.level !== 'operational' && (
        <>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
            {Math.floor(duration / 60)} hrs {Math.floor(duration % 60)} mins
          </div>
          
          {period.title && (
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.5px', marginBottom: '4px' }}>RELATED</div>
              <div style={{ fontSize: '12px', color: '#374151' }}>{period.title}</div>
            </div>
          )}
          
          {period.description && (
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{period.description}</div>
          )}
        </>
      )}
      
      <div style={{ fontSize: '11px', color: '#9ca3af', paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
        {formatDate(period.start, granularity)}
      </div>
    </div>
  );
};

// Main Component
const StatusMonitor = ({
  title,
  subtitle,
  periods,
  granularity = 'daily',
  totalDays = 90,
  className = '',
  onPeriodClick,
}) => {
  const [hoveredPeriod, setHoveredPeriod] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const uptime = calculateUptime(periods);
  
  const handleMouseEnter = (period, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
    setHoveredPeriod(period);
  };
  
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    }} className={className}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '15px', fontWeight: 500, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {title}
            {subtitle && <span style={{ fontSize: '13px', color: '#3b82f6', fontWeight: 500 }}>{subtitle}</span>}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>{uptime.toFixed(2)} % uptime</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>Last {totalDays} days</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', height: '40px', gap: '2px', borderRadius: '4px', overflow: 'hidden' }}>
          {periods.map((period, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, filter 0.2s ease',
                position: 'relative',
                backgroundColor: getLevelColor(period.level),
              }}
              onMouseEnter={(e) => handleMouseEnter(period, e)}
              onMouseLeave={() => setHoveredPeriod(null)}
              onClick={() => onPeriodClick?.(period)}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scaleY(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scaleY(1)'}
            />
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
          <span>{totalDays} days ago</span>
          <span>Today</span>
        </div>
      </div>
      
      {hoveredPeriod && (
        <Tooltip period={hoveredPeriod} granularity={granularity} position={tooltipPosition} />
      )}
    </div>
  );
};

// Helper to generate sample data
const generateSamplePeriods = (days, granularity = 'daily') => {
  const periods = [];
  const now = new Date();
  
  let totalPeriods;
  let periodDuration;
  
  switch (granularity) {
    case 'hourly':
      totalPeriods = days * 24;
      periodDuration = 60;
      break;
    case 'daily':
      totalPeriods = days;
      periodDuration = 24 * 60;
      break;
    case 'monthly':
      totalPeriods = days / 30;
      periodDuration = 30 * 24 * 60;
      break;
    default:
      totalPeriods = days;
      periodDuration = 24 * 60;
  }
  
  for (let i = 0; i < totalPeriods; i++) {
    const end = new Date(now.getTime() - (i * periodDuration * 60 * 1000));
    const start = new Date(end.getTime() - (periodDuration * 60 * 1000));
    
    let level = 'operational';
    const random = Math.random();
    
    if (random > 0.995) {
      level = 'outage';
    } else if (random > 0.98) {
      level = 'degraded';
    }
    
    periods.push({
      start,
      end,
      level,
      ...(level !== 'operational' && {
        title: level === 'outage' ? 'Database connectivity issues' : 'High latency detected',
        description: level === 'outage' 
          ? 'Complete service disruption affecting all users' 
          : 'Some users experiencing slower response times'
      })
    });
  }
  
  return periods.reverse();
};

// Demo App
export default function App() {
  return (
    <div style={{ 
      padding: '40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: '42px', 
            fontWeight: 'bold',
            marginBottom: '8px',
            letterSpacing: '-0.02em'
          }}>
            System Status Dashboard
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
            Real-time monitoring of all services and infrastructure
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <StatusMonitor
            title="Authentication Service"
            subtitle="✓ Operational"
            periods={generateSamplePeriods(90, 'daily')}
            granularity="daily"
            totalDays={90}
            onPeriodClick={(period) => {
              if (period.level !== 'operational') {
                alert(`Incident: ${period.title}`);
              }
            }}
          />
          
          <StatusMonitor
            title="API Gateway"
            subtitle="99.9% Uptime"
            periods={generateSamplePeriods(90, 'daily')}
            granularity="daily"
            totalDays={90}
          />
          
          <StatusMonitor
            title="PostgreSQL Database"
            periods={generateSamplePeriods(90, 'daily')}
            granularity="daily"
            totalDays={90}
          />
          
          <StatusMonitor
            title="CDN Network"
            subtitle="✓ Operational"
            periods={generateSamplePeriods(30, 'daily')}
            granularity="daily"
            totalDays={30}
          />
          
          <StatusMonitor
            title="Real-time Updates (Hourly View)"
            periods={generateSamplePeriods(7, 'hourly')}
            granularity="hourly"
            totalDays={7}
          />
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
            Legend
          </h3>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: '#10b981' }} />
              <span style={{ color: 'white', fontSize: '14px' }}>Operational</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: '#f59e0b' }} />
              <span style={{ color: 'white', fontSize: '14px' }}>Degraded Performance</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: '#ef4444' }} />
              <span style={{ color: 'white', fontSize: '14px' }}>Major Outage</span>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginTop: '16px' }}>
            Hover over any bar to see detailed incident information. Click on incidents for more details.
          </p>
        </div>
      </div>
    </div>
  );
}
