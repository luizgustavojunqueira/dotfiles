return {
  "stevearc/dressing.nvim",

  -- this plugin improves de default vim.ui interfaces
  config = function()
    require("dressing").setup()
  end,
}
