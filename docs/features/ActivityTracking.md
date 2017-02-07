# Activity Tracking

Activity tracking is basically tracking user engagement with a web page over time in order to determine the total active time user spent on any web page. Active time is basically a subset of the total page visible time.

[CW Guide][CWGuide] | [API Doc][ColumboWebApis] | [Reports Doc][ColumboWebREPORTS] | [Dev Tools][ColumboWebDevTools] | [Plugins][ColumboWebPlugins] | [Technical Doc][ColumboWebTechnicalDoc] | [Roadmap][ColumboWebRoadmap] | [FAQs][ColumboWebFaqs] | [Demo][ColumboWebDemo] | [Glossary][Glossary]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Activity Tracking in ColumboWeb](#activity-tracking-in-columboweb)
  - [Enable Activity Tracker](#enable-activity-tracker)
  - [Disable Activity Tracker](#disable-activity-tracker)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

***

## Activity Tracking in ColumboWeb

Along with tracking page views, ColumboWeb's Activity Tracker can monitor whether a user continues to engage with the page over time, and record how much time user spent while being active on the page.

That is accomplished using `heartbeat` (`page ping`) events. Once, `Activity Tracking` is enabled, the web page is monitored to see if a user is engaging with it (e.g. is the tab in focus, does the mouse move over the page, does the user scroll etc.). If any of these things occur in a set period of time, a `heartbeat` (`page ping`) event fires, and and event is captured as user activity event. If there is no activity in the page (e.g. because the user is on a different tab in the browser), no `page ping` event will be fired during that time.

### Enable Activity Tracker

In order to enable activity tracking, `enableActivityTracking` tracking method can be invoked by passing the optional configuration containing `heartBeatDelay` (*in seconds*) to customize the time-interval for the page pings.

*Usage Example:*

```javascript
Columbo.push('enableActivityTracking', {
  heartBeatDelay: 20
});
```

Where `heartBeatDelay` is the number of seconds between each page ping (or heartbeat), once activity tracking is enabled. So, if you executed the above example, the page pings would occur every `20 seconds` as long as the user continued to browse the page actively. If `heartBeatDelay` is not set, the default `10 seconds` will be used as the ping interval.

*ColumboWeb considers the user being active if he/she performs any of the following activities/events:*

```javascript
touchstart click mouseup mousedown mousemove mousewheel scroll keypress keydown keydown resize blur focus
```

⚠️ **Important:** The `enableActivityTracking` method must be called before the `trackPageView` method to accurately measure the active time for the web page.

*Event Payload Example:*

```json
{
  "pageId": "/pages/activity.html",
  "telemetricsId": "/pages/activity.html",
  "telemetricsValue": "20",
  "timeStamp": "2016-11-18T20:55:12.008Z",
  "controlType": "page",
  "action": "userActive",
  "eventType": "heartBeatPing"
}
```

### Disable Activity Tracker

ColumboWeb also exposes a `disableActivityTracking` method as part of the `window.Columbo.tracker` object (Refer to [Tracker Methods to be used from inside a callback][TrackerMethodsInsideCallback] for infromation on how to use `window.Columbo.tracker` object). This can be used to temporarirly or permanantly disable the activity tracking, once it is enabled. It might be useful if you do not want to consider a user being active while he/she is performing certain events, e.g. while reading an article or while watching a video etc. If you want to re-enable the activity tracker, `enableActivityTracking` method needs to be invoked again.

*Usage Example:*

```javascript
Columbo.push('disableActivityTracking');
```

<!-- List of internal and external links-->

[CWGuide]: ../README.md
[ColumboWebApis]: ../api/APIDOC.md
[ColumboWebREPORTS]: ../REPORTS.md
[ColumboWebDevTools]: https://columboweb-dev-tools.usspk02.orchard.apple.com/
[ColumboWebPlugins]: ../plugin/PLUGINS.md
[ColumboWebTechnicalDoc]: ../INTERNAL.md
[ColumboWebRoadmap]: ../ROADMAP.md
[ColumboWebFaqs]: ../faq/FAQ.md
[Glossary]: ../GLOSSARY.md
[ColumboWebDemo]: https://columboweb.corp.apple.com/pages/index.html
[TrackerMethodsInsideCallback]: AdvancedUsage.md#tracker-methods-to-be-used-from-inside-a-callback
