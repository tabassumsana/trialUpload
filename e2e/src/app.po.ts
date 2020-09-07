import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('.container .genre-name')).getText() as Promise<string>;
  }

  getShowTileBlock(): ElementFinder {
    return element(by.css('.container .show-list .show-list-div'));
  }

  getShowDetailsTile(): Promise<string> {
    return element(by.css('.detail-container-div .detail-container .show-name')).getText() as Promise<string>;
  }

  getShowDetailBackButton(): ElementFinder {
    return element(by.css('.detail-container-div .back-icon'));
  }
}
