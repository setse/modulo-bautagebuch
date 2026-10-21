export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Icon name to show on the left */
  icon?: string;
  type?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Width in px */
  width?: number;
  /** Keyboard shortcut hint displayed on right */
  shortcut?: string;
}
