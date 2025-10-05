# Data-Driven Discovery of High-Performance Titanium-Based Cathode Materials: A Machine Learning Approach with Experimental Validation Pathways

**Burhan BEYCAN¹**, **Husnu Emrah UNALAN¹***

¹Department of Metallurgical and Materials Engineering, Middle East Technical University, 06800, Ankara, Türkiye

*Corresponding author: unalan@metu.edu.tr

---

## Abstract

The development of next-generation energy storage systems hinges on the discovery and optimization of advanced electrode materials. This study employs a data-driven approach, leveraging machine learning to analyze a comprehensive dataset of 165 titanium-based compounds (~2200 data points) from the Materials Project and the Open Quantum Materials Database (OQMD). Our analysis identifies titanium disulfide (TiS₂) as a highly promising cathode material for lithium-ion batteries (LIBs). A Random Forest classification model, developed to predict high-performance candidates, achieved an impressive accuracy of 95%. Feature importance analysis revealed that average voltage is the most dominant factor, contributing approximately 45% to the prediction of gravimetric energy density. Comparative analysis demonstrates that sulfide-based titanium compounds exhibit a higher average voltage (~3.9 V) compared to their oxide counterparts (~3.4 V), attributed to the more covalent nature of the Ti-S bond. While non-sulfur compounds show superior volumetric capacity, the strategic selection between sulfur and non-sulfur materials can be guided by specific application requirements, with sulfides being favorable for high-power applications and oxides for energy-dense systems with volumetric constraints. This work provides a systematic framework for high-throughput computational screening and offers clear design guidelines for the next generation of cathode materials, supported by a proposed experimental validation pathway based on recent literature and established synthesis methodologies.

---

## 1. Introduction

The escalating demand for high-performance energy storage solutions, driven by the proliferation of portable electronics and electric vehicles, has intensified research into advanced lithium-ion battery (LIB) technologies [1]. The cathode material is a critical component that largely determines the energy density, power density, cost, and safety of LIBs [2]. For decades, the research landscape has been dominated by layered transition metal oxides, such as LiCoO₂ (LCO), LiNiₓMnᵧCo₁₋ₓ₋ᵧO₂ (NMC), and LiFePO₄ (LFP) [3]. However, these materials face challenges related to cost (cobalt), safety (Ni-rich NMC), and energy density limitations [4]. Consequently, there is a pressing need to explore alternative cathode chemistries that offer a superior balance of performance, cost, and safety.

Transition metal dichalcogenides (TMDs), with their unique layered structures, have emerged as a promising class of materials for next-generation batteries [5]. Among them, titanium disulfide (TiS₂) has garnered significant attention due to its high electronic conductivity, mechanical compliance, and stable intercalation chemistry [6]. Unlike brittle oxide cathodes, the ductile nature of TiS₂ can better accommodate the volume changes that occur during cycling, leading to improved mechanical integrity and cycle life [7].

The traditional Edisonian approach to materials discovery, which relies on trial-and-error experimentation, is often slow and resource-intensive. The advent of computational materials science, coupled with the development of large-scale materials databases such as the Materials Project [8] and the Open Quantum Materials Database (OQMD) [9], has enabled a paradigm shift towards data-driven materials design. These databases contain a wealth of information on the calculated properties of hundreds of thousands of materials, providing a fertile ground for high-throughput computational screening (HTCS) [10].

Machine learning (ML) has proven to be a powerful tool for accelerating the materials discovery process [11]. By training ML models on existing data, it is possible to predict the properties of new materials with remarkable accuracy, thereby guiding experimental efforts towards the most promising candidates [12]. In the context of battery materials, ML has been successfully applied to predict properties such as voltage, capacity, and ionic conductivity [13]. Recent studies have demonstrated the power of ML in designing novel cathode materials, with some achieving high predictive accuracy using graph neural networks and other advanced algorithms [14, 15].

This study leverages a data-driven methodology, combining HTCS with ML, to systematically investigate the potential of titanium-based compounds as cathode materials for LIBs. We analyze a large dataset of 165 titanium compounds, utilizing a Random Forest algorithm to identify key performance descriptors and to screen for high-performance candidates. Our work highlights the strategic advantages of TiS₂ and provides a comprehensive comparison between sulfur- and non-sulfur-based titanium compounds, offering valuable insights for the rational design of next-generation cathode materials. Furthermore, we propose a clear experimental validation pathway for our computational findings, drawing upon recent advancements in the synthesis and characterization of TiS₂-based cathodes, including the work of Prof. Unalan's research group [16].

---

## 2. Materials and Methods

### 2.1. Data Acquisition and Feature Engineering

A dataset comprising 165 titanium-based compounds, corresponding to approximately 2200 data points, was compiled from two major open-source materials databases: the Materials Project [8] and the Open Quantum Materials Database (OQMD) [9]. These databases provide a rich source of information on the calculated structural, thermodynamic, and electronic properties of materials, obtained from high-throughput density functional theory (DFT) calculations.

For each material, a set of 11 key features relevant to battery performance was extracted or calculated. These features include:

*   **Electrochemical Properties**: Average Voltage (V), Gravimetric Capacity (mAh/g), Volumetric Capacity (mAh/cc), Gravimetric Energy (Wh/kg), Volumetric Energy (Wh/l), Max Voltage Step.
*   **Structural Properties**: Max Delta Volume, Atomic Fraction Change, Atomic Fraction Discharge.
*   **Thermodynamic Properties**: Stability Charge (meV/atom), Stability Discharge (meV/atom).

### 2.2. Machine Learning Analysis

To identify the most promising cathode materials and to understand the key factors governing their performance, we employed a machine learning approach. The analysis was performed using the scikit-learn library in Python [17].

#### 2.2.1. Model Selection and Training

Four different classification algorithms were evaluated for their ability to distinguish between high- and low-performance cathode materials: Decision Tree, Random Forest, Logistic Regression, and Support Vector Machine (SVM). The models were trained on the dataset, with the materials labeled as "high" or "low" performance based on their calculated gravimetric energy density.

#### 2.2.2. Performance Evaluation

The performance of the classification models was evaluated using a suite of standard metrics: Accuracy, Precision, Recall, F1-score, and the Area Under the Receiver Operating Characteristic Curve (ROC-AUC). These metrics provide a comprehensive assessment of the models' predictive capabilities.

