const NodeHelper = require("node_helper")

module.exports = NodeHelper.create({

  async socketNotificationReceived(notification, payload) {
    if (notification === "GET_QUOTE") {
      const amountCharacters = payload.amountCharacters || 10
      const randomText = Array.from({ length: amountCharacters }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join("")
      this.sendSocketNotification("RECEIVED_QUOTE", { text: randomText })
    }
  },
})
