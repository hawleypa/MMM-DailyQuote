Module.register("MMM-DailyQuote", {

  defaults: {
    exampleContent: "Quote of the Day"
  },

  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["daily-quote.css"]
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() {
    this.templateContent = this.config.exampleContent

    // set timeout for next random text
    setInterval(() => this.updateQuote(), 3000)
  },

  /**
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
  socketNotificationReceived: function (notification, payload) {
    if (notification === "RECEIVED_QUOTE") {
      this.templateContent = '<script type="text/javascript" src="https://www.brainyquote.com/link/quotebr.js"></script>'
      this.templateContent = this.templateContent + '<br><small><i><a href="/quote_of_the_day" target="_blank" rel="nofollow">more Quotes</a></i></small>'
      this.updateDom()
    }
  },

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.id = 'content' 
    this.templateContent = '<script type="text/javascript" src="https://www.brainyquote.com/link/quotebr.js"></script>'
    this.templateContent = this.templateContent + '<br><small><i><a href="/quote_of_the_day" target="_blank" rel="nofollow">more Quotes</a></i></small>'
    wrapper.innerHTML = '${this.templateContent}'
    return wrapper
  },

  updateQuote() {
    this.sendSocketNotification("GET_QUOTE", { amountCharacters: 5 })
  },

  /**
   * This is the place to receive notifications from other modules or the system.
   *
   * @param {string} notification The notification ID, it is preferred that it prefixes your module name
   * @param {number} payload the payload type.
   */
  notificationReceived(notification, payload) {
    if (notification === "RECEIVED_QUOTE") {
      this.templateContent = '<script type="text/javascript" src="https://www.brainyquote.com/link/quotebr.js"></script>'
      this.templateContent = this.templateContent + '<br><small><i><a href="/quote_of_the_day" target="_blank" rel="nofollow">more Quotes</a></i></small>'
      this.updateDom()
    }
  }
})
