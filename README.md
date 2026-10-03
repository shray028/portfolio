# Shray Vijay — AI/ML portfolio

Static portfolio published at [shray028.github.io/portfolio](https://shray028.github.io/portfolio/). Project cards and case studies are defined in `app.js`; their images live under `Projects/`.

## Featured reinforcement learning and NLP case studies

| Project | What the case study covers | Code |
| --- | --- | --- |
| [Autonomous Drone Rescue](https://shray028.github.io/portfolio/#projects/drone-rescue-dp) | A battery-aware, wind-affected 5×5 rescue MDP, value iteration, policy visualization, and state-space scaling. | [Runnable planner](https://github.com/shray028/autonomous-drone-rescue) |
| [Multi-Armed Bandit Lab](https://shray028.github.io/portfolio/#projects/multi-armed-bandit) | Exploration strategies in a synthetic allocation study, plus a repeated Gaussian-bandit experiment. | [Gaussian experiment](https://github.com/shray028/applied-ai-systems/tree/main/multi_armed_bandits) |
| [Robust LunarLander](https://shray028.github.io/portfolio/#projects/robust-lunarlander-rl) | DQN and Double DQN under stochastic thruster failures, with reward and landing-rate analysis. | [Training demo](https://github.com/shray028/applied-ai-systems/tree/main/robust_lunarlander) |
| [Transformer News Summarization](https://shray028.github.io/portfolio/#projects/transformer-news-summarization) | Pretrained T5, BART, and PEGASUS inference and evaluation on held-out DailyMail articles. | [Inference CLI](https://github.com/shray028/transformer-news-summarization) |

The full studies were collaborative. The linked code repositories are compact, runnable companion implementations; the portfolio pages distinguish their scope from the larger evaluations. Project images are explanatory illustrations, with descriptive alternative text in `app.js`.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` to preview the site.
