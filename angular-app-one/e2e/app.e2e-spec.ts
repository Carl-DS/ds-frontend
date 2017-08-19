import { AngularAppOnePage } from './app.po';

describe('angular-app-one App', () => {
  let page: AngularAppOnePage;

  beforeEach(() => {
    page = new AngularAppOnePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
