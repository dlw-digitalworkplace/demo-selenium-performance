module.exports = {
  run(context) {
    const { Builder, By, Capabilities, Key, logging, until } = context.webdriver;

    return context.runWithDriver(async driver => {
      // open page
      await driver.get("https://<TENANT>.sharepoint.com");

      console.log("Press any key to continue.");
      process.stdin.setRawMode(true);
      process.stdin.resume();
      await new Promise(resolve => {
        process.stdin.on("data", () => resolve());
      });

      await driver.wait(until.elementLocated(By.id("SuiteNavPlaceHolder")));
    });
  }
};
