import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import config from '@/config';

class Telemetry {
  constructor() {
    this.appInsights = null;
  }

  init() {
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString: config.azure.insights.connectionString,
        enableAutoRouteTracking: true, // Automatically track route changes in single-page application.
        disableAjaxTracking: true,
      },
    });

    try {
      this.appInsights.loadAppInsights();
    } catch (error) {
      console.log(error);
    }
  }

  trackPageView({ name }) {
    this.appInsights.trackPageView({ name });
  }
}

export default new Telemetry();
