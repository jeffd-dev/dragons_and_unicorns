'use strict';

const hostsInput =  document.querySelector("#hosts");

const defaultHosts = "*://gitlab.com/*";

hostsInput.value = defaultHosts;

function registerScript() {
  browser.runtime.sendMessage({
    hosts: hostsInput.value.split(",")
  });
}

document.querySelector("#register").addEventListener('click', registerScript);
