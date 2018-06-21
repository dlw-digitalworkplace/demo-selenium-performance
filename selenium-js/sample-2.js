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
    await driver.get("https://<TENANT>.sharepoint.com");

    console.log("Press any key to continue.");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    await new Promise(resolve => {
      process.stdin.on("data", () => resolve());
    });

    const logs = await driver
      .manage()
      .logs()
      .get(logging.Type.PERFORMANCE);

    console.log(logs);
  } finally {
    await driver.quit();
  }
})();
