export interface CardProps {
  children: React.ReactNode;
  /** Inner padding in px */
  padding?: number;
  /** Optional header with title + optional subtitle */
  header?: { title: string; subtitle?: string };
  /** Element rendered in the header's trailing slot */
  headerAction?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface EyebrowProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
