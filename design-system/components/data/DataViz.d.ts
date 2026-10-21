export interface DonutProps {
  /** Fraction 0–1 */
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  /** Center content */
  children?: React.ReactNode;
}

export interface SollIstBarProps {
  ist: number;
  soll: number;
  /** Width in px */
  w?: number;
  /** Height in px */
  h?: number;
}

export interface SparklineProps {
  data: number[];
  w?: number;
  h?: number;
  stroke?: string;
  strokeWidth?: number;
}

export interface MonthBarsDatum {
  m: string;
  ist: number;
  plan: number;
  future?: boolean;
}

export interface MonthBarsProps {
  data: MonthBarsDatum[];
  w?: number;
  h?: number;
  accent?: string;
}

export interface KpiCardProps {
  eyebrow: string;
  value: string;
  sub?: string;
  delta?: string;
  deltaUp?: boolean;
  style?: React.CSSProperties;
}
