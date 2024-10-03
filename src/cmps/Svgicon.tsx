import { svgService } from '../services/svg.service'

type SvgIconProps = {
  iconName: string
}
export function SvgIcon({ iconName }: SvgIconProps): JSX.Element {
  const svg = svgService.getSvg(iconName)
  return <i dangerouslySetInnerHTML={{ __html: svg }}></i>
}
