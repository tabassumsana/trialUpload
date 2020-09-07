import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display genre name', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Popular in Drama');
  });

  it('should display show tile name', () => {
    page.navigateTo();  
    expect(page.getShowTileBlock().getText()).toEqual('Under the Dome');
  });

  it('should display show tile in details page', () => {
    page.navigateTo();  
    page.getShowTileBlock().click();
    expect(page.getShowDetailsTile()).toEqual('Under the Dome');
  });

  it('should display show tile in details page', () => {
    page.navigateTo();  
    page.getShowTileBlock().click();
    page.getShowDetailBackButton().click();
    expect(page.getTitleText()).toEqual('Popular in Drama');
    expect(page.getShowTileBlock().getText()).toEqual('Under the Dome');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