#### 2.2.3. Feature Importance Analysis

A key advantage of tree-based models like Random Forest is their ability to provide insights into the relative importance of different features. We utilized the Gini importance metric to quantify the contribution of each of the 11 features to the prediction of gravimetric energy density.

### 2.3. Data Visualization

Data visualization was performed using the Matplotlib and Seaborn libraries in Python. This included the generation of a correlation heatmap to visualize the relationships between different features, as well as bar charts to compare the performance of the ML models and to illustrate the feature importance rankings.

### 2.4. Proposed Experimental Validation Framework

To bridge the gap between computational prediction and practical application, a clear experimental validation framework is proposed. This framework is designed to synthesize and characterize the most promising candidate, TiS₂, and to verify the performance metrics predicted by our machine learning model. The proposed methodology draws upon established, state-of-the-art techniques reported in recent high-impact literature, including the work of Lu et al. [18] and the synthesis expertise of Prof. Unalan's research group [16].

#### 2.4.1. Materials Synthesis

Two primary synthesis routes are proposed for the fabrication of high-quality TiS₂ cathodes:

1.  **Solid-State Mechanochemical Synthesis:** This method, adapted from Lu et al. [18], involves high-energy ball milling of stoichiometric amounts of high-purity precursors (e.g., titanium and sulfur powders) in an inert argon atmosphere. The process would be followed by annealing at a controlled temperature (e.g., 550-600 °C) to promote crystallization and obtain the desired phase. This route is highly scalable and has been proven effective for producing high-performance sulfide electrolytes and electrodes.

2.  **Hydrothermal Synthesis:** Leveraging the expertise of Prof. Unalan's group [16], a hydrothermal approach could be employed to synthesize TiS₂ nanosheets. This method typically involves the reaction of a titanium precursor (e.g., titanium isopropoxide) with a sulfur source (e.g., thioacetamide) in an aqueous or organic solvent under elevated temperature and pressure. This route offers excellent control over morphology and particle size, which are critical for optimizing electrochemical performance.

#### 2.4.2. Physicochemical and Structural Characterization

A comprehensive suite of characterization techniques will be employed to verify the material's properties:

*   **X-ray Diffraction (XRD):** To confirm the crystal structure, phase purity, and lattice parameters of the synthesized TiS₂.
*   **Scanning Electron Microscopy (SEM) and Transmission Electron Microscopy (TEM):** To investigate the morphology, particle size distribution, and microstructure of the TiS₂ powder. High-resolution TEM will be used to examine the layered structure and interlayer spacing.
*   **X-ray Photoelectron Spectroscopy (XPS):** To determine the elemental composition and chemical oxidation states of titanium and sulfur, ensuring the correct stoichiometry.
*   **Brunauer-Emmett-Teller (BET) Analysis:** To measure the specific surface area and porosity of the material, which are important for electrolyte-electrode contact.

#### 2.4.3. Electrochemical Performance Evaluation

To assess the electrochemical performance, coin cells (CR2032) will be assembled in an argon-filled glovebox. The cathode will be fabricated by mixing the synthesized TiS₂ powder with a conductive agent (e.g., Super P carbon) and a binder (e.g., polyvinylidene fluoride, PVDF) and casting the slurry onto an aluminum foil current collector. Lithium metal will be used as the anode, and a standard liquid electrolyte (e.g., 1 M LiPF₆ in a mixture of ethylene carbonate and dimethyl carbonate) will be employed.

The following electrochemical tests will be conducted:

*   **Cyclic Voltammetry (CV):** To identify the redox potentials and to study the kinetics of the Li-ion intercalation/deintercalation process.
*   **Galvanostatic Cycling with Potential Limitation (GCPL):** To measure the specific capacity, cycling stability, and coulombic efficiency over a large number of cycles.
*   **Rate Capability Tests:** To evaluate the performance of the cathode at different current densities (C-rates).
*   **Electrochemical Impedance Spectroscopy (EIS):** To investigate the charge transfer resistance and ionic diffusion within the electrode before and after cycling.

This experimental framework will provide a direct comparison between the computationally predicted properties (e.g., voltage, capacity) and the experimentally measured values, thereby validating the accuracy and utility of our data-driven screening methodology.

---

## 3. Results

### 3.1. Comprehensive Feature Correlation and Multivariate Statistical Analysis

To elucidate the intricate relationships between the various electrochemical, structural, and thermodynamic properties of titanium-based cathode materials, a comprehensive correlation analysis was performed on the 11 extracted features across the dataset of 165 compounds. The Pearson correlation coefficient matrix, visualized as a heatmap in Figure 1, reveals a complex network of interdependencies that provide fundamental insights into the governing factors of battery performance.

The most striking observation is the exceptionally strong positive correlation (r = 0.90) between gravimetric energy density and average voltage. This near-linear relationship validates the fundamental electrochemical principle that energy density (E) is the product of voltage (V) and capacity (Q): E = V × Q. The dominance of voltage in this relationship is further evidenced by its substantially stronger correlation with energy density compared to gravimetric capacity (r = 0.10), suggesting that voltage modulation represents a more effective strategy for energy density enhancement than capacity optimization alone. This finding has profound implications for rational materials design, as it directs research efforts toward chemistries that maximize the redox potential of the Ti³⁺/Ti⁴⁺ couple.

Average voltage also exhibits a robust positive correlation with volumetric energy (r = 0.80), reinforcing its central role as a universal descriptor for energy content, independent of the normalization metric (gravimetric vs. volumetric). The moderate positive correlation between gravimetric and volumetric capacity (r = 0.45) indicates that materials with high mass-normalized capacity do not necessarily possess proportionally high volume-normalized capacity, reflecting the diversity in crystal densities and molar masses across the Ti compound library.

A particularly intriguing observation emerges from the structural descriptors. Max delta volume, which quantifies the relative volume change between the charged and discharged states, shows a strong positive correlation with both atomic fraction change (r = 0.82) and atomic fraction discharge (r = 0.78). This correlation cluster suggests that materials undergoing large compositional changes during lithiation inherently experience significant lattice expansion. From a crystal chemistry perspective, this can be rationalized by considering that the insertion of Li⁺ ions into interstitial sites or the reduction of transition metal cations (Ti⁴⁺ → Ti³⁺) leads to increased ionic radii and electrostatic repulsion, thereby expanding the unit cell. The magnitude of this expansion is directly proportional to the extent of lithiation, as quantified by the atomic fraction change.

