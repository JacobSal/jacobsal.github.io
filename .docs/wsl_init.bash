sudo apt update
sudo apt upgrade
sudo apt install python3-venv python3-pip
sudo apt-get install curl build-essential libssl-dev
sudo curl -LsSf https://astral.sh/uv/install.sh | sh
# curl -LsSf https://astral.sh/uv/install.sh | sh

#-- install nvm and pnpm for node version management and package management
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc

#-- restart terminal or:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

#-- install node and npm
nvm install --lts
npm install -g pnpm 

#-- to make orchestrator work, we need tmux
sudo apt install tmux

#-- reset packages
# sudo apt-get remove --purge nodejs npm
# sudo apt autoremove