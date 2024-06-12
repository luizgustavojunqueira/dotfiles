local lsp_zero = require("lsp-zero")
require("lspconfig").intelephense.setup({})

lsp_zero.on_attach(function(client, bufnr)
	lsp_zero.default_keymaps({ buffer = bufnr })
end)

require("mason").setup({})
require("mason-lspconfig").setup({
	ensure_installed = {},
	handlers = {
		function(server_name)
			require("lspconfig")[server_name].setup({})
		end,
	},
})