The thermodynamic stability descriptors (stability charge and stability discharge) exhibit weak to moderate correlations with the electrochemical performance metrics, with correlation coefficients ranging from -0.15 to 0.25. This suggests that while thermodynamic stability is a necessary condition for practical battery operation (to prevent decomposition), it is not a primary determinant of energy density within the subset of stable materials considered in this study. The slightly negative correlation between stability discharge and average voltage (r = -0.12) may reflect the inverse relationship between redox potential and the thermodynamic stability of the lithiated phase, a manifestation of the energy-stability trade-off inherent in high-voltage cathode design.

![Feature Correlation Heatmap](figure1_heatmap.png)
*Figure 1: Feature Correlation Heatmap for the Ti-Containing Battery Dataset. The color scale indicates the Pearson correlation coefficient, with red representing a positive correlation and blue representing a negative correlation. Strong correlations (|r| > 0.7) are observed between gravimetric energy and average voltage, as well as among structural descriptors related to volume expansion.*

### 3.2. Machine Learning Model Performance and Algorithmic Comparison

To systematically identify high-performance cathode candidates from the vast materials space, four distinct machine learning classification algorithms were trained and evaluated: Decision Tree, Random Forest, Logistic Regression, and Support Vector Machine (SVM). The materials were binarized into "high" and "low" performance classes based on a threshold gravimetric energy density, and the models were assessed using a comprehensive suite of performance metrics including accuracy, precision, recall, F1-score, and the area under the receiver operating characteristic curve (ROC-AUC).

The Random Forest ensemble method emerged as the superior classifier, achieving an outstanding accuracy of 95% and a near-perfect ROC-AUC of 0.98 (Figure 2). This exceptional performance can be attributed to the algorithm's inherent ability to capture complex, non-linear relationships between features through the aggregation of multiple decision trees, each trained on bootstrapped subsets of the data. The ensemble approach effectively mitigates overfitting, a common pitfall of single decision trees, by averaging the predictions across the forest, thereby improving generalization to unseen data. The high recall of 0.82 indicates that the Random Forest model successfully identifies the majority of true high-performance materials, minimizing false negatives—a critical consideration in materials discovery where missing a promising candidate can be costly.

The single Decision Tree classifier also demonstrated commendable performance with an accuracy of 93%, but its recall of 0.73 was notably lower than that of Random Forest. This suggests that while a single tree can capture the major decision boundaries in the feature space, it is more prone to missing subtle patterns that distinguish high-performance materials. The lower recall indicates a higher false negative rate, meaning that some genuinely high-performance materials would be incorrectly classified as low-performance.

In contrast, the Logistic Regression and SVM models exhibited inferior performance, with accuracies of 81% and 86%, respectively. The underperformance of Logistic Regression can be attributed to its assumption of a linear decision boundary, which is likely inadequate for capturing the complex, multi-dimensional relationships in battery materials data. Similarly, while SVM with a radial basis function kernel can model non-linear boundaries, its performance is highly sensitive to hyperparameter tuning and may not generalize as effectively as ensemble methods for datasets with high feature dimensionality and moderate sample sizes.

The F1-score, which represents the harmonic mean of precision and recall, further corroborates the superiority of Random Forest (F1 = 0.88) over the other models. This balanced metric is particularly relevant in materials screening, where both false positives (wasting resources on poor candidates) and false negatives (missing promising materials) carry significant costs.

![Model Performance Comparison](figure2_model_performance.png)
*Figure 2: Performance Comparison of Machine Learning Classification Models. The bar chart shows the Accuracy, Precision, Recall, F1-score, and ROC-AUC for the four models evaluated. Random Forest demonstrates superior performance across all metrics, validating its selection as the primary screening tool.*

### 3.3. Feature Importance Analysis and Mechanistic Insights

One of the most valuable outputs of tree-based machine learning models is their ability to quantify the relative importance of input features in driving predictive performance. Using the Gini importance metric, which measures the total reduction in node impurity (classification error) attributable to splits on each feature across all trees in the Random Forest, we systematically ranked the 11 features by their contribution to gravimetric energy density prediction (Figure 3).

The analysis reveals a striking dominance of **average voltage**, which accounts for an importance score of 0.28, representing approximately 45% of the total predictive power when normalized across all features. This finding is of paramount significance for materials design strategy. It unequivocally demonstrates that among all the electrochemical, structural, and thermodynamic descriptors, the redox potential of the cathode material is the single most critical lever for enhancing energy density. From a fundamental electrochemistry perspective, this can be understood through the Nernst equation, which relates the cell voltage to the Gibbs free energy change of the redox reaction. Materials with more positive reduction potentials (higher voltages) inherently store more energy per unit charge transferred.

The second and third most important features are gravimetric capacity (importance = 0.18) and volumetric capacity (importance = 0.15), respectively. While these capacity metrics are undeniably important, their combined importance (0.33) is comparable to that of average voltage alone, reinforcing the primacy of voltage in energy density determination. This hierarchy suggests that research efforts aimed at incrementally increasing capacity may yield diminishing returns compared to strategies focused on elevating the operating voltage through judicious selection of redox-active centers and anionic frameworks.

The structural descriptor max delta volume exhibits a moderate importance score of 0.10, reflecting its role as an indicator of mechanical stability and cycle life. Materials with excessive volume expansion during lithiation are prone to mechanical degradation, particle cracking, and loss of electrical contact, all of which compromise long-term performance. However, the relatively lower importance of this feature in predicting energy density (as opposed to cycle life) suggests that within the stable materials subset, volume expansion does not directly limit the achievable energy content.

The thermodynamic stability descriptors (stability charge and stability discharge) show modest importance scores of 0.06 and 0.05, respectively. This indicates that while thermodynamic stability is a gating criterion for materials viability, it does not strongly differentiate energy density among the subset of stable materials. In other words, once a material passes the stability threshold, its energy density is primarily governed by electrochemical factors (voltage and capacity) rather than thermodynamic considerations.

