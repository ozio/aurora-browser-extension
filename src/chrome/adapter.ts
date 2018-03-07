import Extension from '../extension';

/* Extension API documentation: https://developer.chrome.com/extensions */

class ChromeExtension extends Extension {
  constructor() {
    super();

    const updateFocusHandler = async () => {
      await this.updateFocus();
      if (this.isBrowserFocused) {
        this.updateCurrentURL(true);
      }
    };

    const updateUrlHandler = () => {
      this.updateCurrentURL();
    };

    chrome.windows.onFocusChanged.addListener(updateFocusHandler);
    chrome.tabs.onCreated.addListener(updateUrlHandler);
    chrome.tabs.onUpdated.addListener(updateUrlHandler);
    chrome.tabs.onMoved.addListener(updateUrlHandler);
    chrome.tabs.onActivated.addListener(updateUrlHandler);
    chrome.tabs.onHighlighted.addListener(updateUrlHandler);
    chrome.tabs.onDetached.addListener(updateUrlHandler);
    chrome.tabs.onAttached.addListener(updateUrlHandler);
    chrome.tabs.onRemoved.addListener(updateUrlHandler);
    chrome.tabs.onReplaced.addListener(updateUrlHandler);
  }

  getCurrentURL(): Promise<string> {
    return new Promise((resolve) => {
      chrome.tabs.query(
        {
          active: true,
          windowId: chrome.windows.WINDOW_ID_CURRENT,
        },
        (tabs) => {
          let url;

          if (tabs[0] && tabs[0].url) {
            url = tabs[0].url;
          } else {
            url = null;
          }

          resolve(url);
        }
      );
    });
  }

  getFocused(): Promise<boolean> {
    return new Promise((resolve) => {
      chrome.windows.getCurrent(null, (window) => {
        const focusedNow = window && window.focused;
        resolve(focusedNow);
      });
    });
  }
}

export default ChromeExtension;
