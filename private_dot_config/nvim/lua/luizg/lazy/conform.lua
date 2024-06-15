return {
	"stevearc/conform.nvim",
	config = function()
		require("conform").setup({
			formatters_by_ft = {
				lua = { "stylua" },
				-- Conform will run multiple formatters sequentially
				python = { "isort", "black" },
				-- Use a sub-list to run only the first available formatter
				javascript = { "prettierd" },
				cpp = { "ast-grep" },
				c = { "ast-grep" },
			},
			format_on_save = {
				timeout_ms = 500,
				lsp_fallback = true,
			},
		})

		require("conform").formatters.cpp = {
			function()
				return {
					command = "ast-grep",
					args = { "--indent-width", "4" },
					stdin = true,
				}
			end,
		}
	end,
}
