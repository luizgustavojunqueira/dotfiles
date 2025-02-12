# Personal Dotfiles

This repository contains my personal dotfiles. It is a work in progress and will be updated as I continue to refine my setup.

## Installation

This repository is managed using chezmoi. To install these dotfiles, run the followings commands:

```bash
chezmoi init chezmoi init https://github.com/luizgustavojunqueira/dotfiles.git
```

To check what would be applied:

```bash
chezmoi diff
```

To apply the changes:

```bash
chezmoi apply -v
```

To update the repository:

```bash
chezmoi update -v
```

Or, if you don't want to use chezmoi, you can clone this repository and manually copy the files to your home directory.
