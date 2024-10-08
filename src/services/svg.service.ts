const SVGS: Record<string, string> = {
  arrowDown: `<svg class="arrow-down" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4"  stroke-width="2" fill="none" fill-rule="evenodd"/></svg>`,

  arrowUp: `<svg class="arrow-up" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>`,

  hamburger: `<svg width="20" height="17" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z"/></g></svg>`,

  plus: `<svg class="plus" width="9" height="9" xmlns="http://www.w3.org/2000/svg"><text transform="translate(-24 -20)" fill="#F2F4FE" fill-rule="evenodd" font-family="Jost-Bold, Jost" font-size="14" font-weight="bold"><tspan x="23" y="27.5">+</tspan></text></svg>`,

  comments: `<svg width="18" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z" fill="#CDD2EE" fill-rule="nonzero"/></svg>`,
}

export const svgService = {
  getSvg: (iconName: string) => SVGS[iconName] || iconName,
}