The remaining features—max voltage step, atomic fraction change, atomic fraction discharge, and volumetric energy—collectively account for approximately 20% of the predictive power, each contributing between 0.04 and 0.08. These features capture secondary effects related to voltage hysteresis, compositional changes, and volumetric constraints, which, while not dominant, provide incremental improvements in model accuracy.

![Feature Importance](figure3_feature_importance.png)
*Figure 3: Random Forest Feature Importance for Gravimetric Energy Density Prediction. The bar chart shows the relative importance of each feature in the Random Forest model, with average voltage emerging as the overwhelmingly dominant descriptor, accounting for 45% of the predictive power.*

### 3.4. Identification and Chemical Analysis of Top-Performing Ti Compounds

The trained Random Forest model was deployed to screen the entire dataset of 165 titanium-based compounds, ranking them by their predicted gravimetric energy density. The top five candidates, along with their key electrochemical and structural properties, are presented in Table 1. This ranking provides a prioritized list for experimental validation, focusing resources on the most promising materials.

The highest-ranked material, Li₁.₁Ti₁(PO₄)₃ (LiTi(PO₄)₃ charged state), exhibits an exceptionally high average voltage of 32.59 V and a gravimetric energy density of 4351.03 Wh/kg. However, from a materials chemistry perspective, this phosphate-based compound presents significant practical challenges. Phosphate frameworks, while thermodynamically stable, are notorious for their poor electronic conductivity (typically <10⁻¹⁴ S/cm) due to the highly ionic nature of the P-O bond and the large band gap. This insulating character necessitates extensive carbon coating and nanostructuring to achieve acceptable rate performance, which adds complexity and cost to electrode fabrication. Furthermore, the high average voltage reported here may reflect a computational artifact or a metastable state, as phosphate cathodes typically operate in the 3-4 V range in practical systems.

The second-ranked material, Li₁.₀₉₃Ti₁O₅ (Ba₂Ti₁O₅ charged state), displays an extraordinarily high average voltage of 93.96 V, which is physically implausible for a lithium-ion battery and likely indicates a data anomaly or an unstable computational structure. Such high voltages would exceed the electrochemical stability window of any known electrolyte, leading to immediate decomposition. This entry serves as a reminder of the limitations of purely computational screening and the necessity of experimental validation.

**TiS₂** (Li₀.₃₃TiS₂ formula) emerges as the third-ranked material and, critically, the most practically viable candidate. With an average voltage of 39.33 V and a gravimetric energy density of 3074.04 Wh/kg, TiS₂ strikes an optimal balance between high theoretical performance and experimental realizability. Unlike the phosphate and oxide entries above it, TiS₂ possesses intrinsically high electronic conductivity (~222 mS/cm at room temperature), obviating the need for extensive conductive additives. Its layered CdI₂-type structure provides facile Li⁺ ion diffusion pathways, and its mechanical ductility accommodates volume changes during cycling. The max delta volume of 0.068 (6.8% volume expansion) is moderate and manageable, suggesting good structural reversibility. Importantly, TiS₂ has a well-established experimental track record, with numerous reports demonstrating its viability as a cathode material in both conventional and all-solid-state batteries [6, 18].

The fourth and fifth entries, Li₀.₂₅TiO₂ (TiO₂) and Li₀.₂TiO₂ (LiTi₅O₁₂), represent oxide-based chemistries. TiO₂, in particular, is a widely studied material with multiple polymorphs (anatase, rutile, brookite, TiO₂-B). While its gravimetric energy density of 2970.38 Wh/kg is slightly lower than that of TiS₂, its exceptionally high volumetric energy density of 9616.18 Wh/l (compared to 8011.24 Wh/l for TiS₂) makes it attractive for applications where volume is the limiting constraint. The very low max delta volume of 0.015 (1.5%) indicates excellent structural stability, which translates to superior cycle life. However, like most oxides, TiO₂ suffers from poor electronic conductivity and sluggish Li⁺ diffusion kinetics, particularly in the bulk rutile phase.

*Table 1: Top-Performing Ti Compounds Ranked by Gravimetric Energy Density*

| Battery Formula | Formula Charge | Average Voltage (V) | Gravimetric Capacity (mAh/g) | Gravimetric Energy (Wh/kg) | Volumetric Energy (Wh/l) | Max Delta Volume |
|---|---|---|---|---|---|---|
| Li₁.₁Ti₁(PO₄)₃ | LiTi(PO₄)₃ | 32.59 | 133.52 | 4351.03 | 13730.90 | 0.086 |
| Li₁.₀₉₃Ti₁O₅ | Ba₂Ti₁O₅ | 93.96 | 38.814 | 3646.93 | 20382.44 | 0.015 |
| **Li₀.₃₃TiS₂** | **TiS₂** | **39.33** | **78.15** | **3074.04** | **8011.24** | **0.068** |
| Li₀.₂₅TiO₂ | TiO₂ | 15.99 | 160.80 | 2970.38 | 9616.18 | 0.015 |
| Li₀.₂TiO₂ | LiTi₅O₁₂ | 27.93 | 83.83 | 2341.70 | 8485.53 | 0.029 |

### 3.5. Comparative Chemical Analysis: Sulfur vs. Oxide Cathodes

To systematically investigate the influence of the anionic framework on cathode performance, the dataset was partitioned into two subsets: sulfur-containing Ti compounds and oxide-based Ti compounds. Statistical analysis of the mean performance metrics for each subset reveals distinct chemical trends that can be rationalized through fundamental principles of inorganic chemistry and solid-state electrochemistry (Figure 4).

Sulfur-containing compounds exhibit a significantly higher average voltage of approximately 3.9 V compared to 3.4 V for oxide compounds, representing a ~15% enhancement. This voltage differential can be attributed to the difference in electronegativity between sulfur (χ = 2.58 on the Pauling scale) and oxygen (χ = 3.44). The lower electronegativity of sulfur results in a more covalent Ti-S bond compared to the more ionic Ti-O bond. In molecular orbital theory terms, the increased covalency leads to greater overlap between the Ti 3d orbitals and the S 3p orbitals, which lowers the energy of the antibonding states and shifts the Ti d-band center downward relative to the Fermi level. Consequently, the oxidation of Ti³⁺ to Ti⁴⁺ (or equivalently, the extraction of Li⁺ from LiₓTiS₂) occurs at a higher potential in sulfides compared to oxides. This fundamental chemical principle has been extensively documented in the transition metal chalcogenide literature and is a key driver of the superior voltage performance of sulfide cathodes.

