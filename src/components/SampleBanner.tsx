import { SAMPLE_DISCLAIMER } from '../data/sampleTrip'

type Props = {
  compact?: boolean
}

export function SampleBanner({ compact }: Props) {
  return (
    <aside
      className={compact ? 'sample-banner sample-banner--compact' : 'sample-banner'}
      role="note"
    >
      <span className="sample-banner__tag">예시</span>
      <span className="sample-banner__text">{SAMPLE_DISCLAIMER}</span>
    </aside>
  )
}
