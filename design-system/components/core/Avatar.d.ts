export interface AvatarProps {
  /** Full name — used for title tooltip and auto-initials */
  name?: string;
  /** Override auto-initials (max 2 chars) */
  initials?: string;
  /** Background color (use team palette vars or hex) */
  color?: string;
  /** Diameter in px */
  size?: number;
  style?: React.CSSProperties;
}

export interface AvatarGroupMember {
  id?: string;
  name: string;
  initials?: string;
  color?: string;
}

export interface AvatarGroupProps {
  members: AvatarGroupMember[];
  size?: number;
  /** Max avatars before +N overflow */
  max?: number;
}
