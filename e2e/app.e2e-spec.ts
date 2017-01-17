import { NccwscProjectsPage } from './app.po';

describe('nccwsc-projects App', function() {
  let page: NccwscProjectsPage;

  beforeEach(() => {
    page = new NccwscProjectsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