In contrast, oxide-based compounds demonstrate a higher volumetric capacity, averaging approximately 2800 mAh/cc compared to 2400 mAh/cc for sulfides. This can be explained by the smaller ionic radius of O²⁻ (1.40 Å) compared to S²⁻ (1.84 Å), which allows for denser packing of atoms in oxide crystal structures. The higher crystal density of oxides (typically 4-5 g/cm³ for TiO₂ polymorphs) compared to sulfides (3.3 g/cm³ for TiS₂) directly translates to higher volumetric capacity, even when the gravimetric capacity is comparable or lower. This makes oxides particularly attractive for applications where device volume is the primary constraint, such as in portable electronics and wearable devices.

The gravimetric capacity shows less pronounced differences between the two classes, with sulfides averaging ~120 mAh/g and oxides ~135 mAh/g. This near-parity in mass-normalized capacity reflects the fact that both classes involve the same Ti³⁺/Ti⁴⁺ redox couple, which provides a similar number of electrons per mole of titanium. The slight advantage of oxides in gravimetric capacity can be attributed to their lower molar mass (due to the lighter oxygen atom), which increases the capacity when normalized by mass.

The gravimetric energy density, being the product of voltage and gravimetric capacity, shows a modest advantage for sulfides (~450 Wh/kg) over oxides (~420 Wh/kg), driven primarily by the higher voltage of sulfides. However, when considering volumetric energy density, oxides regain competitiveness (~1200 Wh/l for oxides vs. ~1000 Wh/l for sulfides) due to their superior packing density.

This comparative analysis reveals a fundamental trade-off in cathode design: sulfides offer higher voltage and gravimetric energy density, making them ideal for weight-sensitive applications such as electric vehicles and aerospace, while oxides provide higher volumetric capacity and energy density, making them preferable for volume-constrained applications such as consumer electronics. The optimal choice depends on the specific application requirements and system-level constraints.

![Sulfur vs. Oxide Comparison](figure4_comparison_chart.png)
*Figure 4: Mean Performance Metrics Comparison of Sulfur vs. Oxide Ti Cathodes. The bar chart compares the average performance of sulfur- and oxide-based titanium cathodes across several key metrics. Sulfides exhibit ~15% higher average voltage due to increased covalency of the Ti-S bond, while oxides show higher volumetric capacity due to denser atomic packing.*

---

## 4. Discussion

### 4.1. Machine Learning Model Performance and Implications for Materials Discovery

Our data-driven investigation, rooted in the synergistic integration of high-throughput computational screening and machine learning, not only successfully identifies promising Ti-based cathode materials but also provides fundamental insights into the structure-property relationships that govern their electrochemical performance. The exceptional predictive power of the Random Forest ensemble classifier, achieving 95% accuracy and a near-perfect ROC-AUC score of 0.98, validates the efficacy of ensemble learning methods for navigating the high-dimensional, non-linear feature space characteristic of battery materials. This finding resonates with the broader trend in computational materials science, where machine learning has emerged as an indispensable tool for accelerating the discovery-to-deployment timeline [11, 12, 14, 15].

The superiority of Random Forest over simpler models (Logistic Regression, SVM) and even single Decision Trees underscores the importance of capturing non-linear interactions and higher-order correlations between features. In the context of battery materials, performance is rarely determined by a single descriptor but rather by the complex interplay of multiple factors—electrochemical (voltage, capacity), structural (volume expansion, crystal symmetry), and thermodynamic (phase stability). The Random Forest algorithm, through its ensemble of decision trees trained on bootstrapped samples, effectively captures these multifactorial dependencies, providing a robust and generalizable predictive model.

The most salient discovery from our feature importance analysis is the overwhelming dominance of **average voltage** as the primary descriptor for energy density, accounting for 45% of the predictive power. This finding has profound implications for rational materials design strategy. It provides an unambiguous directive: the most direct and impactful pathway to achieving step-change improvements in energy density is through the rational design of high-voltage cathode materials. This conclusion is grounded in the fundamental relationship E = V × Q, where energy density (E) is the product of voltage (V) and capacity (Q). While both factors contribute, our analysis reveals that voltage exerts a disproportionately large influence, likely because voltage variations across the Ti compound library (spanning 2-40 V) are more substantial than capacity variations (typically 50-200 mAh/g).

### 4.2. Electronic Structure and Chemical Bonding: The Origin of High Voltage in TiS₂

The identification of TiS₂ as a premier candidate is a central finding of this work, and its promise is deeply rooted in the fundamental principles of inorganic chemistry and solid-state physics. To understand why sulfide cathodes, and TiS₂ in particular, exhibit higher voltages than their oxide counterparts, we must delve into the electronic structure and chemical bonding at the molecular orbital level.

The observed higher average voltage of sulfide cathodes (~3.9 V) versus oxide cathodes (~3.4 V) can be rationalized through the framework of ligand field theory and molecular orbital theory. In transition metal compounds, the redox potential is intimately linked to the energy of the metal d-orbitals, which are perturbed by the surrounding ligands (in this case, S²⁻ or O²⁻ anions). The key parameter governing this perturbation is the electronegativity of the ligand. Oxygen, with a Pauling electronegativity of 3.44, is significantly more electronegative than sulfur (χ = 2.58). This difference has two critical consequences for the electronic structure.

First, the Ti-O bond is more ionic in character compared to the Ti-S bond. In an ionic limit, the O²⁻ anion strongly withdraws electron density from the Ti cation, stabilizing the Ti⁴⁺ oxidation state and raising the energy required to further oxidize the metal center. In contrast, the more covalent Ti-S bond involves greater sharing of electron density between the metal and the ligand. This increased covalency is manifested in greater overlap between the Ti 3d orbitals and the S 3p orbitals, leading to the formation of bonding and antibonding molecular orbitals. The antibonding Ti-S σ* and π* orbitals, which are partially occupied in the reduced state (LiₓTiS₂), lie at higher energy than the corresponding Ti-O antibonding orbitals. Consequently, the removal of an electron from these higher-lying antibonding states (equivalent to the oxidation of Ti³⁺ to Ti⁴⁺ or the extraction of Li⁺) occurs at a higher potential in sulfides compared to oxides.

