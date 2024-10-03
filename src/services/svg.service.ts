const SVGS: Record<string, string> = {
  arrowDown: `<svg class="arrow-down" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4"  stroke-width="2" fill="none" fill-rule="evenodd"/></svg>`,

  hamburger: `<svg width="20" height="17" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z"/></g></svg>`,

  plus: `<svg class="plus" width="9" height="9" xmlns="http://www.w3.org/2000/svg"><text transform="translate(-24 -20)" fill="#F2F4FE" fill-rule="evenodd" font-family="Jost-Bold, Jost" font-size="14" font-weight="bold"><tspan x="23" y="27.5">+</tspan></text></svg>`,
}

export const svgService = {
  getSvg: (iconName: string) => SVGS[iconName] || iconName,
}
