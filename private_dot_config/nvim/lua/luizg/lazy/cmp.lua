return {
	"hrsh7th/nvim-cmp",
	"hrsh7th/cmp-path",
	"hrsh7th/cmp-buffer",

	config = function()
		require("cmp")

		cmp.setup({
			snippet = {
				expand = function(args)
					vim.fn["vsnip#anonymous"](args.body)
				end,
			},
			mapping = {
				["<C-d>"] = cmp.mapping(cmp.mapping.scroll_docs(-4), { "i", "c" }),
				["<C-f>"] = cmp.mapping(cmp.mapping.scroll_docs(4), { "i", "c" }),
				["<Down>"] = cmp.mapping(
					cmp.mapping.select_next_item({ behavior = cmp.SelectBehavior.Select }),
					{ "i", "c" }
				),
				["<Up>"] = cmp.mapping(
					cmp.mapping.select_prev_item({ behavior = cmp.SelectBehavior.Select }),
					{ "i", "c" }
				),
				["<C-Space>"] = cmp.mapping(cmp.mapping.complete(), { "i", "c" }),
				["<C-y>"] = cmp.config.disable, -- Specify `cmp.config.disable` if you want to remove the default `<C-y>` mapping.
				["<C-e>"] = cmp.mapping({
					i = cmp.mapping.abort(),
					c = cmp.mapping.close(),
				}),
				["<CR>"] = cmp.mapping(
					cmp.mapping.confirm({
						behavior = cmp.ConfirmBehavior.Replace,
						select = true,
					}),
					{ "i", "c" }
				),
			},
			sources = {
				{ name = "nvim_lsp" },
				{ name = "buffer" },
				{ name = "path" },
			},
		})
	end,
}
