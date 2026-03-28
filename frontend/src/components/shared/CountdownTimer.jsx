import React from 'react'
import { useCountdown } from '../../hooks/useCountdown'

function Pad(n) {
  return String(n).padStart(2, '0')
}

export default function CountdownTimer({ targetDate }) {
  const { days, hours, minutes, seconds, passed } = useCountdown(targetDate)

  if (passed) {
    return (
      <p className="countdown-timer__passed">
        The celebration has begun! ✿
      </p>
    )
  }

  const units = [
    { label: 'DAYS',    value: days    },
    { label: 'HOURS',   value: hours   },
    { label: 'MINUTES', value: minutes },
    { label: 'SECONDS', value: seconds },
  ]

  return (
    <div className="countdown-timer">
      {units.map(({ label, value }) => (
        <div key={label} className="countdown-timer__card">
          <span className="countdown-timer__value">{Pad(value)}</span>
          <span className="countdown-timer__label">{label}</span>
        </div>
      ))}
    </div>
  )
}
