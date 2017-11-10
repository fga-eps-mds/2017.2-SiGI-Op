module.exports = {
  'Primeiro teste' : function (browser) {
    browser
      .url('http://localhost:8080/')
      .waitForElementPresent('body', 1000)
      .waitForElementPresent('title', 1000)
      .end();
  }
};
