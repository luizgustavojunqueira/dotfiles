function fish_greeting
    echo (set_color brcyan --bold)Welcome back, (whoami)!
    echo The time is (set_color yellow --bold)(date +%T)(set_color brcyan --bold) and this machine is called $hostname
end