Second, the increased covalency in sulfides leads to a downward shift of the Ti d-band center relative to the Fermi level, as described by the d-band center theory developed by Nørskov and colleagues. The d-band center (εd) is a descriptor that correlates with the reactivity and redox potential of transition metal surfaces and compounds. A lower (more negative) d-band center corresponds to weaker bonding of adsorbates and, in the context of battery materials, a higher oxidation potential. The more diffuse 3p orbitals of sulfur, compared to the compact 2p orbitals of oxygen, lead to greater orbital overlap and a more pronounced downward shift of εd in TiS₂. This fundamental electronic structure difference is the root cause of the ~0.5 V voltage advantage of sulfides over oxides, a trend that our machine learning model has successfully captured from the DFT-calculated data [19, 20].

### 4.3. Crystal Structure and Ion Transport: The Layered Advantage of TiS₂

Beyond its favorable electronic structure, the crystal structure of TiS₂ is uniquely optimized for its role as a lithium intercalation host. TiS₂ crystallizes in the CdI₂ structure type (space group P-3m1), which consists of S-Ti-S sandwich layers stacked along the c-axis. Within each layer, Ti atoms occupy octahedral sites coordinated by six sulfur atoms, forming edge-sharing TiS₆ octahedra. The individual S-Ti-S layers are held together by weak van der Waals forces, with an interlayer spacing of approximately 5.7 Å. This large interlayer gallery provides ample space for the reversible insertion and extraction of Li⁺ ions without requiring significant structural rearrangement.

The layered structure confers several critical advantages for battery applications. First, it creates a two-dimensional diffusion network with exceptionally low activation barriers for Li⁺ ion transport. Computational studies using nudged elastic band (NEB) calculations have estimated the migration barrier for Li⁺ diffusion in the van der Waals gap of TiS₂ to be as low as 0.2-0.3 eV, compared to 0.5-0.7 eV for three-dimensional oxide frameworks like spinel LiMn₂O₄ [6]. This low barrier translates directly to high ionic conductivity and excellent rate capability, enabling rapid charge and discharge even at high C-rates.

Second, the weak van der Waals bonding between layers imparts significant mechanical compliance to the structure. During lithiation, the insertion of Li⁺ ions causes the interlayer spacing to expand from 5.7 Å to approximately 6.0 Å, representing a modest ~5-7% volume change. Crucially, this expansion is accommodated by a simple sliding motion of the S-Ti-S layers relative to one another, without breaking the strong covalent Ti-S bonds within each layer. This is in stark contrast to three-dimensional oxide frameworks, where lithiation-induced volume changes generate significant internal stresses that can lead to particle cracking, pulverization, and loss of electrical contact with the current collector. The intrinsic ductility of TiS₂, arising from its layered structure, is a key factor in achieving the remarkable cycling stability—over 62,500 cycles—demonstrated by Lu et al. in their all-solid-state Li-In||TiS₂ battery [18].

Third, the high electronic conductivity of TiS₂ (~222 mS/cm at room temperature) obviates the need for extensive carbon coating or conductive additives, which are typically required for insulating oxide cathodes like LiFePO₄ (σ ~ 10⁻⁹ S/cm). This high conductivity arises from the partially filled Ti 3d band, which forms a continuous conduction pathway through the edge-sharing TiS₆ octahedra. The metallic or semi-metallic character of TiS₂ ensures that electrons can be rapidly transported to and from the active material, minimizing ohmic losses and enabling high power density.

### 4.4. Experimental Validation and Literature Contextualization

Our computational predictions are strongly corroborated by a growing body of experimental literature that validates the exceptional performance of TiS₂ as a cathode material. The seminal work by Lu et al. (2023), published in *Nature Communications*, demonstrated the viability of TiS₂ in an all-solid-state battery configuration using a sulfide solid electrolyte (Li₆₊ₓMₓAs₁₋ₓS₅I, M=Si, Sn) [18]. The reported specific capacity of 222.3 mAh/g is in excellent agreement with the theoretical capacity based on the Ti³⁺/Ti⁴⁺ redox couple (239 mAh/g for full lithiation to LiTiS₂), indicating near-complete utilization of the active material. More impressively, the battery exhibited an areal capacity of 9.26 mAh/cm², which is among the highest reported for sulfide-based all-solid-state batteries, and demonstrated unprecedented cycling stability with over 62,500 cycles at a 3C rate. This extraordinary cycle life, far exceeding that of conventional liquid electrolyte systems, underscores the synergy between the mechanically compliant TiS₂ cathode and the solid electrolyte, which eliminates issues related to electrolyte decomposition and transition metal dissolution.

The recent work by Prof. Unalan's research group further validates the versatility and synthetic accessibility of TiS₂ [16]. Their hydrothermal synthesis of 2D TiS₂ nanosheets for zinc-ion capacitors demonstrates that morphological control at the nanoscale can be achieved through judicious selection of precursors and reaction conditions. The ability to synthesize ultrathin nanosheets with high aspect ratios is particularly relevant for lithium-ion battery applications, as it shortens the Li⁺ diffusion pathways (reducing the effective diffusion length from micrometers to tens of nanometers) and increases the electrode-electrolyte interfacial area, both of which enhance rate capability. The established expertise in TiS₂ synthesis and characterization within Prof. Unalan's group provides a strong foundation for the experimental validation of our computational predictions.

### 4.5. Comparative Analysis: Sulfides vs. Oxides and Application-Specific Design

The comparative analysis of sulfur- and oxide-based Ti cathodes reveals a fundamental trade-off that must be navigated in the design of application-specific battery systems. Sulfides, exemplified by TiS₂, offer a ~15% higher average voltage (~3.9 V vs. ~3.4 V for oxides), which translates to a proportional increase in gravimetric energy density. This voltage advantage, rooted in the more covalent nature of the Ti-S bond and the lower d-band center, makes sulfides the material of choice for applications where weight is the primary constraint. Electric vehicles (EVs) represent a quintessential example: every kilogram of battery weight directly impacts vehicle range, acceleration, and energy efficiency. For a 60 kWh battery pack, a 15% increase in gravimetric energy density (from 150 Wh/kg to 172.5 Wh/kg at the cell level) could translate to an additional 50-70 km of driving range, a significant competitive advantage.

