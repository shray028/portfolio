# Shray Vijay — AI/ML portfolio

Static portfolio published at [shray028.github.io/portfolio](https://shray028.github.io/portfolio/). Project cards and case studies are defined in `app.js`; their images live under `Projects/`.

## Career page

[Career](https://shray028.github.io/portfolio/#career) is a top-level tab next to Projects and Interactive Labs: an experience timeline, engineering principles, an architecture diagram of the production RAG system with metric cards for each part, a toolbox and awards. It is plain HTML in the `#career-section` block of `index.html`, styled by the `CAREER` block in `styles.css` and routed by `handleRoute()` in `app.js`.

## ML Revision hub

[ML Revision](https://shray028.github.io/portfolio/#subjects/mlrevision) collects the most frequently asked machine-learning interview questions — classic ML, deep learning, transformers and LLMs, RAG, agents, ML system design and recommender systems — as 14 interactive modules with 190 model answers (60 marked must-know). Each concept has a lab that makes the answer visible: a bias–variance decomposer, threshold/ROC/PR explorers, an optimizer race, attention and KV-cache tools, a chunking playground, hybrid search with RRF, RAG evaluation and production-debugging scenarios, an A/B sample-size calculator, matrix factorisation and a bandit simulator. Pages live in `Subject_6_MLRevision/interactive/` and share `mr-lab.css`, `mr-lab.js` and `mr-qa.js`.

## PyTorch learning hub

[PyTorch for Deep Learning](https://shray028.github.io/portfolio/#subjects/pytorch) is an interactive subject under *Interactive labs*: 15 modules (tensors, autograd, the training loop, `nn.Module`, losses and optimizers, `Dataset`/`DataLoader`, GPU training, dropout/BatchNorm/weight decay, Optuna, CNNs, transfer learning, RNNs, LSTMs, production essentials) with theory, copyable code, in-browser labs and a 116-question Q&A bank with must-know questions starred. The pages live in `Subject_4_PyTorch/interactive/` and share `pt-lab.css`, `pt-lab.js` and `pt-qa.js` (the single source for every question). Modules 01–13 follow the arc of CampusX's [Practical Deep Learning using PyTorch](https://www.youtube.com/playlist?list=PLKnIA16_Rmvboy8bmDCjwNHgTaYH2puK7) playlist.

## FastAPI learning hub

[FastAPI for Machine Learning](https://shray028.github.io/portfolio/#subjects/fastapi) is an interactive subject under *Interactive labs*: 15 modules (APIs and HTTP, the FastAPI stack and ASGI, the request lifecycle, path and query parameters, Pydantic, CRUD, serving an ML model, production patterns, Docker and AWS EC2, `async def` vs `def`, dependencies and lifespan, middleware/CORS/testing/auth, a bug hunt and a revision module) with theory, copyable code, in-browser simulators, a cheat sheet, a practice plan and an 81-question Q&A bank with must-know questions starred. The pages live in `Subject_5_FastAPI/interactive/` and share `fa-lab.css`, `fa-lab.js` and `fa-qa.js`. Modules 01–10 follow CampusX's *FastAPI for Machine Learning* playlist; 11–13 cover common interview topics beyond it.

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
