import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsightsKey = process.env.REACT_APP_INSIGHTS_INSTRUMENTATION_KEY;

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: appInsightsKey,
    extensions: [reactPlugin],
    //extensionConfig: {
    //  [reactPlugin.identifier]: { history: history }
    //}
  }
});

appInsights.loadAppInsights();

export { reactPlugin, appInsights };
