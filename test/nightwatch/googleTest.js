module.exports = {
  'Login' : function (browser) {
    browser
      .url('localhost:8080')
      .waitForElementVisible('input[name=user-login]', 100000)
	  .setValue('input[name=user-login]', 'admin')
	  .setValue('input[name=user-password]', 'abc123456')
	  .assert.elementPresent('button[name=logout-button]')
	  .click('button[name=logout-button]')
	  .pause(1000)
      .end();
  },
}
