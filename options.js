function saveOptions() {
  chrome.storage.sync.set({
    metaKey: document.getElementById("meta_key").value,
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    metaKey: 'Alt',
  }, function (items) {
    document.getElementById("meta_key").value = items.metaKey;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("meta_key").addEventListener("change", saveOptions);
document.getElementById("meta_key_label").textContent = chrome.i18n.getMessage("meta_key");
