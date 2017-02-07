# Advance Usage

This page covers the more advanced features of the ColumboWeb library.

[CW Guide][CWGuide] | [API Doc][ColumboWebApis] | [Reports Doc][ColumboWebREPORTS] | [Dev Tools][ColumboWebDevTools] | [Plugins][ColumboWebPlugins] | [Technical Doc][ColumboWebTechnicalDoc] | [Roadmap][ColumboWebRoadmap] | [FAQs][ColumboWebFaqs] | [Demo][ColumboWebDemo] | [Glossary][Glossary]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Callback](#callback)
- [Tracker Methods to be used from inside a callback](#tracker-methods-to-be-used-from-inside-a-callback)
  - [Get Tracker Authorization Status](#get-tracker-authorization-status)
  - [Get Tracker Initialization State](#get-tracker-initialization-state)
  - [Get Columbo Initialization Configuration](#get-columbo-initialization-configuration)
  - [Get Columbo State](#get-columbo-state)
  - [Get Tracker Environment](#get-tracker-environment)
  - [Get Browser Fingerprint](#get-browser-fingerprint)
  - [Get User Session Id](#get-user-session-id)
  - [Get Page Id for Current Page](#get-page-id-for-current-page)
  - [End User Session](#end-user-session)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

***

### Callback

If you call `ColumboWeb` [initialization][InitTracker] method (`init`) with a function as the last argument, the function will be executed once the `ColumboWeb` tracker is initialized, so that you can execute any code, you need to execute, on the successful initialization of the tracker.

*Usage Example:*

```javascript
Columbo.push('init', {}, function(){
    console.log('ColumboWeb initialized!');
});
```

ℹ️ **Note:** For `ColumboWeb` library to recognize the callback function, this function must be passed as the third argument (i.e. the last argument) to the `init` method.

### Tracker Methods to be used from inside a callback

`ColumboWeb` exposes a set of methods, as part of the `tracker` property of `window Columbo` object, to provide the various information about the `ColumboWeb tracker` state, configurations etc. These methods are explained below in details.

#### Get Tracker Authorization Status

To get the authorization status of the `ColumboWeb` tracker, `isTrackerAuthorized` method can be used inside the `callback` function provided to the `init` method. This method returns a `Boolean` value: `True` if the tracker is authorized, `False` if the tracker has failed to authorized your app.

*Usage example:*

```javascript
var columboWebCallBack = function() {
  Columbo.tracker.isTrackerAuthorized();
};

Columbo.push('init', {}, columboWebCallBack);
```

#### Get Tracker Initialization State

To check whether the `ColumboWeb` tracker is initialized, `isTrackerInitialized` method can be used inside the `callback` function. This method returns a `Boolean` value: `True` if the tracker is `initialized`, `False` if the tracker has failed to initialize.

*Usage example:*

```javascript
var columboWebCallBack = function() {
  Columbo.tracker.isTrackerInitialized();
};

Columbo.push('init', {}, columboWebCallBack);
```

#### Get Columbo Initialization Configuration

While initializing `ColumboWeb`, a configuration object is passed to customize tracker configuration with the `init` method. Once, tracker is initialized, `getColumboInitConfig` method can be used to get this configuration object inside the `callback` function provided. This method returns an `object` containing the user configuration passed during initialization.

*Usage example:*

```javascript
var columboWebCallBack = function() {
  Columbo.tracker.getColumboInitConfig();
};

Columbo.push('init', {}, columboWebCallBack);
```

#### Get Columbo State

To get the `ColumboWeb` tracker state object, `getColumboState` method can be used inside the `callback` function. This method returns an `Object` containing the `ColumboWeb State` information such as: `eventsQueue`, `bufferFlushers`, `expireDateTime`, `hasLoaded` Flag and `registeredOnLoadHandlers`.

*Usage example:*

```javascript
var columboWebCallBack = function() {
  Columbo.tracker.getColumboState();
};

Columbo.push('init', {}, columboWebCallBack);
```

The returned object properties for `ColumboWeb State` object provide following information:

| Name                       | Type    | Description |
| :-------------------------- |:-------| :-----------|
| `eventsQueue`              | Array   | List of events captured and queued by `ColumboWeb` |
| `bufferFlushers`           | Array   | List of flusher items to be executed by `ColumboWeb` when page tries to `unload` |
| `expireDateTime`           | String  | Events queue expiry time, used inside buffer flushers to flush out any events remaining in queue during page `unload` |
| `hasLoaded`                | Boolean | Indicates whether `ColumboWeb` has loaded or still initializing |
| `registeredOnLoadHandlers` | Array   | List of items to be executed by `ColumboWeb` on page `onload` event |

#### Get Tracker Environment

To check whether the `ColumboWeb` tracker is loaded with `dev` environment flag, `isDevEnvironment` method can be used inside the `callback` function. This method returns a `Boolean` value: `True` if tracker is configured to be loaded in `dev` environment, else `False`. When `ColumboWeb` is loaded with `dev` environment config, all the events will be captured but no AJAX calls will be fired to either authorize tracker or post events APIs.

*Usage example:*

```javascript
var columboWebCallBack = function() {
  Columbo.tracker.isDevEnvironment();
};

Columbo.push('init', {}, columboWebCallBack);
```

#### Get Browser Fingerprint

To get the user `fingerprint` generated by the `ColumboWeb` tracker, `getUserFingerprint` method can be used inside the `callback` function. This method returns a `String` value of the uniquely generated user `fingerprint`.

*Usage example:*

```javascript
var columboWebCallBack = function() {
  Columbo.tracker.getUserFingerprint();
};

Columbo.push('init', {}, columboWebCallBack);
```

#### Get User Session Id

To get the user's `session id` configured by the `ColumboWeb` tracker, `getSessionId` method can be used inside the `callback` function. This method returns a `String` value of the generated user's `sessionId` used by `ColumboWeb` to categorized events based on user session.

*Usage example:*

```javascript
var columboWebCallBack = function() {
  Columbo.tracker.getSessionId();
};

Columbo.push('init', {}, columboWebCallBack);
```

#### Get Page Id for Current Page

To get the unique `pageId` generated by the `ColumboWeb` tracker for the current page of your website, `getPageId` method can be used inside the `callback` function. This method returns a `String` value of the `pageId` for the currently visited page to uniquely identify the current page.

*Usage example:*

```javascript
var columboWebCallBack = function() {
  Columbo.tracker.getPageId();
};

Columbo.push('init', {}, columboWebCallBack);
```

#### End User Session

As part of the [Session Tracking][SessionTracking], user session is set to group all the events to a particular session, which is set to expire as per the `sessionTimeout` configured in the user configuration (See [Configuring the session cookie duration][ConfigureSessionCookieDuration] for details).

If you wish to end the user session once `Logout` action is performed, `endSession` method can be called, which is exposed as part of `Columbo.tracker`. Once this method is called, an event will also be logged to capture the session end.

⚠️ **Important:** Once, the `endSession` method is called, any event occurring after that, will be **ignored** by the tracker until the page is reloaded or a new session is started.

*Method Signature:*

```javascript
Columbo.tracker.endSession();
```

*Usage example:*


```html
<button id="logout-btn" onclick="logoutUser()" type="button">Logout</button>
```

```javascript
<script type="text/javascript">
  function logoutUser() {
    Columbo.tracker.endSession();
    window.location.href = '/loggedout.html';
  }
</script>
```

*Event Payload example:*

```json
{
  "pageId": "/pages/index.html",
  "telemetricsId": "endSession",
  "timeStamp": "2016-11-17T23:53:46.891Z",
  "controlType": "session",
  "action": "ended",
  "eventType": "endSession"
}
```

ℹ️ **Note:** Once a user session is ended, all the events in the `ColumboWeb` eventsQueue will be sent to the `events` API along with the `endSession` event captured for the session end.


<!-- List of internal and external links-->

[InitTracker]: ../guide/INITIALIZATION.md
[SessionTracking]: SessionTracking.md#session-tracking-in-columboweb
[ConfigureSessionCookieDuration]: ../guide/CONFIGURATION.md#configuring-the-session-cookie-duration
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
