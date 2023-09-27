/* eslint-disable no-undef */
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Top Rated Movies'))).toBeVisible();
  });

  // TODO: scroll test

  it('should press movie card.', async () => {
    await element(by.id('movie-details-button')).tap();
  });
});
