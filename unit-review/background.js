'use strict';

var registered = null;

async function registerScript(message) {

  let hosts = message.hosts;

  if (registered) {
    registered.unregister();
  }

  registered = await browser.contentScripts.register({
    "js": [{file: "/content_scripts/gitlab.js"}],
    "matches": ["<all_urls>"],
    "allFrames": true,
    "runAt": "document_idle"
  });

}

browser.runtime.onMessage.addListener(registerScript);
