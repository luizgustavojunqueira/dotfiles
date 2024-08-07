return {
  "stevearc/conform.nvim",
  config = function()
    require("conform").setup({
      formatters_by_ft = {
        lua = { "stylua" },
        -- Conform will run multiple formatters sequentially
        python = { "isort", "black", "ast-grep" },
        -- Use a sub-list to run only the first available formatter
        javascript = { "prettierd" },
        json = { "prettierd" },
        javascriptreact = { "prettierd" },
        typescriptreact = { "prettierd" },
        typescript = { "prettierd" },
        markdown = { "prettierd" },
        yaml = { "prettierd" },
        cpp = { "ast-grep" },
        c = { "ast-grep" },
        arduino = { "ast-grep" },
        go = { "ast-grep" },
        html = { "prettierd" },
        css = { "prettierd" },
      },
      format_on_save = {
        timeout_ms = 500,
        lsp_format = "last",
      },
      log_level = vim.log.levels.ERROR,
      -- Conform will notify you when a formatter errors
      notify_on_error = true,
    })

    require("conform").formatters.prettier = {
      prepend_args = { "--tab-width", "4" },
    }
  end,
}