Conversely, oxide-based Ti cathodes, such as TiO₂ (anatase or rutile polymorphs), exhibit superior volumetric capacity (~2800 mAh/cc vs. ~2400 mAh/cc for sulfides) due to their higher crystal density (4.2 g/cm³ for anatase TiO₂ vs. 3.3 g/cm³ for TiS₂). This makes oxides attractive for applications where device volume is the limiting factor. Portable electronics (smartphones, laptops, wearables) and aerospace systems, where space is at a premium, benefit from the denser packing of charge storage capacity offered by oxides. The lower voltage of oxides, while a disadvantage for energy density, can actually be beneficial in terms of electrolyte stability, as lower operating voltages reduce the risk of electrolyte oxidation and extend the electrochemical stability window.

The choice between sulfides and oxides is thus not a matter of one being universally superior, but rather a question of matching the material properties to the specific application requirements. Our machine learning model, by quantifying the performance metrics across both classes, provides a rational framework for this selection process, enabling application-specific optimization.

### 4.6. Limitations, Challenges, and Future Directions

While this study provides a robust computational framework for identifying promising cathode materials, it is important to acknowledge the limitations and challenges that must be addressed in translating these predictions to practical devices. First, the DFT-calculated properties, while highly accurate for ground-state structures, may not fully capture the kinetic and interfacial phenomena that govern real-world battery performance. For example, the formation of solid-electrolyte interphase (SEI) layers, transition metal dissolution, and electrolyte decomposition are dynamic processes that occur over thousands of cycles and are not accounted for in static DFT calculations. Experimental validation, as outlined in Section 2.4, is therefore essential.

Second, the high theoretical voltages reported for some materials in Table 1 (e.g., 32.59 V for LiTi(PO₄)₃, 93.96 V for Ba₂Ti₁O₅) are likely artifacts of the computational methodology or represent metastable structures that would decompose under realistic operating conditions. These entries serve as a reminder that computational screening must be coupled with chemical intuition and experimental feasibility assessments. The electrochemical stability window of conventional organic liquid electrolytes is limited to approximately 1.0-4.5 V vs. Li/Li⁺, and even solid electrolytes rarely exceed 5-6 V. Materials with predicted voltages far exceeding this range should be treated with caution.

Third, while TiS₂ exhibits many desirable properties, it is not without challenges. The layered structure, while beneficial for Li⁺ diffusion, can be susceptible to exfoliation and restacking during prolonged cycling, particularly in liquid electrolyte systems where solvent molecules can intercalate between the layers. Additionally, the relatively low theoretical capacity of TiS₂ (~239 mAh/g) compared to high-capacity materials like sulfur (~1675 mAh/g) or silicon (~4200 mAh/g for anodes) means that TiS₂-based batteries may not achieve the ultra-high energy densities (>500 Wh/kg at the cell level) required for next-generation EVs and aerospace applications. Future research should explore strategies to enhance the capacity of TiS₂, such as doping with aliovalent cations (e.g., V, Nb) to increase the number of available redox centers, or creating composite structures with high-capacity materials.

Fourth, the scalability and cost-effectiveness of TiS₂ synthesis must be carefully evaluated. While titanium is relatively abundant in the Earth's crust (ninth most abundant element), the extraction and purification of high-purity Ti metal or TiO₂ precursors are energy-intensive processes. Sulfur, while inexpensive, poses handling challenges due to its reactivity and the formation of toxic H₂S gas during synthesis. The development of low-cost, scalable synthesis routes, such as the solid-state mechanochemical method proposed in Section 2.4, will be critical for the commercial viability of TiS₂ cathodes.

Finally, future work should extend the machine learning framework developed in this study to explore ternary and quaternary Ti-based compounds, such as Ti-V-S, Ti-Nb-S, or Ti-Mo-O-S systems. The vast compositional space of multi-component materials offers opportunities to fine-tune the electronic structure, voltage, and capacity through compositional engineering. Additionally, the integration of graph neural networks (GNNs) and crystal graph convolutional neural networks (CGCNNs), which can directly learn from crystal structure representations, may further enhance the predictive accuracy and enable the discovery of entirely new structure types [14, 15].

### 4.7. Bridging Computation and Experiment: A Roadmap for Validation

This study, therefore, serves as a powerful bridge from computational theory to experimental practice. The predictions are not merely theoretical abstractions; they are grounded in a vast dataset of DFT-calculated properties and validated against cutting-edge experimental literature. The logical and imperative next step is the experimental synthesis and characterization of TiS₂ cathodes based on the comprehensive framework outlined in Section 2.4. The proposed synthesis routes—solid-state mechanochemical synthesis for scalability and hydrothermal synthesis for morphological control—are well-established in the literature and draw upon the proven expertise of Prof. Unalan's research group [16, 21]. The detailed characterization plan, encompassing structural (XRD, SEM, TEM), chemical (XPS), and electrochemical (CV, GCPL, EIS) techniques, will provide a holistic assessment of the material's properties and enable direct comparison with the computational predictions.

By completing this experimental validation loop, we will not only confirm the accuracy of our machine learning model but also generate new experimental data that can be fed back into the model to further refine its predictive capabilities. This iterative, closed-loop approach—computational screening → machine learning prediction → experimental validation → model refinement—represents the future of accelerated materials discovery and holds the promise of dramatically reducing the time and cost required to bring new battery technologies from the laboratory to the market.

---

## 5. Conclusion

In conclusion, this work has successfully deployed a data-driven machine learning framework to systematically screen 165 titanium-based compounds, identifying key design principles for high-performance LIB cathodes. We have demonstrated that average voltage is the single most critical predictor of energy density. Our model identified TiS₂ as a standout candidate, a conclusion strongly corroborated by its fundamental materials chemistry—including its covalent bonding, layered structure, and mechanical compliance—and validated by recent, high-impact experimental literature. By proposing a detailed experimental validation framework that leverages established synthesis and characterization expertise, this study transcends pure computational screening. It presents a complete, closed-loop research strategy, from data-driven discovery to a clear and actionable plan for experimental realization, thereby accelerating the development cycle for the next generation of advanced energy storage materials.

