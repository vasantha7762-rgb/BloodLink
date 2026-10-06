import React, { ReactNode } from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendType = 'positive',
  subtitle,
  badge,
  badgeColor = 'bg-[#FAF9F6] text-[#667085]'
}) => {
  return (
    <Card hoverEffect className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">{title}</span>
          <span className="text-3xl font-extrabold text-[#202124] mt-2 tracking-tight">{value}</span>
        </div>
        <div className="p-2.5 rounded-control bg-[#FAF9F6] text-[#7F1D3A] border border-[#E5E1DC]">
          {icon}
        </div>
      </div>

      {(subtitle || trend || badge) && (
        <div className="mt-4 pt-3 border-t border-[#E5E1DC]/60 flex items-center justify-between text-xs">
          {subtitle && <span className="text-[#667085]">{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold ${
                trendType === 'positive'
                  ? 'text-[#27836A]'
                  : trendType === 'negative'
                  ? 'text-[#C94B4B]'
                  : 'text-[#667085]'
              }`}
            >
              {trend}
            </span>
          )}
          {badge && (
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
