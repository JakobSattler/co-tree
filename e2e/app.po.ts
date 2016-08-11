export class CoTreePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('co-root h1')).getText();
  }
}
