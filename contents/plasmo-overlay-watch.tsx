import type {
  PlasmoCSConfig,
  PlasmoGetOverlayAnchor,
  PlasmoWatchOverlayAnchor
} from "plasmo"
import DatePicker from "antd/es/date-picker"
export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (
  updatePosition
) => {
  const interval = setInterval(() => {
    updatePosition()
  }, 420)

  return () => clearInterval(interval)
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector(`header > div > a[href="/"]`)

const PlasmoPricingExtra = () => (
  <span
    style={{
      borderRadius: 4,
      background: "violet",
      padding: 4,
      position: "absolute",
      top: 44
    }}>
    CSUI OVERLAY WATCH ANCHOR11
    <DatePicker placeholder="select date" />
  </span>
)

export default PlasmoPricingExtra
