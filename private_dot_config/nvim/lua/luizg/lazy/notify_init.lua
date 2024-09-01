return {
  "rcarriga/nvim-notify",
  config = function()
    require("notify").setup({ fps = 60, render = "simple", stages = "slide", timeout = 1500, top_down = false, })
    vim.notify = require("notify")

    vim.notify("Notify loaded", "info", { title = "Notify" })
  end,
}
