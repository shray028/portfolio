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

  /* ----------------------------------------------------------
     TAB SWITCHING
     ---------------------------------------------------------- */
  function switchSection(sectionId) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
    if (sectionId === 'subjects') {
      subjectsSection.classList.add('active');
      projectsSection.classList.remove('active');
    } else {
      projectsSection.classList.add('active');
      subjectsSection.classList.remove('active');
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchSection(link.dataset.section);
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
  function openSubject(subject) {
    currentSubject = subject;
    subjectsList.classList.add('hidden');
    topicsView.classList.remove('hidden');

    topicsEyebrow.textContent = subject.code;
    topicsTitle.textContent = subject.title;

    renderConceptGroups(subject);
    updateProgress(subject);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeSubject() {
    topicsView.classList.add('hidden');
    subjectsList.classList.remove('hidden');
    conceptContainer.innerHTML = '';
    currentSubject = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backToSubjectsBtn.addEventListener('click', closeSubject);

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

    card.addEventListener('click', () => {
      if (hasInteractive) {
        openIframe(topic, subjectFolder);
      } else {
        openTheory(topic, subjectAccent);
      }
    });

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
      window.MathJax.typesetPromise([container]).catch(() => {});
    } else {
      const mjScript = document.getElementById('MathJax-script');
      if (mjScript) {
        mjScript.addEventListener('load', () => {
          if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([container]).catch(() => {});
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
     GLOBAL KEY HANDLERS
     ---------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (iframeOverlay.classList.contains('open')) closeIframe();
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
    document.getElementById('stat-projects').textContent = 'Soon';
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  renderSubjectsList();
  updateStats();
  requestAnimationFrame(() => initScrollReveal());
})();
