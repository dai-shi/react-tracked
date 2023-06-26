module.exports = {
  launch: {
    headless: process.env.HEADLESS === 'false' ? false : 'new',
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
  },
};