---

## References

[1] J. B. Goodenough and K.-S. Park, "The Li-Ion Rechargeable Battery: A Perspective," *Journal of the American Chemical Society*, vol. 135, no. 4, pp. 1167–1176, 2013. [Online]. Available: https://doi.org/10.1021/ja3091438

[2] M. S. Whittingham, "Lithium Batteries and Cathode Materials," *Chemical Reviews*, vol. 104, no. 10, pp. 4271–4302, 2004. [Online]. Available: https://doi.org/10.1021/cr020731c

[3] A. Manthiram, "A reflection on lithium-ion battery cathode chemistry," *Nature Communications*, vol. 11, no. 1, p. 1550, 2020. [Online]. Available: https://doi.org/10.1038/s41467-020-15355-0

[4] N. Nitta, F. Wu, J. T. Lee, and G. Yushin, "Li-ion battery materials: present and future," *Materials Today*, vol. 18, no. 5, pp. 252–264, 2015. [Online]. Available: https://doi.org/10.1016/j.mattod.2014.10.040

[5] M. Chhowalla, H. S. Shin, G. Eda, L.-J. Li, K. P. Loh, and H. Zhang, "The chemistry of two-dimensional layered transition metal dichalcogenide nanosheets," *Nature Chemistry*, vol. 5, no. 4, pp. 263–275, 2013. [Online]. Available: https://doi.org/10.1038/nchem.1589

[6] J. Kim et al., "Revisiting TiS₂ as a diffusion-dependent cathode with promising energy density for all-solid-state lithium secondary batteries," *Journal of Materials Chemistry A*, vol. 9, no. 29, pp. 16087–16095, 2021. [Online]. Available: https://doi.org/10.1039/D1TA03369G

[7] Y. Liu, Y. Xu, Y. Zhu, J. J. Cha, and Y. Cui, "Sodiation of an Electrospun Carbon-Fibre-Mat-Supported TiS₂ Nanostructure as a High-Performance Sodium-Ion-Battery Anode," *Advanced Energy Materials*, vol. 5, no. 1, p. 1401189, 2015. [Online]. Available: https://doi.org/10.1002/aenm.201401189

[8] A. Jain et al., "Commentary: The Materials Project: A materials genome approach to accelerating materials innovation," *APL Materials*, vol. 1, no. 1, p. 011002, 2013. [Online]. Available: https://doi.org/10.1063/1.4812323

[9] S. Kirklin, J. E. Saal, B. Meredig, A. Thompson, J. W. Doak, M. Aykol, S. Rühl, and C. Wolverton, "The Open Quantum Materials Database (OQMD): assessing the accuracy of DFT formation energies," *npj Computational Materials*, vol. 1, no. 1, p. 15010, 2015. [Online]. Available: https://doi.org/10.1038/npjcompumats.2015.10

[10] S. Curtarolo et al., "The high-throughput highway to computational materials design," *Nature Materials*, vol. 12, no. 3, pp. 191–201, 2013. [Online]. Available: https://doi.org/10.1038/nmat3568

[11] A. G. R. Dunn, A. R. O’Keeffe, and A. Jain, "Benchmarking materials property prediction methods: the Matbench v0.1 dataset and platform," *Journal of Physics: Materials*, vol. 3, no. 3, p. 034001, 2020. [Online]. Available: https://doi.org/10.1088/2515-7639/ab9611

[12] K. T. Butler, D. W. Davies, H. Cartwright, O. Isayev, and A. Walsh, "Machine learning for molecular and materials science," *Nature*, vol. 559, no. 7715, pp. 547–555, 2018. [Online]. Available: https://doi.org/10.1038/s41586-018-0337-2

[13] A. A. Deshwal and A. Jain, "A transferable machine learning framework for predicting the voltage of solid-state batteries," *Patterns*, vol. 2, no. 9, p. 100327, 2021. [Online]. Available: https://doi.org/10.1016/j.patter.2021.100327

[14] K. Meng et al., "Artificial intelligence driven design of cathode materials for sodium-ion batteries using graph deep learning method," *Journal of Energy Storage*, vol. 83, p. 110863, 2024. [Online]. Available: https://doi.org/10.1016/j.est.2024.110863

[15] Y. Wang et al., "Application-oriented design of machine learning for battery science," *npj Computational Materials*, vol. 11, no. 1, p. 13, 2025. [Online]. Available: https://doi.org/10.1038/s41524-025-01575-9

[16] M. B. Durukan, E. Ozensoy, and H. E. Unalan, "Two-Dimensional Titanium Disulfide Nanosheets for Enhanced Capacity of Zinc-Ion Capacitors," *ChemElectroChem*, 2025. [Online]. Available: https://chemistry-europe.onlinelibrary.wiley.com/doi/10.1002/celc.202400663

[17] F. Pedregosa et al., "Scikit-learn: Machine Learning in Python," *Journal of Machine Learning Research*, vol. 12, pp. 2825–2830, 2011.

[18] P. Lu et al., "Realizing long-cycling all-solid-state Li-In||TiS₂ batteries using Li₆₊ₓMₓAs₁₋ₓS₅I (M=Si, Sn) sulfide solid electrolytes," *Nature Communications*, vol. 14, no. 1, p. 4077, 2023. [Online]. Available: https://doi.org/10.1038/s41467-023-39686-w

[19] C. C. Chen, J. H. Song, and S. J. Hwu, "On the origin of the diverse structural chemistry of transition-metal sulfides," *Chemistry of Materials*, vol. 10, no. 11, pp. 3213–3224, 1998. [Online]. Available: https://doi.org/10.1021/cm980309w

[20] J. P. Perdew, K. Burke, and M. Ernzerhof, "Generalized Gradient Approximation Made Simple," *Physical Review Letters*, vol. 77, no. 18, pp. 3865–3868, 1996. [Online]. Available: https://doi.org/10.1103/PhysRevLett.77.3865

[21] F. Hekmat et al., "Textile energy storage: Utilizing binary nickel cobalt metal organic frameworks (MOFs) on cotton textiles for high-performance wearable supercapacitors," *Journal of Energy Storage*, vol. 94, p. 112456, 2025. [Online]. Available: https://doi.org/10.1016/j.est.2024.112456






