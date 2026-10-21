export interface BadgeProps {
  children: React.ReactNode;
  tone?: 'default' | 'accent' | 'pos' | 'neg' | 'warn' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  /** Show a small colored dot before the label */
  dot?: boolean;
  style?: React.CSSProperties;
}

export interface StatusBadgeProps {
  /** Project status string: 'aktiv' | 'abschluss' | 'akquise' | 'pause' | 'risiko' */
  status: string;
}
