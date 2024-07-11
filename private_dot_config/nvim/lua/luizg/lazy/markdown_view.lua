return {
  "OXY2DEV/markview.nvim",

  dependencies = {
    -- You may not need this if you don't lazy load
    -- Or if the parsers are in your $RUNTIMEPATH
    "nvim-treesitter/nvim-treesitter",

    "nvim-tree/nvim-web-devicons",
  },

  config = function()
    require("markview").setup({
      buf_ignore = { "nofile" },
      modes = { "n" },

      -- Returns the conceallevel to the global value when changing modes
      restore_conceallevel = true,
      -- Returns the concealcursor to the global value when changing modes
      restore_concealcursor = false,

      headings = {},
      code_blocks = {},
      block_quotes = {},
      horizontal_rules = {},
      hyperlinks = {},
      images = {},
      inline_codes = {},
      list_items = {},
      checkboxes = {},
      tables = {},
    })
  end,
}
