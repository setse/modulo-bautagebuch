export interface ButtonProps {
  /** Button label */
  children: React.ReactNode;
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Left icon name (from Icon vocabulary) */
  icon?: string;
  /** Right icon name (from Icon vocabulary) */
  iconRight?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
