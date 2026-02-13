import React, { useState } from 'react';

// Types
export type StatusLevel = 'operational' | 'degraded' | 'outage';

export interface StatusEvent {
  timestamp: Date;
  level: StatusLevel;
  duration: number; // in minutes
  title?: string;
  description?: string;
}

export interface StatusPeriod {
  start: Date;
  end: Date;
  level: StatusLevel;
}

export type TimeGranularity = 'hourly' | 'daily' | 'monthly';

export interface StatusMonitorProps {
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
    case 'operational':
      return '#10b981'; // green
    case 'degraded':
      return '#f59e0b'; // yellow/amber
    case 'outage':
      return '#ef4444'; // red
    default:
      return '#10b981';
  }
};

const getLevelLabel = (level: StatusLevel): string => {
  switch (level) {
    case 'operational':
      return 'Operational';
    case 'degraded':
      return 'Degraded Performance';
    case 'outage':
      return 'Major Outage';
    default:
      return 'Unknown';
  }
};

const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} hr${hours !== 1 ? 's' : ''} ${mins} min${mins !== 1 ? 's' : ''}` : `${hours} hr${hours !== 1 ? 's' : ''}`;
};

const formatDate = (date: Date, granularity: TimeGranularity): string => {
  const options: Intl.DateTimeFormatOptions = {};
  
  switch (granularity) {
    case 'hourly':
      return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit' 
      });
    case 'daily':
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    case 'monthly':
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
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
interface TooltipProps {
  period: StatusPeriod;
  granularity: TimeGranularity;
  position: { x: number; y: number };
}

const Tooltip: React.FC<TooltipProps> = ({ period, granularity, position }) => {
  const duration = (period.end.getTime() - period.start.getTime()) / (1000 * 60);
  
  return (
    <div
      className="status-tooltip"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="tooltip-header">
        <span 
          className="status-indicator"
          style={{ backgroundColor: getLevelColor(period.level) }}
        />
        <span className="status-label">{getLevelLabel(period.level)}</span>
      </div>
      
      {period.level !== 'operational' && (
        <>
          <div className="tooltip-duration">
            <span className="duration-value">
              {Math.floor(duration / 60)} hrs {Math.floor(duration % 60)} mins
            </span>
          </div>
          
          {(period as any).title && (
            <div className="tooltip-section">
              <div className="section-label">RELATED</div>
              <div className="section-content">{(period as any).title}</div>
            </div>
          )}
          
          {(period as any).description && (
            <div className="tooltip-description">{(period as any).description}</div>
          )}
        </>
      )}
      
      <div className="tooltip-timestamp">
        {formatDate(period.start, granularity)}
      </div>
    </div>
  );
};

// Main Component
export const StatusMonitor: React.FC<StatusMonitorProps> = ({
  title,
  subtitle,
  periods,
  granularity = 'daily',
  totalDays = 90,
  className = '',
  onPeriodClick,
}) => {
  const [hoveredPeriod, setHoveredPeriod] = useState<StatusPeriod | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const uptime = calculateUptime(periods);
  
  const handleMouseEnter = (period: StatusPeriod, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setHoveredPeriod(period);
  };
  
  const handleMouseLeave = () => {
    setHoveredPeriod(null);
  };
  
  return (
    <div className={`status-monitor ${className}`}>
      <style>{`
        .status-monitor {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        
        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .status-title {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .title-main {
          font-size: 15px;
          font-weight: 500;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .title-subtitle {
          font-size: 13px;
          color: #6b7280;
        }
        
        .status-badge {
          font-size: 13px;
          color: #3b82f6;
          font-weight: 500;
        }
        
        .uptime-container {
          margin-bottom: 16px;
        }
        
        .uptime-bar {
          display: flex;
          height: 40px;
          gap: 2px;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .uptime-period {
          flex: 1;
          cursor: pointer;
          transition: transform 0.2s ease, filter 0.2s ease;
          position: relative;
        }
        
        .uptime-period:hover {
          transform: scaleY(1.1);
          filter: brightness(1.1);
          z-index: 10;
        }
        
        .uptime-period:active {
          transform: scaleY(1.05);
        }
        
        .uptime-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 12px;
          color: #6b7280;
        }
        
        .uptime-label {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .status-tooltip {
          position: fixed;
          transform: translate(-50%, -100%);
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          min-width: 200px;
          pointer-events: none;
          animation: tooltipFadeIn 0.15s ease-out;
        }
        
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, calc(-100% - 5px));
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%);
          }
        }
        
        .tooltip-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .status-label {
          font-weight: 600;
          font-size: 13px;
          color: #1f2937;
        }
        
        .tooltip-duration {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 8px;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .duration-value {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .tooltip-section {
          margin-bottom: 8px;
        }
        
        .section-label {
          font-size: 10px;
          font-weight: 600;
          color: #6b7280;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .section-content {
          font-size: 12px;
          color: #374151;
        }
        
        .tooltip-description {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
        }
        
        .tooltip-timestamp {
          font-size: 11px;
          color: #9ca3af;
          padding-top: 8px;
          border-top: 1px solid #f3f4f6;
        }
        
        .uptime-stats {
          text-align: right;
        }
        
        .uptime-percentage {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .uptime-period-label {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }
      `}</style>
      
      <div className="status-header">
        <div className="status-title">
          <div className="title-main">
            {title}
            {subtitle && <span className="status-badge">{subtitle}</span>}
          </div>
        </div>
        <div className="uptime-stats">
          <div className="uptime-percentage">{uptime.toFixed(2)} % uptime</div>
          <div className="uptime-period-label">Last {totalDays} days</div>
        </div>
      </div>
      
      <div className="uptime-container">
        <div className="uptime-bar">
          {periods.map((period, index) => (
            <div
              key={index}
              className="uptime-period"
              style={{ backgroundColor: getLevelColor(period.level) }}
              onMouseEnter={(e) => handleMouseEnter(period, e)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onPeriodClick?.(period)}
            />
          ))}
        </div>
        
        <div className="uptime-labels">
          <span className="uptime-label">{totalDays} days ago</span>
          <span className="uptime-label">Today</span>
        </div>
      </div>
      
      {hoveredPeriod && (
        <Tooltip 
          period={hoveredPeriod} 
          granularity={granularity}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

export default StatusMonitor;
