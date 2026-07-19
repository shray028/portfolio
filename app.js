/* ============================================================
   Portfolio — App Logic
   Subject navigation, concept groups, iframe + theory overlays
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     DATA — MFML Concept Groups & Topics
     All groups use the subject-level accent (lavender)
     ---------------------------------------------------------- */
  const MFML_CONCEPTS = [
    {
      id: 'linear-algebra',
      title: 'Linear Algebra',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
      topics: [
        {
          title: 'Linear Systems & Matrix Operations',
          notes: 'A linear system is Ax = b. It is consistent when b lies in the column space of A. Row reduction reveals whether there are no solutions, one solution, or infinitely many. Matrix multiplication composes linear maps: order matters (AB \u2260 BA in general).',
          formulas: [
            '\\(\\mathbf{x} = A^{-1}\\mathbf{b}\\)',
            '\\(\\mathbf{z} = (AB)\\mathbf{x}\\)',
          ],
          interactive: { file: 'lecture-01-matrix-composition.html', label: 'Matrix Composition' },
          tags: ['Three.js', 'MathJax'],
        },
        {
          title: 'Vector Spaces, Basis, Rank & Subspaces',
          notes: 'A vector space is closed under addition and scalar multiplication. A basis is a linearly independent spanning set; its size is the dimension. The four fundamental subspaces are Col(A), Null(A), Row(A), and Null(A\u1d40).',
          formulas: [
            '\\(\\operatorname{rank}(A) + \\operatorname{nullity}(A) = n\\)',
          ],
          interactive: { file: 'lecture-02-four-fundamental-subspaces.html', label: 'Four Fundamental Subspaces' },
          tags: ['Subspaces', 'MathJax'],
        },
        {
          title: 'Norms, Inner Products & Orthogonality',
          notes: 'Distance is \u2016x \u2212 y\u2016. The inner product gives the angle between vectors; orthogonality means x\u1d40y = 0. Projection of x onto u scales u by the component of x along u.',
          formulas: [
            '\\(\\|\\mathbf{x}\\|_2 = \\sqrt{\\mathbf{x}^T\\mathbf{x}}\\)',
            '\\(\\cos\\theta = \\frac{\\mathbf{x}^T\\mathbf{y}}{\\|\\mathbf{x}\\|\\,\\|\\mathbf{y}\\|}\\)',
            '\\(\\operatorname{proj}_{\\mathbf{u}}\\mathbf{x} = \\frac{\\mathbf{x}^T\\mathbf{u}}{\\mathbf{u}^T\\mathbf{u}}\\,\\mathbf{u}\\)',
          ],
          interactive: { file: 'lecture-03-linear-transformations.html', label: 'Linear Transformations' },
          tags: ['Three.js', 'Geometry'],
        },
        {
          title: 'Determinants, Eigenvalues & PD Matrices',
          notes: 'det(A) is the signed volume-scaling factor; A is invertible iff det(A) \u2260 0. Trace equals the sum of eigenvalues; determinant equals their product. A symmetric matrix is positive definite when x\u1d40Ax > 0 for all nonzero x.',
          formulas: [
            '\\(A\\mathbf{v} = \\lambda\\mathbf{v}\\)',
            '\\(\\operatorname{tr}(A) = \\sum_i \\lambda_i\\)',
            '\\(A = LL^T\\) (Cholesky)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Matrix Decompositions & Approximation',
          notes: 'Eigen-decomposition: A = Q\u039bQ\u207b\u00b9. SVD: A = U\u03a3V\u1d40 decomposes into orthogonal input-output directions. The best rank-k approximation minimises Frobenius error (Eckart\u2013Young). QR and LU support efficient linear solves.',
          formulas: [
            '\\(A = U\\Sigma V^T\\)',
            '\\(A_k = U_k \\Sigma_k V_k^T\\)',
          ],
          interactive: { file: 'lecture-05-matrix-decompositions.html', label: 'Matrix Decompositions Lab' },
          tags: ['SVD', 'PCA', 'MathJax'],
        },
      ],
    },
    {
      id: 'differentiation',
      title: 'Differentiation & Local Geometry',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      topics: [
        {
          title: 'Derivatives, Partials & Gradients',
          notes: 'The gradient \u2207f points in the direction of steepest increase; \u2212\u2207f is steepest decrease. A directional derivative is \u2207f\u1d40u for unit u. Essential rules: \u2207(a\u1d40x) = a, \u2207(x\u1d40x) = 2x, and the chain rule multiplies local derivatives along a composition.',
          formulas: [
            '\\(\\nabla f(\\mathbf{x}) = \\bigl[\\tfrac{\\partial f}{\\partial x_1}, \\ldots, \\tfrac{\\partial f}{\\partial x_n}\\bigr]^T\\)',
            '\\(D_{\\mathbf{u}}f = \\nabla f^T \\mathbf{u}\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Matrix Gradients & Backpropagation',
          notes: 'Keep shapes explicit \u2014 \u2207\u2093f has the same shape as x. Backpropagation applies the chain rule in reverse through a computation graph, reusing intermediate derivatives for efficient parameter gradient computation.',
          formulas: [
            '\\(\\nabla_{\\mathbf{x}}(\\mathbf{x}^T A\\mathbf{x}) = (A + A^T)\\mathbf{x}\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Hessian, Taylor Approximation & Extrema',
          notes: 'The Hessian H(x) contains second partial derivatives and describes local curvature. At a stationary point (\u2207f = 0): PD Hessian \u2192 local min, ND Hessian \u2192 local max, indefinite \u2192 saddle.',
          formulas: [
            '\\(f(\\mathbf{x}) \\approx f(\\mathbf{x}_0) + \\nabla f^T(\\mathbf{x}-\\mathbf{x}_0) + \\tfrac{1}{2}(\\mathbf{x}-\\mathbf{x}_0)^T H (\\mathbf{x}-\\mathbf{x}_0)\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'optimization',
      title: 'Optimization for ML',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
      topics: [
        {
          title: 'Gradient Descent & Continuous Optimization',
          notes: 'GD updates parameters by subtracting \u03b7\u2207J. Too small \u03b7 \u2192 slow; too large \u2192 oscillation/divergence. Feature scaling improves conditioning. For convex objectives every local minimum is global.',
          formulas: [
            '\\(\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta\\,\\nabla J(\\boldsymbol{\\theta}_t)\\)',
          ],
          interactive: { file: 'lecture-09-gradient-descent-basics.html', label: 'Gradient Descent Basics' },
          extras: [
            { file: 'lecture-09-gradient-descent-in-nature.html', label: 'GD in Nature' },
            { file: 'lecture-09-neural-network-gradient-descent.html', label: 'Neural Net GD' },
          ],
          tags: ['Optimisation', 'Interactive'],
        },
        {
          title: 'Stochastic Optimization & Generalization',
          notes: 'Batch GD uses all examples; SGD uses one; mini-batch uses a subset. Stochastic gradients are noisy but cheaper. Standardization: x\u2032 = (x \u2212 \u03bc)/\u03c3. A widening train-vs-val gap signals overfitting.',
          formulas: [
            "\\(x' = \\frac{x - \\mu}{\\sigma}\\)",
          ],
          interactive: { file: 'lecture-10-optimization-geometry.html', label: 'Optimization Geometry' },
          extras: [
            { file: 'lecture-10-overfitting-and-optimization.html', label: 'Overfitting & Optimization' },
          ],
          tags: ['SGD', 'Geometry'],
        },
        {
          title: 'Momentum & Adaptive Optimizers',
          notes: 'Momentum accumulates velocity to reduce zig-zagging. AdaGrad scales steps by accumulated squared gradients. RMSProp uses exponential moving averages. Adam combines momentum (1st moment) and RMSProp scaling (2nd moment) with bias correction.',
          formulas: [
            '\\(\\mathbf{v}_{t+1} = \\beta\\mathbf{v}_t + \\nabla J(\\boldsymbol{\\theta}_t)\\)',
            '\\(\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\eta\\,\\mathbf{v}_{t+1}\\)',
          ],
          interactive: { file: 'lecture-11-momentum-gradient-descent.html', label: 'Momentum GD' },
          tags: ['Momentum', 'Three.js'],
        },
      ],
    },
    {
      id: 'pca',
      title: 'Principal Component Analysis',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
      topics: [
        {
          title: 'PCA: Variance, Projection & Low-Rank Representation',
          notes: 'Center data first: Xc = X \u2212 1\u03bc\u1d40. The first principal direction w\u2081 maximises projected variance. Projection onto k components: Z = XcWk; reconstruction: X\u0302 = ZWk\u1d40 + 1\u03bc\u1d40. Explained-variance ratio for component i: \u03bbi / \u03a3\u2c7c\u03bbj.',
          formulas: [
            '\\(C = \\tfrac{1}{n}X_c^T X_c\\)',
            '\\(\\max_{\\|\\mathbf{w}\\|=1} \\mathbf{w}^T C \\mathbf{w}\\)',
            '\\(Z = X_c W_k\\)',
          ],
          interactive: { file: 'lecture-12-pca-maximizing-variance.html', label: 'PCA: Maximizing Variance' },
          extras: [
            { file: 'lecture-13-pca-in-practice.html', label: 'PCA in Practice' },
          ],
          tags: ['PCA', 'Variance'],
        },
      ],
    },
    {
      id: 'svm',
      title: 'SVMs & Constrained Optimization',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      topics: [
        {
          title: 'Constraints, KKT Conditions & Duality',
          notes: 'For min f(x) subject to g\u1d62(x) \u2264 0 and h\u2c7c(x) = 0, the Lagrangian includes multipliers \u03b1\u1d62 \u2265 0. KKT conditions: primal feasibility, dual feasibility, complementary slackness \u03b1\u1d62g\u1d62 = 0, and stationarity \u2207L = 0.',
          formulas: [
            '\\(\\mathcal{L} = f + \\sum_i \\alpha_i g_i + \\sum_j \\beta_j h_j\\)',
            '\\(\\alpha_i g_i(\\mathbf{x}) = 0\\)',
          ],
          interactive: { file: 'lecture-14-kkt-slater-duality.html', label: 'KKT, Slater & Duality' },
          tags: ['KKT', 'Duality'],
        },
        {
          title: 'Linear SVM & Maximum-Margin Classifier',
          notes: 'A separating hyperplane is w\u1d40x + b = 0. Its geometric margin is inversely proportional to \u2016w\u2016. Soft-margin SVM permits violations via slack variables \u03be\u1d62. Support vectors are the points that determine the boundary.',
          formulas: [
            '\\(\\min_{\\mathbf{w},b} \\tfrac{1}{2}\\|\\mathbf{w}\\|^2 + C\\sum_i \\xi_i\\)',
            '\\(y_i(\\mathbf{w}^T\\mathbf{x}_i + b) \\geq 1 - \\xi_i\\)',
          ],
          interactive: { file: 'lecture-15-svm-margin.html', label: 'SVM Margin' },
          tags: ['SVM', 'Margin'],
        },
        {
          title: 'Nonlinear SVMs & Kernels',
          notes: 'When data aren\'t linearly separable, map them implicitly to a feature space \u03c6(x). The kernel trick replaces inner products with K(x, z) = \u03c6(x)\u1d40\u03c6(z), avoiding explicit high-dimensional features. Common kernels: polynomial and RBF.',
          formulas: [
            '\\(K(\\mathbf{x},\\mathbf{z}) = (\\mathbf{x}^T\\mathbf{z} + c)^d\\)',
            '\\(K(\\mathbf{x},\\mathbf{z}) = \\exp(-\\gamma\\|\\mathbf{x}-\\mathbf{z}\\|^2)\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
  ];

  /* ----------------------------------------------------------
     DATA — ML Concept Groups & Topics
     All groups use the subject-level accent (teal)
     ---------------------------------------------------------- */
  const ML_CONCEPTS = [
    {
      id: 'ml-foundations',
      title: 'Foundations & Data Pipeline',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
      topics: [
        {
          title: 'What Machine Learning Is & Types of Learning',
          notes: 'An ML system improves at a task T using experience E, measured by performance P. Supervised learning uses labelled input\u2013target pairs; unsupervised learning finds structure without labels; reinforcement learning maximises long-term reward from actions. The central goal is generalisation: good predictions on unseen data, not just the training set.',
          formulas: [],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Designing a Learning System & Its Limits',
          notes: 'Choose the training experience, target function, representation (linear, tree, probabilistic), and algorithm. Common challenges include missing values, noisy labels, data leakage, class imbalance, changing distributions, high dimensionality, and weak interpretability.',
          formulas: [],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'ML Workflow, Preprocessing & Imbalance',
          notes: 'Split data into train/validation/test before model selection. Standardise features using training-set statistics only. For imbalanced classes, use class weights, threshold tuning, or resampling inside the training portion. Choose metrics that expose minority-class performance: precision, recall, F1, PR-AUC.',
          formulas: [
            '\\(D = D_{\\text{train}} \\cup D_{\\text{val}} \\cup D_{\\text{test}}\\)',
            "\\(x' = \\frac{x - \\mu}{\\sigma}\\)",
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-regression',
      title: 'Linear Regression',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
      topics: [
        {
          title: 'Regression Model & Squared-Error Objective',
          notes: 'A linear regression model predicts a real number: \u0177 = w\u1d40x. The intercept w\u2080 is included by setting x\u2080 = 1. Ordinary least squares minimises the sum of squared residuals. Squaring makes large errors count more heavily; under Gaussian noise, this equals MLE.',
          formulas: [
            '\\(\\hat y = \\mathbf{w}^T\\mathbf{x}\\)',
            '\\(J(\\mathbf{w}) = \\frac{1}{2n}\\sum_{i=1}^{n}(y_i - \\mathbf{w}^T\\mathbf{x}_i)^2\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Normal Equation & Gradient Descent',
          notes: 'When X\u1d40X is invertible, the closed-form solution is \u0175 = (X\u1d40X)\u207b\u00b9X\u1d40y. For large or ill-conditioned problems, gradient descent updates weights iteratively: w \u2190 w \u2212 \u03b7\u2207J. Batch GD uses all examples; SGD uses one; mini-batch is the practical default.',
          formulas: [
            '\\(\\hat{\\mathbf{w}} = (X^TX)^{-1}X^T\\mathbf{y}\\)',
            '\\(\\mathbf{w}_{t+1} = \\mathbf{w}_t - \\eta\\nabla J(\\mathbf{w}_t)\\)',
            '\\(\\nabla J = -\\frac{1}{n}X^T(\\mathbf{y} - X\\mathbf{w})\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Basis Functions, Bias\u2013Variance & Regularisation',
          notes: 'A linear model can capture curves by using transformed features \u03c6\u2c7c(x). Bias is systematic error from a model too restricted; variance is sensitivity to which training sample was drawn. Ridge (L2) shrinks weights smoothly; Lasso (L1) can zero them for feature selection. Choose \u03bb via validation.',
          formulas: [
            '\\(\\mathbb{E}[(y-\\hat f)^2] = \\text{bias}^2 + \\text{variance} + \\text{noise}\\)',
            '\\(J_{\\text{ridge}} = J + \\lambda\\sum_{j} w_j^2\\)',
            '\\(J_{\\text{lasso}} = J + \\lambda\\sum_{j} |w_j|\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-classification',
      title: 'Classification',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      topics: [
        {
          title: 'Discriminants, Decision Theory & Probabilities',
          notes: 'A discriminant function assigns a score to each class; predict the class with the best score. In probabilistic classification, choose the class with the largest posterior. If mistake costs differ, choose the class with minimum expected risk, not just highest probability.',
          formulas: [
            '\\(\\hat c = \\arg\\max_c P(C=c \\mid \\mathbf{x})\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Logistic Regression & Log Loss',
          notes: 'A linear score passed through the sigmoid gives a probability: p(y=1|x) = \u03c3(w\u1d40x). The decision boundary at threshold 0.5 is w\u1d40x = 0. Cross-entropy loss heavily penalises confident wrong predictions. The gradient has a clean error form: (1/n)X\u1d40(p \u2212 y).',
          formulas: [
            '\\(\\sigma(z) = \\frac{1}{1+e^{-z}}\\)',
            '\\(J = -\\frac{1}{n}\\sum[y_i\\log p_i + (1-y_i)\\log(1-p_i)]\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Multiclass Classification & Softmax',
          notes: 'One-vs-rest fits one binary classifier per class. Softmax regression normalises scores into probabilities that sum to one. Multiclass cross-entropy is the negative log probability of the true class.',
          formulas: [
            '\\(P(y=k \\mid \\mathbf{x}) = \\frac{e^{z_k}}{\\sum_{j=1}^{K} e^{z_j}}\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-trees',
      title: 'Decision Trees',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
      topics: [
        {
          title: 'Entropy, Information Gain & Splitting',
          notes: 'A decision tree asks feature-based questions, sending examples down branches to leaf predictions. Entropy H(S) measures class uncertainty: pure nodes have H = 0. Information gain is the parent entropy minus weighted child entropy. Choose the split with the highest gain.',
          formulas: [
            '\\(H(S) = -\\sum_{k} p_k \\log_2 p_k\\)',
            '\\(IG(S,A) = H(S) - \\sum_v \\frac{|S_v|}{|S|} H(S_v)\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Construction, Overfitting & Pruning',
          notes: 'For continuous features, test thresholds x\u2c7c \u2264 t. Trees can memorise training data. Pre-pruning stops growth early (max depth, min samples). Post-pruning removes branches that don\'t improve validation. A tree split is not proof of causation\u2014only a rule that improved the training objective.',
          formulas: [],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-instance',
      title: 'Instance-Based Learning',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      topics: [
        {
          title: 'k-Nearest Neighbours (k-NN)',
          notes: 'k-NN stores training examples and predicts at query time using the k closest points. For classification, use majority vote; for regression, average targets. Feature scale matters\u2014standardise before using distance. Small k is flexible/noisy; large k is smooth/biased. Choose k by validation.',
          formulas: [
            '\\(d(\\mathbf{x}, \\mathbf{x}\\prime) = \\sqrt{\\sum_{j}(x_j - x_j\\prime)^2}\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Locally Weighted Regression & RBFs',
          notes: 'LWR fits or weights a simple model near the query point using a kernel weight that decays with distance. \u03c4 controls neighbourhood width: small \u03c4 focuses closely; large \u03c4 gives a smoother fit. Radial basis functions create local "bumps" that combine into flexible boundaries.',
          formulas: [
            '\\(w_i(\\mathbf{x}) = \\exp\\left(-\\frac{\\|\\mathbf{x}-\\mathbf{x}_i\\|^2}{2\\tau^2}\\right)\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-svm',
      title: 'Support Vector Machines',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      topics: [
        {
          title: 'Maximum-Margin Linear Classification',
          notes: 'A linear SVM separates two classes with the hyperplane w\u1d40x + b = 0. The margin width is 2/\u2016w\u2016; maximising margin = minimising \u00bd\u2016w\u2016\u00b2. Support vectors are the training examples on or inside the margin\u2014they alone determine the boundary.',
          formulas: [
            '\\(\\min_{\\mathbf{w},b} \\frac{1}{2}\\|\\mathbf{w}\\|^2\\)',
            '\\(y_i(\\mathbf{w}^T\\mathbf{x}_i + b) \\geq 1\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Soft Margin, Dual Form & Kernels',
          notes: 'Soft-margin SVM adds slack variables \u03be\u1d62 for misclassified points. High C punishes violations strongly; low C allows more for a wider margin. A kernel K(x,z) = \u03c6(x)\u1d40\u03c6(z) lets the SVM find nonlinear boundaries without computing the high-dimensional mapping explicitly.',
          formulas: [
            '\\(\\min \\frac{1}{2}\\|\\mathbf{w}\\|^2 + C\\sum_i \\xi_i\\)',
            '\\(K(\\mathbf{x},\\mathbf{z}) = \\exp(-\\gamma\\|\\mathbf{x}-\\mathbf{z}\\|^2)\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-bayesian',
      title: 'Bayesian Learning',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
      topics: [
        {
          title: 'Bayes Rule, MLE & MAP',
          notes: 'Bayes rule updates a prior belief using observed data: posterior \u221d likelihood \u00d7 prior. MLE picks parameters maximising P(D|\u03b8). MAP also includes the prior\u2014a Gaussian prior on weights gives an L2-like penalty, linking MAP to ridge regression. Maximise log-likelihood for numerical stability.',
          formulas: [
            '\\(P(h \\mid D) = \\frac{P(D \\mid h)\\,P(h)}{P(D)}\\)',
            '\\(\\hat\\theta_{\\text{MLE}} = \\arg\\max_\\theta P(D \\mid \\theta)\\)',
            '\\(\\hat\\theta_{\\text{MAP}} = \\arg\\max_\\theta P(D \\mid \\theta)P(\\theta)\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Naive Bayes Classifiers',
          notes: 'Naive Bayes assumes features are conditionally independent given the class: P(C|x) \u221d P(C)\u220fP(x\u2c7c|C). The assumption is often false but the classifier works well because it estimates few parameters. Use Laplace smoothing so an unseen feature doesn\'t zero out the class probability.',
          formulas: [
            '\\(P(C \\mid \\mathbf{x}) \\propto P(C)\\prod_{j=1}^{d} P(x_j \\mid C)\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-ensembles',
      title: 'Ensemble Methods',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/></svg>',
      topics: [
        {
          title: 'Bagging & Random Forests',
          notes: 'Bagging trains each base model on a bootstrap sample and averages predictions. It mainly reduces variance. ~36.8% of examples are out-of-bag per sample and can estimate performance. Random forests add random feature selection at each split, reducing tree correlation and improving the average.',
          formulas: [],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Boosting, AdaBoost & Gradient Boosting',
          notes: 'Boosting builds weak learners sequentially, each focusing on errors left by predecessors. AdaBoost reweights misclassified examples. Gradient boosting fits the next learner to current residuals/negative gradient. XGBoost adds shrinkage, tree-complexity regularisation, and row/column sampling for efficiency.',
          formulas: [],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-unsupervised',
      title: 'Unsupervised Learning',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="7.5" r="3.5"/><circle cx="16.5" cy="16.5" r="3.5"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/></svg>',
      topics: [
        {
          title: 'k-Means Clustering',
          notes: 'k-means partitions data into K clusters by alternating: assign each point to its nearest centroid, then replace each centroid with the cluster mean. The objective decreases each cycle but can converge to a local optimum\u2014use multiple initialisations. It prefers compact, spherical clusters.',
          formulas: [
            '\\(\\min \\sum_{k=1}^{K}\\sum_{\\mathbf{x}_i \\in C_k} \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_k\\|^2\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Gaussian Mixture Models & EM',
          notes: 'A GMM uses Gaussian components with weights \u03c0\u2096, means \u03bc\u2096, and covariances \u03a3\u2096. Each point gets a soft responsibility \u03b3\u1d62\u2096. EM alternates: E-step computes responsibilities; M-step updates parameters. EM increases log-likelihood each iteration but may converge to a local optimum.',
          formulas: [
            '\\(p(\\mathbf{x}) = \\sum_{k=1}^{K} \\pi_k\\,\\mathcal{N}(\\mathbf{x} \\mid \\boldsymbol{\\mu}_k, \\Sigma_k)\\)',
            '\\(\\boldsymbol{\\mu}_k = \\frac{\\sum_i \\gamma_{ik}\\mathbf{x}_i}{\\sum_i \\gamma_{ik}}\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
    {
      id: 'ml-evaluation',
      title: 'Evaluation & Responsible ML',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      topics: [
        {
          title: 'Classification & Regression Metrics',
          notes: 'Accuracy is useful only when class prevalence and error costs make it meaningful. Precision asks: of predicted positives, how many were correct? Recall asks: of actual positives, how many were found? F1 balances both. ROC curves plot TPR vs FPR; PR curves are more informative for rare classes. MSE penalises large errors; MAE keeps target units.',
          formulas: [
            '\\(\\text{precision} = \\frac{TP}{TP+FP}\\)',
            '\\(\\text{recall} = \\frac{TP}{TP+FN}\\)',
            '\\(F_1 = 2\\frac{\\text{prec} \\cdot \\text{rec}}{\\text{prec} + \\text{rec}}\\)',
          ],
          interactive: null,
          tags: ['Theory'],
        },
        {
          title: 'Fairness, Accountability & Interpretability',
          notes: 'A model can be accurate overall yet harm a subgroup. Fairness measures can conflict: equal selection rate, equal TPR, and calibration cannot all hold when base rates differ. Removing a protected attribute doesn\'t remove bias\u2014other features can be proxies. Document intended use, limits, and per-group performance.',
          formulas: [],
          interactive: null,
          tags: ['Theory'],
        },
      ],
    },
  ];

  /* ----------------------------------------------------------
     SUBJECTS — each wraps its concept groups
     ---------------------------------------------------------- */
  const SUBJECTS = [
    {
      id: 'mfml',
      title: 'Mathematical Foundations for ML',
      code: 'MFML \u2014 AIMLC ZC416',
      description: 'Linear algebra, calculus, optimisation, PCA, and SVMs \u2014 with interactive visuals and key formulas.',
      emoji: '\ud83d\udcd0',
      accent: 'lavender',
      folder: 'Subject_1_MFML',
      conceptGroups: MFML_CONCEPTS,
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      code: 'ML \u2014 AIMLC ZG565',
      description: 'Regression, classification, trees, SVMs, Bayesian learning, ensembles, clustering, and evaluation \u2014 concept-first revision notes.',
      emoji: '\ud83e\udde0',
      accent: 'teal',
      folder: 'Subject_3_ML',
      conceptGroups: ML_CONCEPTS,
    },
  ];

  /* ----------------------------------------------------------
     DOM REFERENCES
     ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.topbar nav a[data-section]');
  const subjectsSection = document.getElementById('subjects-section');
  const projectsSection = document.getElementById('projects-section');

  const subjectsList = document.getElementById('subjects-list');
  const topicsView = document.getElementById('topics-view');
  const backToSubjectsBtn = document.getElementById('back-to-subjects');
  const topicsEyebrow = document.getElementById('topics-eyebrow');
  const topicsTitle = document.getElementById('topics-title');
  const conceptContainer = document.getElementById('concept-groups-container');

  const iframeOverlay = document.getElementById('iframe-overlay');
  const iframeEl = document.getElementById('interactive-frame');
  const iframeTitle = document.getElementById('iframe-title');
  const iframeLoading = document.getElementById('iframe-loading');
  const iframeBackBtn = document.getElementById('iframe-back');
  const iframeOpenBtn = document.getElementById('iframe-open-new');

  const theoryOverlay = document.getElementById('theory-overlay');
  const theoryBackBtn = document.getElementById('theory-back');
  const theoryTitle = document.getElementById('theory-overlay-title');
  const theoryContent = document.getElementById('theory-content');

  /* ----------------------------------------------------------
     STATE
     ---------------------------------------------------------- */
  let currentSubject = null;
  let currentTopic = null;

  const projectsHeroSubtitle = 'I build production GenAI systems and visualize the concepts behind them.';
    const projectsHeroHighlights = [
      'End-to-end ML systems - from data cleaning, feature engineering to deployed apps',
      'GenAI in practice - RAG pipelines, embeddings, and LLM integration on real documents',
      'Strong conceptual foundations - I build 3D visualizations to understand concepts in depth'
    ];

  /* ----------------------------------------------------------
     TAB SWITCHING
     ---------------------------------------------------------- */
  function switchSection(sectionId) {
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroHighlights = document.getElementById('hero-highlights');

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
    const statsStrip = document.getElementById('stats-strip');
    if (sectionId === 'subjects') {
      subjectsSection.classList.add('active');
      projectsSection.classList.remove('active');
      document.getElementById('hero-title').textContent = 'Concepts learnt so far';
      heroSubtitle.textContent = 'Learning with interactive 3D visualisers and important concepts';
      heroHighlights.classList.add('hidden');
      statsStrip.classList.remove('hidden');
    } else {
      projectsSection.classList.add('active');
      subjectsSection.classList.remove('active');
      document.getElementById('hero-title').textContent = 'AI/ML Engineer';
      heroSubtitle.textContent = projectsHeroSubtitle;
      heroHighlights.innerHTML = projectsHeroHighlights.map((highlight) => `<li>${highlight}</li>`).join('');
      heroHighlights.classList.remove('hidden');
      statsStrip.classList.add('hidden');
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(link.dataset.section);
    });
  });

  /* ----------------------------------------------------------
     RENDER SUBJECT CARDS
     ---------------------------------------------------------- */
  function countSubjectStats(subject) {
    let totalTopics = 0;
    let withInteractive = 0;
    let totalPages = 0;
    subject.conceptGroups.forEach((g) => {
      g.topics.forEach((t) => {
        totalTopics++;
        if (t.interactive) { withInteractive++; totalPages++; }
        if (t.extras) totalPages += t.extras.length;
      });
    });
    return { totalTopics, withInteractive, totalPages };
  }

  function renderSubjectsList() {
    subjectsList.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'subjects-list-header fade-in-up';
    header.innerHTML = '<span class="section-eyebrow">YOUR SUBJECTS</span><h2>Choose a Subject</h2>';
    subjectsList.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'subject-cards-grid';

    SUBJECTS.forEach((subject) => {
      const stats = countSubjectStats(subject);
      const card = document.createElement('div');
      card.className = 'subject-card accent-' + subject.accent + ' fade-in-up';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.innerHTML = `
        <div class="sc-left">
          <span class="sc-emoji">${subject.emoji}</span>
          <div class="sc-info">
            <h3>${subject.title}</h3>
            <span class="sc-code">${subject.code}</span>
            <p>${subject.description}</p>
          </div>
        </div>
        <div class="sc-right">
          <div class="sc-stats">
            <span class="sc-stat"><strong>${stats.totalTopics}</strong> topics</span>
            <span class="sc-stat"><strong>${stats.totalPages}</strong> interactive</span>
            <span class="sc-stat"><strong>${subject.conceptGroups.length}</strong> groups</span>
          </div>
          <span class="sc-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      `;
      card.addEventListener('click', () => openSubject(subject));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSubject(subject); } });
      grid.appendChild(card);
    });

    subjectsList.appendChild(grid);

    requestAnimationFrame(() => {
      subjectsList.querySelectorAll('.fade-in-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    });
  }

  /* ----------------------------------------------------------
     SUBJECT DRILL-DOWN
     ---------------------------------------------------------- */
  function openSubject(subject, skipHash) {
    currentSubject = subject;
    subjectsList.classList.add('hidden');
    topicsView.classList.remove('hidden');

    topicsEyebrow.textContent = subject.code;
    topicsTitle.textContent = subject.title;

    renderConceptGroups(subject);
    updateProgress(subject);
    if (!skipHash) setHash('subjects/' + subject.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeSubject(skipHash) {
    topicsView.classList.add('hidden');
    subjectsList.classList.remove('hidden');
    conceptContainer.innerHTML = '';
    currentSubject = null;
    if (!skipHash) setHash('subjects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backToSubjectsBtn.addEventListener('click', () => closeSubject());

  function updateProgress(subject) {
    const stats = countSubjectStats(subject);
    const pct = stats.totalTopics > 0 ? Math.round((stats.withInteractive / stats.totalTopics) * 100) : 0;
    document.getElementById('progress-label').innerHTML =
      '<strong>' + stats.withInteractive + '</strong> of ' + stats.totalTopics + ' topics have interactives';
    document.getElementById('progress-fill').style.width = pct + '%';
  }

  /* ----------------------------------------------------------
     RENDER CONCEPT GROUPS & TOPIC CARDS
     ---------------------------------------------------------- */
  function createTopicCard(topic, subjectAccent, subjectFolder) {
    const card = document.createElement('div');
    const hasInteractive = !!topic.interactive;
    card.className = 'topic-card fade-in-up accent-' + subjectAccent + (hasInteractive ? '' : ' theory-only');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    const tagsHtml = topic.tags
      .map((tag) => {
        const cls = tag === 'Theory' ? 'tag theory-tag' : 'tag';
        return '<span class="' + cls + '">' + tag + '</span>';
      })
      .join('');

    const statusTag = hasInteractive
      ? '<span class="tag available">\u2726 Interactive</span>'
      : '<span class="tag theory-tag">\u25c8 Theory</span>';

    const extrasCount = topic.extras ? topic.extras.length : 0;
    const extrasHtml = extrasCount
      ? '<span class="card-meta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' + extrasCount + ' bonus</span>'
      : '';

    const formulasHtml = topic.formulas.length
      ? '<div class="topic-formulas">' + topic.formulas.map((f) => '<span class="formula">' + f + '</span>').join('') + '</div>'
      : '';

    const actionHtml = hasInteractive
      ? '<span class="card-action">Launch <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>'
      : '<span class="card-action">View Notes <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></span>';

    card.innerHTML =
      '<div class="card-accent-bar"></div>' +
      '<div class="card-body">' +
      '<div class="tag-row">' + statusTag + tagsHtml + '</div>' +
      '<h3>' + topic.title + '</h3>' +
      '<p class="topic-notes">' + topic.notes + '</p>' +
      formulasHtml +
      '<div class="card-footer">' + extrasHtml + actionHtml + '</div>' +
      '</div>';

    function activateCard() {
      if (hasInteractive) {
        openIframe(topic, subjectFolder);
      } else {
        openTheory(topic, subjectAccent);
      }
    }
    card.addEventListener('click', activateCard);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateCard(); } });

    return card;
  }

  function renderConceptGroups(subject) {
    conceptContainer.innerHTML = '';
    const accent = subject.accent;

    subject.conceptGroups.forEach((group) => {
      const header = document.createElement('div');
      header.className = 'concept-group-header accent-' + accent + ' fade-in-up';
      header.innerHTML =
        '<div class="cg-icon">' + group.icon + '</div>' +
        '<div class="cg-info">' +
        '<h3>' + group.title + '</h3>' +
        '<span class="cg-count">' + group.topics.length + ' topic' + (group.topics.length > 1 ? 's' : '') + '</span>' +
        '</div>';
      conceptContainer.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'topic-grid';
      group.topics.forEach((topic) => {
        grid.appendChild(createTopicCard(topic, accent, subject.folder));
      });
      conceptContainer.appendChild(grid);
    });

    requestAnimationFrame(() => {
      conceptContainer.querySelectorAll('.fade-in-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 50);
      });
    });

    typesetMathJax(conceptContainer);
  }

  /* ----------------------------------------------------------
     MATHJAX HELPER
     ---------------------------------------------------------- */
  function typesetMathJax(container) {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([container]).catch(() => { });
    } else {
      const mjScript = document.getElementById('MathJax-script');
      if (mjScript) {
        mjScript.addEventListener('load', () => {
          if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([container]).catch(() => { });
          }
        });
      }
    }
  }

  /* ----------------------------------------------------------
     IFRAME OVERLAY (interactive topics)
     ---------------------------------------------------------- */
  function openIframe(topic, folder) {
    currentTopic = topic;
    const src = folder + '/interactive/' + topic.interactive.file;

    iframeTitle.textContent = topic.title;
    iframeLoading.classList.remove('hidden');
    iframeEl.src = src;
    iframeOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    iframeEl.onload = () => {
      iframeLoading.classList.add('hidden');
    };
  }

  function closeIframe() {
    iframeOverlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      iframeEl.src = 'about:blank';
      currentTopic = null;
    }, 300);
  }

  iframeBackBtn.addEventListener('click', closeIframe);

  iframeOpenBtn.addEventListener('click', () => {
    if (currentTopic && currentTopic.interactive && currentSubject) {
      window.open(currentSubject.folder + '/interactive/' + currentTopic.interactive.file, '_blank');
    }
  });

  /* ----------------------------------------------------------
     THEORY OVERLAY (theory-only topics)
     ---------------------------------------------------------- */
  function openTheory(topic, accent) {
    theoryTitle.textContent = topic.title;

    let html = '<div class="theory-card accent-' + accent + '">';
    html += '<div class="card-accent-bar"></div>';
    html += '<div class="theory-body">';
    html += '<h2>' + topic.title + '</h2>';
    html += '<div class="theory-notes">' + topic.notes + '</div>';

    if (topic.formulas.length) {
      html += '<div class="theory-formulas-section">';
      html += '<h4>Key Formulas</h4>';
      html += '<div class="topic-formulas">';
      topic.formulas.forEach((f) => { html += '<span class="formula">' + f + '</span>'; });
      html += '</div></div>';
    }

    html += '<div class="theory-notice">';
    html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    html += '<span>Interactive visual for this topic is planned for a future update.</span>';
    html += '</div>';

    html += '</div></div>';

    theoryContent.innerHTML = html;
    theoryOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    typesetMathJax(theoryContent);
  }

  function closeTheory() {
    theoryOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  theoryBackBtn.addEventListener('click', closeTheory);


  /* ----------------------------------------------------------
     UPDATE HERO STATS
     ---------------------------------------------------------- */
  function updateStats() {
    let totalTopics = 0;
    let totalPages = 0;

    SUBJECTS.forEach((subject) => {
      const stats = countSubjectStats(subject);
      totalTopics += stats.totalTopics;
      totalPages += stats.totalPages;
    });

    document.getElementById('stat-topics').textContent = totalTopics;
    document.getElementById('stat-interactive').textContent = totalPages;
    document.getElementById('stat-subjects').textContent = SUBJECTS.length;
    document.getElementById('stat-projects').textContent = PROJECTS.length;
  }

  /* ----------------------------------------------------------
     PROJECTS DATA
     ---------------------------------------------------------- */
  const PROJECTS = [
    {
      id: 'bike-sharing',
      category: 'ml',
      title: 'End to End Machine Learning Pipeline from Scratch',
      summary: 'Built a complete supervised regression pipeline to predict hourly bike rental demand — from raw CSV data all the way to Kaggle submission. Covers EDA, feature engineering with cyclical encodings, regularised regression, hyperparameter tuning, and residual diagnostics. Achieved a 69% reduction in prediction error.',
      image: 'Projects/Bike-Sharing-Demand-Prediction/1_slider.png',
      github: 'https://github.com/shray028/Bike-Sharing-Demand-Prediction',
      tags: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'matplotlib'],
      results: [
        { value: '69%', label: 'RMSLE Reduction' },
        { value: '0.39', label: 'Best RMSLE' },
        { value: '25', label: 'Engineered Features' },
      ],
      steps: [
        {
          title: 'Data Ingestion & Inspection',
          description: 'Loaded 10,450 hourly records from the Kaggle Bike Sharing dataset (Washington D.C.). Inspected all 12 columns for data types, missing values, and distribution characteristics. Identified that the dataset was clean with no missing values.',
          learnings: [
            'Identified `casual` and `registered` as leaky features — they directly sum to the target `count` and are absent in the test set. Dropped both immediately to prevent data leakage.',
            'Recognised `datetime` was stored as a string and needed parsing before any time-based feature extraction.',
            'Confirmed integer-encoded categoricals (`season`, `weather`) needed contextual treatment, not numeric scaling.',
          ],
        },
        {
          title: 'Exploratory Data Analysis & Insights',
          description: 'Performed correlation analysis, scatter plots for continuous features, jitter plots for categoricals, and hour-based demand analysis. Explored the target distribution and its implications for modeling.',
          learnings: [
            'Discovered extreme multicollinearity between `temp` and `atemp` (Pearson r = 0.98). Dropped `temp`, kept `atemp` to avoid redundant features.',
            'Found bimodal demand peaks at 7–9 AM and 5–7 PM (commuting hours) — a critical signal for feature engineering.',
            'The target `count` is heavily right-skewed. Applying `log(count + 1)` yields a near-symmetric distribution, which is better suited for linear models and directly optimises the RMSLE metric.',
          ],
        },
        {
          title: 'Feature Engineering',
          description: 'Built a comprehensive feature engineering pipeline that extracts time-based components, applies cyclical sin/cos encoding, creates behavioral binary flags, and constructs interaction features. Expanded the feature set from 10 raw features to 25 engineered features.',
          learnings: [
            'Cyclical encoding (sin/cos) preserves the circular nature of time — hour 23 and hour 0 are adjacent in reality but numerically distant. This encoding fixes that for linear models.',
            'Rush-hour and peak-hour flags directly encode real-world commuting behavior that strongly correlates with rental demand.',
            'Interaction terms like `temp × humidity` and `workingday × hour` capture multiplicative effects that linear models cannot learn on their own.',
          ],
        },
        {
          title: 'Preprocessing & Data Splitting',
          description: 'Set up the final modeling pipeline with an 80/20 train-validation split, log-transformed target, StandardScaler normalisation, and cross-validated feature selection. Ensured no information leakage between train and validation sets.',
          learnings: [
            'StandardScaler must be fit only on training data — applying `fit_transform()` on the full dataset before splitting would leak validation statistics into training.',
            'Training on `log(count + 1)` directly optimises the same objective as the RMSLE evaluation metric. Predictions are back-transformed using `expm1()`.',
            'Cross-validated feature selection confirmed that the engineered features significantly outperform raw-only features.',
          ],
        },
        {
          title: 'Modeling & Hyperparameter Tuning',
          description: 'Trained five progressively complex models: vanilla Linear Regression, log-transformed Linear Regression, Ridge and Lasso with GridSearchCV (5-fold CV, 6 alpha values), and Polynomial(degree=2) + Ridge. Each step demonstrated measurable improvement.',
          learnings: [
            'Ridge (L2) regularisation penalises large coefficients and reduces overfitting. Lasso (L1) can drive coefficients to exactly zero, performing implicit feature selection.',
            'GridSearchCV with 5-fold cross-validation tested 30 model fits per regularisation method to find optimal alpha — balancing bias and variance systematically.',
            'Polynomial(2) expansion creates hundreds of degree-2 terms (squares and pairwise interactions). Ridge regularisation is critical here to control this high-dimensional space.',
          ],
        },
        {
          title: 'Evaluation & Final Submission',
          description: 'Performed residual analysis on the best model (Polynomial + Ridge), generated diagnostic plots, compared all models in a results table, and retrained on the full dataset before generating Kaggle submission predictions.',
          learnings: [
            'Residuals were approximately centered at zero with no strong systematic patterns — confirming the model captures the main structure in the data.',
            'The best model achieved RMSLE ≈ 0.39, a 69% improvement over the baseline (RMSLE ≈ 1.27). Each pipeline stage — log transform, better features, regularisation, polynomial expansion — contributed measurably.',
            'Final predictions were clipped to non-negative values and rounded to integers, since bike rental counts must be whole positive numbers.',
          ],
        },
      ],
    },
    {
      id: 'breast-cancer',
      category: 'ml',
      title: 'Breast Cancer Classification & Deployment',
      summary: 'Trained and compared six ML classifiers (Logistic Regression, Decision Tree, KNN, Naive Bayes, Random Forest, XGBoost) on the Wisconsin Breast Cancer dataset to predict malignant vs. benign tumors. Built an interactive Streamlit web app for real-time prediction, model comparison, and evaluation on unseen test data. Random Forest achieved the highest accuracy at 97.4% with an MCC of 0.94.',
      image: 'Projects/Breast-cancer-app/single_slider.png',
      github: 'https://github.com/shray028/Breast-cancer-app',
      tags: ['Python', 'scikit-learn', 'XGBoost', 'Streamlit', 'Plotly'],
      results: [
        { value: '97.4%', label: 'Best Accuracy' },
        { value: '0.944', label: 'Best MCC' },
        { value: '6', label: 'Models Compared' },
      ],
      steps: [
        {
          title: 'Data Loading & Preprocessing',
          description: 'Loaded 569 samples with 30 numerical features from the Wisconsin Breast Cancer dataset. Encoded the target (Malignant = 1, Benign = 0), dropped the ID column, performed a stratified 80/20 train-test split, and applied StandardScaler fitted only on training data.',
          learnings: [
            'Stratified splitting preserves class distribution in both train and test sets — critical for imbalanced medical datasets where the minority class (malignant) must be well-represented.',
            'StandardScaler was fit exclusively on training data to prevent information leakage from test samples into the scaling statistics.',
            'Exported a separate test_data.csv for use in the Streamlit deployment app, keeping evaluation fully independent from training.',
          ],
        },
        {
          title: 'Multi-Model Training',
          description: 'Trained six classifiers — Logistic Regression, Decision Tree, KNN (k=5), Gaussian Naive Bayes, Random Forest (300 estimators, max_depth=6), and XGBoost (learning_rate=0.05, max_depth=3). Each model was serialised with pickle for deployment.',
          learnings: [
            'Ensemble methods (Random Forest, XGBoost) outperformed single learners by reducing variance and capturing complex feature interactions.',
            'Logistic Regression performed surprisingly well (96.5% accuracy), confirming the dataset is highly linearly separable — a useful baseline insight before reaching for complex models.',
            'Decision Tree showed the weakest generalisation due to overfitting without depth restriction, highlighting why pruning and ensemble strategies matter.',
          ],
        },
        {
          title: 'Evaluation & Model Comparison',
          description: 'Evaluated all six models on the held-out test set using Accuracy, AUC, Precision, Recall, F1, and Matthews Correlation Coefficient (MCC). Compared results side-by-side to select the best performer.',
          learnings: [
            'Random Forest achieved the best overall balance: 97.4% accuracy, 0.994 AUC, and the highest MCC (0.944) — indicating strong performance across both classes.',
            'XGBoost and Random Forest both reached perfect precision (1.00) on the malignant class, meaning zero false positives, but slightly lower recall shows a few malignant cases were missed.',
            'Naive Bayes had a high AUC (0.989) but the lowest recall — the conditional independence assumption breaks down with highly correlated tumor measurements like radius, perimeter, and area.',
          ],
        },
        {
          title: 'Recall vs. Precision in Medical Context',
          description: 'Analysed the clinical implications of precision-recall trade-offs. In cancer screening, missing a malignant tumor (false negative) is far more dangerous than a false alarm (false positive).',
          learnings: [
            'Recall (sensitivity) was prioritised over precision for final model selection — in a medical setting, failing to detect cancer can be life-threatening.',
            'Random Forest achieved the best recall among ensemble models (92.9%), while Logistic Regression matched it, making both clinically viable choices.',
            'MCC was used as the primary ranking metric because it accounts for all four confusion matrix quadrants and is robust to class imbalance — unlike accuracy alone.',
          ],
        },
        {
          title: 'Streamlit Deployment',
          description: 'Built and deployed an interactive Streamlit web application that allows users to upload test CSV data, select a trained model, view predictions, and examine evaluation metrics with Plotly-powered confusion matrices and classification reports.',
          learnings: [
            'Persisted all trained models as pickle files and the scaler separately, so the app loads pre-trained artifacts without retraining — keeping deployment lightweight.',
            'Streamlit\'s reactive model made it easy to wire up model selection, CSV upload, and live metric display without writing any frontend JavaScript.',
            'Added Plotly-based confusion matrix visualisation so users can visually inspect where each model succeeds and fails across the two classes.',
          ],
        },
      ],
    },
    {
      id: 'linear-vs-mlp',
      category: 'ai',
      title: 'Linear Models vs MLPs — Built from Scratch',
      summary: 'Implemented Logistic Regression and a Multi-Layer Perceptron entirely from scratch using only NumPy to classify heart disease on the Kaggle Heart Disease dataset (1,025 samples, 13 features). No sklearn models were used — forward propagation, backpropagation, gradient descent, and all evaluation metrics were hand-coded. The MLP (architecture [13, 16, 8, 1]) improved recall from 92.4% to 95.2% over the baseline, demonstrating how even a shallow neural network captures non-linear feature interactions that a linear classifier misses.',
      image: 'Projects/Linear-Models-vs-MLPs/single_slider.png',
      github: 'https://github.com/shray028/Linear-Models-vs-MLPs',
      tags: ['Python', 'NumPy', 'From Scratch', 'Neural Networks', 'matplotlib'],
      results: [
        { value: '95.2%', label: 'MLP Recall' },
        { value: '0.85', label: 'MLP F1 Score' },
        { value: '0', label: 'sklearn Models Used' },
      ],
      steps: [
        {
          title: 'Dataset Selection & Preprocessing',
          description: 'Loaded the Kaggle Heart Disease dataset (1,025 samples, 13 features) for binary classification. Performed an 80/20 stratified train-test split and standardised features using mean and standard deviation computed from training data only.',
          learnings: [
            'Chose a dataset with ≥500 samples and ≥5 features to ensure meaningful training and generalisation evaluation — small datasets amplify overfitting and make metric comparisons unreliable.',
            'Feature scaling was critical for gradient-based models — without standardisation, features like cholesterol (100s) would dominate gradients over binary features like sex (0/1).',
            'Stratified splitting preserved the class balance (~55% disease positive) in both train and test sets, preventing biased evaluation.',
          ],
        },
        {
          title: 'Baseline Logistic Regression — From Scratch',
          description: 'Built a single-neuron logistic regression classifier from scratch: sigmoid activation, binary cross-entropy loss, and batch gradient descent with manual gradient computation. Trained for 500 iterations at learning rate 0.01.',
          learnings: [
            'Implemented the full forward pass (z = Xw + b, σ(z)), BCE loss, and gradient formulas (dw = X^T(p−y)/N, db = Σ(p−y)/N) by hand — reinforcing the math behind every sklearn call.',
            'The baseline achieved 81.0% accuracy and 92.4% recall, confirming the dataset has a roughly linear decision boundary — a strong baseline before adding complexity.',
            'Clipping sigmoid input to [−500, 500] prevented numerical overflow in exp() — a practical detail that textbooks skip but crashes real code.',
          ],
        },
        {
          title: 'MLP Implementation — From Scratch',
          description: 'Built a configurable Multi-Layer Perceptron with architecture [13, 16, 8, 1] using only NumPy. Implemented He initialisation, ReLU hidden activations, sigmoid output, full forward and backward propagation, and gradient descent parameter updates.',
          learnings: [
            'He initialisation (W ~ N(0, √(2/n_in))) prevents vanishing/exploding gradients in ReLU networks — using plain random init caused the loss to plateau early.',
            'Backpropagation required careful shape management: each layer\'s gradient depends on the transposed weight matrix of the next layer, and off-by-one dimension errors are the most common bug.',
            'The MLP was significantly more sensitive to hyperparameters than logistic regression — too high a learning rate caused oscillating loss, too low meant convergence took thousands of extra epochs.',
          ],
        },
        {
          title: 'Evaluation Metrics — From Scratch',
          description: 'Implemented confusion matrix computation (TP, TN, FP, FN), accuracy, precision, recall, and F1 score manually without sklearn. Evaluated both models on the held-out test set.',
          learnings: [
            'The MLP improved recall from 92.4% to 95.2% — in a medical context, this means fewer missed heart disease cases, which is the clinically important metric.',
            'Precision dropped slightly for the MLP, indicating a precision-recall trade-off: the network was more aggressive at predicting disease, catching more true positives but also adding a few false positives.',
            'Writing metrics from scratch made the TP/FP/FN/TN definitions concrete — it\'s easy to confuse precision and recall until you manually count the quadrants.',
          ],
        },
        {
          title: 'Training Dynamics & Analysis',
          description: 'Plotted training loss curves, accuracy progression, and performance comparison charts. Analysed convergence behaviour, training time trade-offs, and when the added complexity of an MLP is justified.',
          learnings: [
            'Logistic regression converged in ~500 epochs and trained in under a second. The MLP needed 1,600+ epochs and was orders of magnitude slower — a concrete lesson in the bias-variance-compute trade-off.',
            'The MLP loss curve showed the network continued learning non-linear patterns long after the baseline had plateaued, confirming that hidden layers capture feature interactions (e.g., chest pain × exercise angina) that a linear boundary cannot.',
            'Overall conclusion: on structured tabular data with mild non-linearity, a shallow MLP offers modest but real improvement over logistic regression — but the linear baseline remains competitive and far more interpretable.',
          ],
        },
      ],
    },
    {
      id: 'cnn-image-classification',
      category: 'ai',
      title: 'CNN for Image Classification — Custom vs Transfer Learning',
      summary: 'Built a custom 4-layer CNN from scratch in PyTorch and compared it against a fine-tuned ResNet18 on the Kaggle Cats vs Dogs dataset (25,000 images). Both architectures use Global Average Pooling instead of large fully-connected layers. The transfer learning model outperformed the custom CNN in accuracy, precision, recall, and F1 — while training faster thanks to frozen backbone weights. The project demonstrates the full deep learning workflow: data augmentation, training loops, evaluation, confusion matrices, and a structured model comparison.',
      image: 'Projects/CNN-for-Image-Classification/single_slider.png',
      github: 'https://github.com/shray028/CNN-for-Image-Classification',
      tags: ['Python', 'PyTorch', 'ResNet18', 'CNN', 'Transfer Learning'],
      results: [
        { value: '2', label: 'Models Compared' },
        { value: 'GAP', label: 'Pooling Strategy' },
        { value: '25K', label: 'Images' },
      ],
      steps: [
        {
          title: 'Dataset Loading & Exploration',
          description: 'Downloaded the Kaggle Cats vs Dogs dataset (~25,000 images, 2 classes). Explored class distribution, visualised sample images, and computed image statistics (min/max dimensions, channel means). Confirmed the dataset is balanced, justifying accuracy as the primary metric.',
          learnings: [
            'Verified balanced class distribution (~12,500 per class), which means accuracy is a reliable metric — no need for weighted F1 or stratified sampling adjustments.',
            'Raw images had highly variable resolutions — some as small as 30×30, others over 500×500 — making a fixed resize to 224×224 essential before batching.',
            'A small number of corrupt/truncated files existed in the dataset and had to be filtered out during loading to prevent runtime crashes in the data pipeline.',
          ],
        },
        {
          title: 'Data Preprocessing & Augmentation',
          description: 'Resized all images to 224×224, normalised with ImageNet channel means/stds, and applied training-time augmentation (random horizontal flips, random rotations). Used an 85/15 train-test split with PyTorch DataLoaders for batched GPU loading.',
          learnings: [
            'Normalising with ImageNet statistics (mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) is essential when using pretrained ResNet — the backbone expects inputs in this distribution.',
            'Data augmentation (flips, rotations) was applied only to the training set — augmenting test data would corrupt evaluation by introducing artificial variance in predictions.',
            'PyTorch DataLoaders with num_workers and pin_memory significantly sped up GPU utilisation by overlapping data loading with forward/backward passes.',
          ],
        },
        {
          title: 'Custom CNN Architecture',
          description: 'Designed a 4-block CNN in PyTorch: Conv(3→32)→ReLU→MaxPool, Conv(32→64)→ReLU→MaxPool, Conv(64→128)→ReLU, Conv(128→256)→ReLU, followed by Global Average Pooling and a single Linear(256→2) classifier. Trained for 15 epochs with Adam (lr=0.001) and CrossEntropyLoss.',
          learnings: [
            'Global Average Pooling (GAP) replaces large fully-connected layers by averaging each feature map to a single value — drastically reducing parameters and acting as a structural regulariser against overfitting.',
            'Progressively doubling filter counts (32→64→128→256) lets early layers capture edges and textures while deeper layers learn higher-level patterns like ears and eyes.',
            'Using only 2 MaxPool layers (224→112→56) followed by GAP gave sufficient spatial reduction without losing too much spatial detail in the intermediate feature maps.',
          ],
        },
        {
          title: 'Transfer Learning with ResNet18',
          description: 'Loaded a pretrained ResNet18, froze all backbone layers, stripped the original avgpool + FC head, and attached a custom classification head: GAP → Linear(512→256) → ReLU → Dropout(0.4) → Linear(256→2). Only the new head was trained, using Adam and CrossEntropyLoss.',
          learnings: [
            'Freezing the backbone and using torch.no_grad() during the forward pass through ResNet eliminated gradient computation for millions of parameters — cutting training time substantially.',
            'Setting the backbone to eval mode was critical because ResNet contains BatchNorm layers — in train mode, BN would update running statistics using the new dataset, degrading the pretrained feature quality.',
            'Dropout(0.4) in the classification head prevented the small trainable head from overfitting to the training set, especially since the frozen features are already highly expressive.',
          ],
        },
        {
          title: 'Evaluation & Model Comparison',
          description: 'Evaluated both models on the held-out test set using accuracy, precision, recall, and F1. Generated confusion matrices and plotted training loss/accuracy curves. Compared convergence speed, parameter counts, and training time side-by-side.',
          learnings: [
            'Transfer learning outperformed the custom CNN across all metrics — pretrained ImageNet features already encode rich visual representations that a 15-epoch custom CNN cannot learn from scratch.',
            'The custom CNN\'s loss curve showed it was still improving at epoch 15, suggesting more epochs or a learning rate scheduler could close the gap — but training time would increase significantly.',
            'GAP made both models lightweight at the classification stage, but the custom CNN had far fewer backbone parameters — showing that architecture depth and pretrained knowledge matter more than parameter count alone.',
          ],
        },
      ],
    },
    {
      id: 'stock-price-forecasting',
      category: 'ai',
      title: 'Stock Price Forecasting — LSTM vs Transformer',
      summary: 'Implemented a stacked LSTM and a Transformer encoder from scratch in PyTorch to forecast AMX stock closing prices. Built custom sinusoidal positional encodings, multi-head self-attention, and sequence windowing — no pretrained models used. The Transformer achieved lower RMSE and higher R² than the LSTM, demonstrating how attention mechanisms capture long-range temporal dependencies more effectively than recurrent gating. Includes inverse-scaled evaluation, residual diagnostics, and a structured architecture comparison.',
      image: 'Projects/stock-Price-Forecasting/single_slider.png',
      github: 'https://github.com/shray028/stock-Price-Forecasting',
      tags: ['Python', 'PyTorch', 'LSTM', 'Transformer', 'Time Series'],
      results: [
        { value: '2', label: 'Models Compared' },
        { value: 'RMSE', label: 'Primary Metric' },
        { value: 'R²', label: 'Best: Transformer' },
      ],
      steps: [
        {
          title: 'Dataset Loading & Time Series Exploration',
          description: 'Loaded AMX stock price data from a hosted CSV. Explored the closing price series, checked for trends and stationarity, and visualised the full price history. Selected RMSE as the primary metric because it penalises large prediction errors — critical in financial forecasting.',
          learnings: [
            'Stock price data is inherently non-stationary (trending upward/downward over time), which means models must learn from relative changes and patterns rather than absolute levels.',
            'RMSE was chosen over MAE because squaring amplifies large errors — in stock trading, a single large misprediction can be far more costly than many small ones.',
            'Visualising the full time series revealed regime changes (volatile vs calm periods) that any model would need to adapt to during different test windows.',
          ],
        },
        {
          title: 'Preprocessing & Sequence Creation',
          description: 'Applied MinMaxScaler to normalise prices to [0, 1], created sliding-window sequences with a configurable lookback length and prediction horizon, and performed a temporal (non-shuffled) train-test split to prevent future data leakage.',
          learnings: [
            'Temporal splitting is mandatory for time series — random shuffling would leak future price information into training, producing unrealistically good metrics that collapse in production.',
            'MinMaxScaler was chosen over StandardScaler because stock prices are bounded and non-negative, making [0,1] normalisation more natural and preserving the proportional relationships.',
            'Sequence length (lookback window) directly controls how much history each prediction sees — too short misses trends, too long adds noise and slows training.',
          ],
        },
        {
          title: 'Stacked LSTM Implementation',
          description: 'Built a 2-layer stacked LSTM in PyTorch with hidden sizes [64, 32], dropout between layers, and a final Linear head. Trained with Adam (lr=0.001) and MSELoss. Used only the last timestep output from the second LSTM for prediction.',
          learnings: [
            'Stacking two LSTM layers lets the second layer learn higher-level temporal abstractions from the first layer\'s output sequence — similar to how deeper CNN layers learn progressively abstract features.',
            'Taking only the last timestep output (out[:, -1, :]) for prediction forces the network to compress the entire lookback window into a fixed-size representation — a bottleneck that encourages learning the most informative temporal features.',
            'Dropout between LSTM layers acts as temporal regularisation — randomly zeroing hidden units prevents the network from memorising specific price sequences seen during training.',
          ],
        },
        {
          title: 'Transformer Encoder with Positional Encoding',
          description: 'Implemented a Transformer encoder with custom sinusoidal positional encodings (sin/cos), input projection to d_model dimensions, multi-head self-attention, feedforward layers, and a final Linear output. No pretrained weights — built entirely from PyTorch primitives.',
          learnings: [
            'Sinusoidal positional encoding (PE(pos, 2i) = sin(pos/10000^(2i/d))) injects order information without learnable parameters — essential because Transformers process all positions in parallel and have no built-in notion of sequence order.',
            'Multi-head attention computes relevance scores between all time steps simultaneously, allowing the model to directly attend to distant past events — unlike LSTMs which must propagate information step-by-step through hidden states.',
            'The input projection (Linear(n_features → d_model)) maps raw features into the attention space — the Transformer operates in d_model dimensions throughout, so this alignment step is structurally necessary.',
          ],
        },
        {
          title: 'Evaluation & Architecture Comparison',
          description: 'Evaluated both models on the held-out test set using MAE, RMSE, MAPE, and R². Inverse-transformed predictions back to original price scale for meaningful comparison. Plotted actual vs predicted curves, residual distributions, and training loss convergence for both architectures side-by-side.',
          learnings: [
            'The Transformer achieved lower RMSE and higher R² than the LSTM, confirming that attention-based global dependency modelling outperforms sequential gating on this dataset — especially for capturing long-range price patterns.',
            'The Transformer had significantly more parameters and longer training time than the LSTM — a concrete demonstration that attention\'s superior modelling power comes with higher computational cost.',
            'Residual analysis showed both models produced approximately zero-mean residuals, but the Transformer\'s residual distribution was tighter (lower variance), indicating more consistent predictions across different market conditions.',
          ],
        },
      ],
    },
    {
      id: 'nlp-resume-classification',
      category: 'ml',
      title: 'Intelligent Resume Screening — Full NLP Pipeline',
      summary: 'Built a 7-phase NLP pipeline that classifies resumes into 24 job categories. Phases include an LSTM language model for next-word prediction, Word2Vec Skip-gram embeddings, spaCy POS tagging for skill extraction, a custom HMM with Viterbi decoding for POS and section segmentation, dependency parsing for SVO relationship extraction, and a soft-voting ensemble (LinearSVC + Random Forest + Logistic Regression) over a 10,211-feature stack (TF-IDF + Word2Vec + POS + parse features). The ensemble achieved 97%+ classification accuracy across 24 categories on 2,484 resumes.',
      image: 'Projects/NLP_resume_classification/single_slider.png',
      github: 'https://github.com/shray028/NLP_resume_classification',
      tags: ['Python', 'PyTorch', 'spaCy', 'Word2Vec', 'HMM', 'NLP'],
      results: [
        { value: '97%+', label: 'Ensemble Accuracy' },
        { value: '24', label: 'Job Categories' },
        { value: '7', label: 'Pipeline Phases' },
      ],
      steps: [
        {
          title: 'Phase 0 — Data Loading & Preprocessing',
          description: 'Loaded 2,484 resumes across 24 job categories from a Kaggle dataset. Cleaned HTML tags, URLs, emails, phone numbers, and special characters. Tokenised into words and sentences, label-encoded categories, and performed a stratified 80/20 train-test split.',
          learnings: [
            'Stratified splitting was essential because some categories (e.g., BPO with 22 samples, Automobile with 36) are severely underrepresented — random splitting could leave entire classes out of the test set.',
            'Dropping the Resume_html column immediately saved ~25 MB of RAM — a practical consideration when running on Colab\'s free tier with limited memory.',
            'Heavy NLP processing (lemmatisation, POS, parsing) was deferred to later phases rather than done upfront — this avoids wasting compute on features that might not be needed if earlier phases are cached.',
          ],
        },
        {
          title: 'Phase 1 — LSTM Neural Language Model',
          description: 'Trained a 2-layer LSTM language model (embedding dim=128, hidden dim=256, ~4.5M parameters) on the resume corpus for next-word prediction. Used sliding-window sequences of length 10 and evaluated with perplexity on the test set.',
          learnings: [
            'The LSTM language model learns resume-specific language patterns — given a prompt like "experienced in project", it predicts domain-relevant continuations like "management" or "development", confirming it captured the resume vocabulary.',
            'Perplexity on the test set measured how well the model generalises to unseen resume text — lower perplexity means the model assigns higher probability to the actual next words.',
            'LSTM was chosen over a Transformer for the language model because the moderate corpus size (~1.5M sequences) doesn\'t justify the attention mechanism\'s quadratic memory cost — LSTMs are more parameter-efficient at this scale.',
          ],
        },
        {
          title: 'Phase 2 & 3 — Word2Vec Embeddings & POS Tagging',
          description: 'Trained Word2Vec Skip-gram (dim=200) via Gensim on the resume corpus to produce dense word and document vectors. Applied spaCy\'s POS tagger to extract action verbs, skills/technologies (NOUN/PROPN + keyword matching), and qualifications from every resume.',
          learnings: [
            'TF-IDF-weighted document averaging produced better document vectors than simple mean pooling — weighting by term importance ensures rare but informative words (like specific technologies) contribute more to the resume\'s semantic representation.',
            'Skip-gram was chosen over CBOW because it better captures semantic relationships in moderate-sized corpora — important for distinguishing domain-specific terms like "kubernetes" vs "docker" vs "terraform".',
            'spaCy\'s POS tagger (~97% accuracy, 10x faster than NLTK) extracted structured features: skill count, action verb count, and qualification count per resume — turning unstructured text into numerical classification features.',
          ],
        },
        {
          title: 'Phase 4 & 5 — HMM & Dependency Parsing',
          description: 'Built a custom Hidden Markov Model with Viterbi decoding for POS tagging and resume section segmentation (HEADER, OBJECTIVE, EXPERIENCE, EDUCATION, SKILLS). Used spaCy dependency parsing to extract SVO triples, skill-experience links, and education information from dependency trees.',
          learnings: [
            'The custom HMM POS tagger was compared against spaCy\'s neural tagger — showing per-tag accuracy differences that highlight where probabilistic sequence models struggle vs neural approaches.',
            'HMM section segmentation treated resume sections as hidden states and word-level features (keywords, capitalisation, position) as observations — a classic application of sequence labelling to document structure.',
            'Dependency parsing extracted "who did what" relationships (SVO triples) and skill-action links — these structural features capture information that bag-of-words approaches like TF-IDF completely miss.',
          ],
        },
        {
          title: 'Phase 6 & 7 — Classification Ensemble & End-to-End Pipeline',
          description: 'Combined 10,211 features (TF-IDF 10K unigrams+bigrams, Word2Vec 200-dim, POS 7 features, parse 4 features) into a unified feature matrix. Trained LinearSVC (C=5.0), Random Forest (balanced class weights), and Logistic Regression (L2). Combined via soft voting ensemble. Built a unified analyze_resume() function that runs all 7 phases on raw text.',
          learnings: [
            'The soft voting ensemble achieved 97%+ accuracy by combining three complementary classifiers: LinearSVC excels on the high-dimensional sparse TF-IDF space, Random Forest captures non-linear feature interactions, and Logistic Regression provides well-calibrated probabilities.',
            'Feature ablation confirmed that TF-IDF alone reaches ~95% — the additional 2% from Word2Vec + POS + parse features represents the value of semantic and structural NLP over pure bag-of-words.',
            'The end-to-end pipeline processes a raw resume string through all 7 phases in sequence, producing a predicted job category, confidence score, extracted skills, perplexity score, and semantic similarity to category centroids.',
          ],
        },
      ],
    },
    {
      id: 'autosar-rag-chatbot',
      category: 'ml',
      title: 'AUTOSAR RAG Chatbot — Production RAG with Microservices',
      summary: 'Built a Retrieval-Augmented Generation system that ingests thousands of pages of AUTOSAR BSW specification PDFs and answers natural language questions with citation-backed responses. The backend uses FastAPI with a microservices architecture (Ingestion, Retrieval, Inference services), ChromaDB as the vector store, Ollama for local LLM inference and embeddings (nomic-embed-text + llama3.2), semantic chunking that preserves AUTOSAR section hierarchy and requirement IDs, cross-encoder re-ranking, anti-hallucination prompt guardrails, and a feedback loop for continuous improvement. Includes heartbeat monitoring, circuit breakers, and structured logging.',
      image: 'Projects/Autosar_rag_chatbot/single_slider.png',
      github: 'https://github.com/shray028/Autosar_rag_chatbot',
      tags: ['Python', 'FastAPI', 'ChromaDB', 'Ollama', 'RAG', 'Microservices'],
      results: [
        { value: 'RAG', label: 'Architecture' },
        { value: '<3s', label: 'Query Latency' },
        { value: '3', label: 'Microservices' },
      ],
      steps: [
        {
          title: 'Foundation & Infrastructure',
          description: 'Set up a FastAPI application scaffold with CORS, structured JSON logging, and environment configuration. Configured Ollama to serve both the embedding model (nomic-embed-text, 768-dim) and the LLM (llama3.2) locally. Initialised ChromaDB with persistent storage and cosine similarity indexing.',
          learnings: [
            'Running both the embedding model and LLM locally via Ollama eliminates API costs and data-privacy concerns — critical for proprietary AUTOSAR specifications that cannot be sent to external APIs.',
            'Separating embedding and LLM model configuration into environment variables (.env) allows swapping models (e.g., mistral instead of llama3.2) without code changes.',
            'A /health endpoint that checks Ollama model availability and ChromaDB connectivity provides the baseline for the heartbeat monitoring implemented in later phases.',
          ],
        },
        {
          title: 'Document Ingestion Pipeline',
          description: 'Built a PDF ingestion pipeline: PyMuPDF extracts text preserving section hierarchy, a semantic chunker splits by AUTOSAR headings with configurable chunk size (512 tokens) and overlap (50 tokens), nomic-embed-text generates 768-dim vectors, and metadata enrichment attaches source document, page numbers, module names, and requirement IDs (SWS tags) to each chunk before indexing into ChromaDB.',
          learnings: [
            'Semantic chunking by AUTOSAR section headings (e.g., "7.1.2 Com_Init", "[SWS_Com_00432]") preserves the logical structure of the specification — naive fixed-size chunking would split mid-requirement, producing incoherent retrieval results.',
            'Chunk overlap (50 tokens) ensures that information at chunk boundaries is not lost — a requirement that starts at the end of one chunk is fully captured in the next.',
            'Idempotent ingestion (re-ingesting the same document replaces old embeddings) prevents duplicate chunks from polluting search results when specifications are updated.',
          ],
        },
        {
          title: 'Retrieval & Reasoning Engine (RAG Core)',
          description: 'Implemented the full RAG query pipeline: query embedding → top-k semantic search (k=10) → cross-encoder re-ranking via the LLM → context assembly ordered by document position → prompt construction with AUTOSAR domain instructions, anti-hallucination guardrails, and citation markers → streamed LLM inference with confidence scoring.',
          learnings: [
            'Cross-encoder re-ranking using the LLM itself scores each retrieved chunk for query relevance, then selects the top 5 — this dramatically improves precision over raw embedding similarity alone, especially for technical queries where lexical overlap is misleading.',
            'Anti-hallucination guardrails in the system prompt instruct the LLM to say "I don\'t have enough context" rather than fabricate answers — essential for a technical reference system where incorrect specifications could cause safety-critical bugs.',
            'Ordering re-ranked chunks by their original document position (not relevance score) in the assembled context helps the LLM produce coherent answers that follow the specification\'s logical flow.',
          ],
        },
        {
          title: 'Microservices Architecture',
          description: 'Decomposed the monolith into three microservices: Ingestion Service (PDF upload, parsing, chunking, embedding), Retrieval Service (query processing, semantic search, re-ranking), and LLM Inference Service (Ollama interaction, prompt construction, response generation). Added inter-service REST communication, heartbeat monitoring (30s intervals), and circuit breaker patterns for Ollama calls.',
          learnings: [
            'Separating ingestion from retrieval allows scaling them independently — ingestion is CPU/IO-heavy and bursty (batch uploads), while retrieval is latency-sensitive and steady (user queries).',
            'The circuit breaker pattern on Ollama calls prevents cascading failures — if the LLM is slow or unresponsive, the system returns a graceful error instead of queuing requests until memory exhaustion.',
            'Heartbeat monitoring on each service enables proactive detection of degradation (e.g., embedding model unresponsive, ChromaDB disk full) before users notice query failures.',
          ],
        },
        {
          title: 'Feedback Loop & Quality',
          description: 'Implemented a user feedback mechanism to rate answer quality, integrated structured logging and observability for monitoring retrieval precision and latency, and added a test suite with pytest. The feedback loop enables future re-ranking optimisation based on real user signals.',
          learnings: [
            'Storing user feedback (thumbs up/down + optional correction) alongside the query, retrieved chunks, and generated answer creates a labelled dataset for future retrieval and ranking improvements — turning the system into a learning loop.',
            'Structured JSON logging with query latency, chunk count, confidence score, and model used per request provides the observability needed to diagnose quality issues in production.',
            'Pytest-based integration tests that ingest a sample PDF and verify end-to-end query-answer quality ensure that model or prompt changes don\'t silently degrade answer accuracy.',
          ],
        },
      ],
    },
  ];

  /* ----------------------------------------------------------
     RENDER PROJECT TILES (zig-zag)
     ---------------------------------------------------------- */
  const projectTilesContainer = document.getElementById('project-tiles');
  const projectDetailOverlay = document.getElementById('project-detail-overlay');
  const projectDetailBack = document.getElementById('project-detail-back');
  const projectDetailTitle = document.getElementById('project-detail-title');
  const projectDetailGithub = document.getElementById('project-detail-github');
  const projectDetailScroll = document.getElementById('project-detail-scroll');

  function renderProjectTiles() {
    projectTilesContainer.innerHTML = '';

    // Define display order
    const projectOrder = [
      'autosar-rag-chatbot', 'nlp-resume-classification', 'breast-cancer', 'bike-sharing',
      'stock-price-forecasting', 'cnn-image-classification', 'linear-vs-mlp',
    ];
    const orderedProjects = projectOrder
      .map((id) => PROJECTS.find((p) => p.id === id))
      .filter(Boolean)
      .concat(PROJECTS.filter((p) => !projectOrder.includes(p.id)));

    const activeFilter = document.querySelector('.project-filter-btn.active');
    const filter = activeFilter ? activeFilter.dataset.filter : 'all';

    const categories = [
      { key: 'ml', label: 'ML ENGINEERING', description: 'End-to-end pipelines, deployments, and production systems' },
      { key: 'ai', label: 'AI / DEEP LEARNING', description: 'Algorithm implementations, architecture comparisons, and concept explorations' },
    ];

    let globalIndex = 0;

    categories.forEach((cat) => {
      if (filter !== 'all' && filter !== cat.key) return;
      const catProjects = orderedProjects.filter((p) => p.category === cat.key);
      if (!catProjects.length) return;

      const header = document.createElement('div');
      header.className = 'project-category-header';
      header.innerHTML = '<span class="section-eyebrow">' + cat.label + '</span><p>' + cat.description + '</p>';
      projectTilesContainer.appendChild(header);

      catProjects.forEach((project) => {
        const index = PROJECTS.indexOf(project);
        const tile = document.createElement('div');
        tile.className = 'project-tile';
        tile.dataset.projectId = project.id;

      const tagsHtml = project.tags.map((t) => `<span class="ptag">${t}</span>`).join('');

      tile.innerHTML = `
        <div class="project-tile-image" data-project-idx="${index}">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <span class="image-click-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            View Project
          </span>
        </div>
        <div class="project-tile-content">
          <h3>${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
          <div class="project-tags">${tagsHtml}</div>
          <div class="project-ctas">
            <button class="project-cta primary" data-project-idx="${index}">
              View Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a class="project-cta secondary" href="${project.github}" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              Source Code
            </a>
          </div>
        </div>
      `;

      projectTilesContainer.appendChild(tile);

      // Animate in after a short delay
      requestAnimationFrame(() => {
        setTimeout(() => tile.classList.add('visible'), globalIndex * 120 + 100);
      });
      globalIndex++;
      });
    });

    // Attach click handlers
    projectTilesContainer.querySelectorAll('[data-project-idx]').forEach((el) => {
      if (el.tagName === 'A') return; // Skip github links
      el.addEventListener('click', (e) => {
        if (e.target.closest('a')) return; // Don't intercept anchor clicks
        const idx = parseInt(el.dataset.projectIdx, 10);
        openProjectDetail(PROJECTS[idx]);
      });
    });
  }

  // Filter button listeners
  document.querySelectorAll('.project-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.project-filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjectTiles();
    });
  });

  /* ----------------------------------------------------------
     PROJECT DETAIL OVERLAY
     ---------------------------------------------------------- */
  let currentProject = null;

  function openProjectDetail(project, skipHash) {
    currentProject = project;
    projectDetailTitle.textContent = project.title;
    projectDetailGithub.href = project.github;
    if (!skipHash) setHash('projects/' + project.id);

    // Build detail content
    const checkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

    let html = '';

    // Detail Hero
    html += '<div class="detail-hero">';
    html += '<div class="detail-eyebrow">END-TO-END ML PROJECT</div>';
    html += '<h1>' + project.title + '</h1>';
    html += '<p>' + project.summary + '</p>';
    html += '</div>';

    // Detail Image
    html += '<div class="detail-image">';
    html += '<img src="' + project.image + '" alt="' + project.title + ' Pipeline Overview">';
    html += '</div>';

    // Results Banner
    if (project.results && project.results.length) {
      html += '<div class="results-banner"><div class="results-banner-inner">';
      project.results.forEach((r) => {
        html += '<div class="result-stat">';
        html += '<div class="rs-value">' + r.value + '</div>';
        html += '<div class="rs-label">' + r.label + '</div>';
        html += '</div>';
      });
      html += '</div></div>';
    }

    // Pipeline Steps
    html += '<div class="pipeline-section">';
    html += '<h2>Pipeline Steps & Learnings</h2>';

    project.steps.forEach((step, i) => {
      html += '<div class="step-card">';
      html += '<div class="step-header">';
      html += '<span class="step-number">' + (i + 1) + '</span>';
      html += '<h3>' + step.title + '</h3>';
      html += '</div>';
      html += '<p class="step-description">' + step.description + '</p>';
      html += '<div class="step-learnings">';
      html += '<h4>Key Learnings</h4>';
      step.learnings.forEach((l) => {
        html += '<div class="learning-item">' + checkSvg + '<span>' + l + '</span></div>';
      });
      html += '</div></div>';
    });

    html += '</div>';

    // GitHub CTA at bottom
    html += '<div class="detail-github">';
    html += '<a class="github-cta" href="' + project.github + '" target="_blank" rel="noopener">';
    html += '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>';
    html += 'View on GitHub';
    html += '</a>';
    html += '</div>';

    projectDetailScroll.innerHTML = html;
    projectDetailScroll.scrollTop = 0;
    projectDetailOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectDetail(skipHash) {
    projectDetailOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (!skipHash) setHash('projects');
    currentProject = null;
  }

  projectDetailBack.addEventListener('click', () => closeProjectDetail());

  /* ----------------------------------------------------------
     GLOBAL KEY HANDLERS
     ---------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectDetailOverlay.classList.contains('open')) closeProjectDetail();
      else if (iframeOverlay.classList.contains('open')) closeIframe();
      else if (theoryOverlay.classList.contains('open')) closeTheory();
    }
  });

  /* ----------------------------------------------------------
     SCROLL REVEAL
     ---------------------------------------------------------- */
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------
     HASH ROUTING
     ---------------------------------------------------------- */
  function setHash(path) {
    history.pushState(null, '', '#' + path);
  }

  function navigate(sectionId, skipHash) {
    switchSection(sectionId);
    if (!skipHash) setHash(sectionId);
  }

  function handleRoute() {
    const hash = location.hash.replace('#', '');
    const parts = hash.split('/');

    // Close any open overlays first
    if (projectDetailOverlay.classList.contains('open')) closeProjectDetail(true);
    if (iframeOverlay.classList.contains('open')) closeIframe();
    if (theoryOverlay.classList.contains('open')) closeTheory();

    if (parts[0] === 'subjects') {
      switchSection('subjects');
      if (parts[1]) {
        const subject = SUBJECTS.find((s) => s.id === parts[1]);
        if (subject) openSubject(subject, true);
      } else {
        // Show subjects list
        if (currentSubject) closeSubject(true);
      }
    } else if (parts[0] === 'projects') {
      switchSection('projects');
      if (parts[1]) {
        const project = PROJECTS.find((p) => p.id === parts[1]);
        if (project) openProjectDetail(project, true);
      }
    } else {
      // Default: show projects
      switchSection('projects');
    }
  }

  window.addEventListener('popstate', handleRoute);

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  renderSubjectsList();
  renderProjectTiles();
  updateStats();

  // Restore view from URL hash on first load
  if (location.hash) {
    handleRoute();
  } else {
    switchSection('projects');
  }

  requestAnimationFrame(() => initScrollReveal());
})();

