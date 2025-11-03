export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  //   icon?: keyof typeof Icons
  label?: string
  paid?: boolean
  event?: Event['name']
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[]
}
