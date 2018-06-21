const { Builder, By, Capabilities, Key, logging, until } = require("selenium-webdriver");

(async () => {
  const logPrefs = new logging.Preferences();
  logPrefs.setLevel(logging.Type.PERFORMANCE, logging.Level.ALL);

  const desiredCapabilites = Capabilities.chrome();
  desiredCapabilites.setLoggingPrefs(logPrefs);

  const driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(desiredCapabilites)
    .build();

  try {
    await driver.get("http://www.google.com/ncr");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);

    const logs = await driver
      .manage()
      .logs()
      .get(logging.Type.PERFORMANCE);

    console.log(logs);
  } finally {
    await driver.quit();
  }
})();
