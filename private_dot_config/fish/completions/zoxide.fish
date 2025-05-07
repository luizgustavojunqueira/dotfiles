function __my_zoxide_z_complete
    set -l tokens (commandline --current-process --tokenize)
    set -l curr_tokens (commandline --cut-at-cursor --current-process --tokenize)

    if test (count $tokens) -le 2 -a (count $curr_tokens) -eq 1
        set -l query $tokens[2..-1]
        zoxide query --exclude (__zoxide_pwd) --list -- $query
    else
        __zoxide_z_complete
    end
end
complete --erase --command __zoxide_z
complete --command __zoxide_z --no-files --arguments '(__my_zoxide_z_complete)'
