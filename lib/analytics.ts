type AnalyticsEvent =
  | "project_cta_click"
  | "whatsapp_click"
  | "quote_started"
  | "quote_submitted"
  | "project_view"
  | "service_view"
  | "scale_interaction"
  | "3d_viewer_interact";

export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  // Google Analytics 4 hook
  if (typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", eventName, properties);
  }

  // Meta Pixel hook
  if (typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === "function") {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("trackCustom", eventName, properties);
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug(`[Analytics Event] ${eventName}:`, properties);
  }
}
