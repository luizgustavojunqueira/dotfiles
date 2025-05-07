if status is-interactive
    if not echo $TMUX | grep tmux-1000 -q
        tmuxinator start Default
    end
end

# Set the shell theme
theme.sh gruvbox-dark

# Activate things
zoxide init --cmd cd fish | source
atuin init fish | source
~/.local/bin/mise activate fish | source


# Aliases
alias cat="bat"
alias v="nvim"
alias vim="nvim"
alias vi="nvim"
alias n="nvim"
alias e="nvim ."
alias nvm="nvim" 

alias lzd="lazydocker"
alias lzg="lazygit"

alias arbo="tmuxinator start ArboMais"
alias blog="tmuxinator start Blog"
