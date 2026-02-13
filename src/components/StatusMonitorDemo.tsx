import React from 'react';
import StatusMonitor, { StatusPeriod, StatusLevel, TimeGranularity } from './StatusMonitor';

// Helper function to generate sample data
const generateSamplePeriods = (days: number, granularity: 'hourly' | 'daily' | 'monthly' = 'daily'): StatusPeriod[] => {
  const periods: StatusPeriod[] = [];
  const now = new Date();
  
  let totalPeriods: number;
  let periodDuration: number; // in minutes
  
  switch (granularity) {
    case 'hourly':
      totalPeriods = days * 24; // One bar per hour
      periodDuration = 60;
      break;
    case 'daily':
      totalPeriods = days; // One bar per day
      periodDuration = 24 * 60;
      break;
    case 'monthly':
      totalPeriods = days / 30; // One bar per month (approximately)
      periodDuration = 30 * 24 * 60;
      break;
    default:
      totalPeriods = days;
      periodDuration = 24 * 60;
  }
  
  for (let i = 0; i < totalPeriods; i++) {
    const end = new Date(now.getTime() - (i * periodDuration * 60 * 1000));
    const start = new Date(end.getTime() - (periodDuration * 60 * 1000));
    
    // Simulate 99%+ uptime with occasional issues
    let level: StatusLevel = 'operational';
    const random = Math.random();
    
    if (random > 0.99) {
      level = 'outage';
    } else if (random > 0.97) {
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

// Example: Authentication Service Monitor (90 days, daily view)
export const AuthServiceExample: React.FC = () => {
  const periods = generateSamplePeriods(90, 'daily');
  
  return (
    <StatusMonitor
      title="Auth Service"
      subtitle="Under Maintenance"
      periods={periods}
      granularity="daily"
      totalDays={90}
      onPeriodClick={(period) => {
        console.log('Clicked period:', period);
      }}
    />
  );
};

// Example: API Monitor (7 days, hourly view)
export const APIMonitorHourly: React.FC = () => {
  const periods = generateSamplePeriods(7, 'hourly');
  
  return (
    <StatusMonitor
      title="API Gateway"
      subtitle="Operational"
      periods={periods}
      granularity="hourly"
      totalDays={7}
      onPeriodClick={(period) => {
        console.log('Clicked period:', period);
      }}
    />
  );
};

// Example: Database Monitor (30 days, daily view)
export const DatabaseMonitor: React.FC = () => {
  const periods = generateSamplePeriods(30, 'daily');
  
  return (
    <StatusMonitor
      title="PostgreSQL Database"
      periods={periods}
      granularity="daily"
      totalDays={30}
    />
  );
};

// Example: Complete Dashboard with Multiple Services
export const StatusDashboard: React.FC = () => {
  return (
    <div style={{ 
      padding: '40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '32px', 
          fontWeight: 'bold',
          marginBottom: '32px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }}>
          System Status Dashboard
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <StatusMonitor
            title="Authentication Service"
            subtitle="Operational"
            periods={generateSamplePeriods(90, 'daily')}
            granularity="daily"
            totalDays={90}
          />
          
          <StatusMonitor
            title="API Gateway"
            subtitle="99.9% Uptime"
            periods={generateSamplePeriods(90, 'daily')}
            granularity="daily"
            totalDays={90}
          />
          
          <StatusMonitor
            title="Database Cluster"
            periods={generateSamplePeriods(90, 'daily')}
            granularity="daily"
            totalDays={90}
          />
          
          <StatusMonitor
            title="CDN Network"
            periods={generateSamplePeriods(30, 'daily')}
            granularity="daily"
            totalDays={30}
          />
          
          <StatusMonitor
            title="Real-time Updates (Last 7 Days)"
            periods={generateSamplePeriods(7, 'hourly')}
            granularity="hourly"
            totalDays={7}
          />
        </div>
      </div>
    </div>
  );
};

// Example with Custom Data
export const CustomDataExample: React.FC = () => {
  // Define specific incidents
  const customPeriods: any[] = [
    // Last 90 days, mostly operational
    ...Array.from({ length: 85 }, (_, i) => ({
      start: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000),
      end: new Date(Date.now() - (88 - i) * 24 * 60 * 60 * 1000),
      level: 'operational' as StatusLevel,
    })),
    // Degraded performance 5 days ago
    {
      start: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      end: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      level: 'degraded' as StatusLevel,
      title: 'Connectivity issues with projects',
      description: 'Some users experiencing intermittent connectivity issues',
    },
    // Major outage 3 days ago
    {
      start: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      end: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 24 * 60 * 1000), // 24 minutes
      level: 'outage' as StatusLevel,
      title: 'Database connectivity failure',
      description: 'Complete service disruption affecting all users',
    },
    // Operational since then
    ...Array.from({ length: 3 }, (_, i) => ({
      start: new Date(Date.now() - (2 - i) * 24 * 60 * 60 * 1000),
      end: new Date(Date.now() - (1 - i) * 24 * 60 * 60 * 1000),
      level: 'operational' as StatusLevel,
    })),
  ];
  
  return (
    <StatusMonitor
      title="Custom Service Monitor"
      subtitle="With Specific Incidents"
      periods={customPeriods}
      granularity="daily"
      totalDays={90}
      onPeriodClick={(period) => {
        if (period.level !== 'operational') {
          alert(`Incident: ${(period as any).title || 'Unknown incident'}`);
        }
      }}
    />
  );
};

// Main App Component
const App: React.FC = () => {
  return <StatusDashboard />;
};

export default App;
