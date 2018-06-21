const path = require("path");

module.exports = {
  name() {
    return path.basename(__dirname);
  },

  open(context, options) {
    // when sitespeed.io start it calls the open function once for all plugins
    // the context holds information for this specific run that
    // generated at runtime, for example you can get hold of the storageManager
    // that stores files to disk.
    // The options is the configuration supplied for the run.
  },
  processMessage(message, queue) {
    // The plugin will get all messages sent through the queue
    // and can act on specific messages by type:
    // message.type
    if (message.type !== "browsertime.run") {
      return;
    }

    console.log(message.data.timings.userTimings);
  },
  close(options, errors) {
    // When all URLs are finished all plugins close function is called once.
    // Options are the configuration options and errors a array of errors
    // from the run.
  }
};
