import Extension from '../extension';

class EdgeExtension extends Extension {
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

    browser.windows.onFocusChanged.addListener(updateFocusHandler);
    browser.tabs.onActivated.addListener(updateUrlHandler);
    browser.tabs.onAttached.addListener(updateUrlHandler);
    browser.tabs.onCreated.addListener(updateUrlHandler);
    browser.tabs.onDetached.addListener(updateUrlHandler);
    browser.tabs.onHighlighted.addListener(updateUrlHandler);
    browser.tabs.onMoved.addListener(updateUrlHandler);
    browser.tabs.onRemoved.addListener(updateUrlHandler);
    browser.tabs.onReplaced.addListener(updateUrlHandler);
    browser.tabs.onUpdated.addListener(updateUrlHandler);
  }

  getCurrentURL(): Promise<string> {
    return new Promise((resolve) => {
      browser.tabs.query({
        active: true,
        windowId: browser.windows.WINDOW_ID_CURRENT,
      })
        .then((tabs) => {
          let url;

          if (tabs[0] && tabs[0].url) {
            url = tabs[0].url;
          } else {
            url = null;
          }

          resolve(url);
        })
      ;
    });
  }

  getFocused(): Promise<boolean> {
    return new Promise((resolve) => {
      browser.windows.getCurrent(null)
        .then((window) => {
          const focusedNow = window && window.focused;
          resolve(focusedNow);
        })
      ;
    });
  }
}

export default EdgeExtension;
