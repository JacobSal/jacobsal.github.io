git submodule add https://github.com/primeline-ai/quantum-lens.git ./submodules/quantum-lens
git submodule add https://github.com/primeline-ai/primeline-skills.git ./submodules/primeline-skills
git submodule add https://github.com/primeline-ai/claude-adaptive-research.git ./submodules/claude-adaptive-research
git submodule add https://github.com/primeline-ai/universal-planning-framework.git ./submodules/universal-planning-framework
git submodule add https://github.com/primeline-ai/claude-tmux-orchestration.git ./submodules/claude-tmux-orchestration
git submodule add https://github.com/primeline-ai/evolving-lite.git ./submodules/evolving-lite

# copies
cp -R ./submodules/quantum-lens/.claude/scenarios/quantum-lens ./.claude/
cp -r ./submodules/universal-planning-framework/.claude/* ./.claude/
cp -r ./submodules/claude-tmux-orchestration/_orchestrator/ ./


# installs
uv pip install -e ./submodules/mcp-latex-server
