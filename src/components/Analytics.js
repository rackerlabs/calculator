export default {
  trackEvent(
    eventCategory,
    eventAction,
    eventLabel,
    eventValue = 0,
    eventNonInteraction = 0
  ) {
    const dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "ga.event",
      eventCategory: eventCategory,
      eventAction: eventAction,
      eventLabel: eventLabel,
      eventValue: eventValue,
      eventNonInteraction: eventNonInteraction,
    });
  },
};
