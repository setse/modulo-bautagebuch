export interface SidebarNavItem {
  label: string;
  icon: string;
}

export interface SidebarRecentProject {
  id: string;
  name: string;
}

export interface SidebarUser {
  name: string;
  role?: string;
  initials?: string;
  color?: string;
}

/**
 * @startingPoint section="Navigation" subtitle="Full-height app sidebar with nav, recent projects, user footer" viewport="230x800"
 */
export interface SidebarProps {
  items?: SidebarNavItem[];
  active?: string;
  recentProjects?: SidebarRecentProject[];
  user?: SidebarUser;
  logoLabel?: string;
  logoSub?: string;
}
