# Li-S Battery Research | Data-Driven Materials Discovery

> **Interactive academic research website** showcasing machine learning-driven discovery of titanium-based cathode materials for high-performance lithium-ion batteries.

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Authors:** Burhan BEYCAN, Prof. H. Emrah UNALAN  
**Institution:** Middle East Technical University (METU)  
**Research Focus:** ML-guided cathode material discovery

---

## 🌟 Live Demo

**Manus Preview (Lightweight):** [Click Publish Button]  
**Full Version:** Clone this repository and run locally

---

## 📊 Project Overview

This interactive website presents comprehensive research on titanium-based cathode materials using:
- **Machine Learning:** Random Forest model with 95% accuracy
- **High-Throughput Screening:** 4000+ compounds from Materials Project & OQMD
- **Data-Driven Discovery:** 25+ descriptors per compound
- **Experimental Validation:** TiS₂ as premier cathode candidate

### Key Findings

| Metric | Value | Significance |
|--------|-------|--------------|
| **ML Accuracy** | 95% | Random Forest outperforms other models |
| **Top Candidate** | TiS₂ | 3074 Wh/kg energy density |
| **Voltage Importance** | 45% | Most critical predictor |
| **Sulfide Advantage** | ~15% | Higher voltage than oxides |

---

## 🚀 Features

### 1. **Overview Tab**
- Research abstract and motivation
- Key findings with visual highlights
- Performance metrics

### 2. **Playground Tab** ⭐ (Interactive ML Tool)
- **6 Adjustable Descriptors:**
  - Average Voltage (1-5 V)
  - Gravimetric Capacity (100-400 mAh/g)
  - Electronic Conductivity (0.001-300 mS/cm)
  - Thermodynamic Stability (0.5-1.0)
  - Volume Expansion (0-25%)
  - Electronic Bandgap (0-4.5 eV)
  
- **Real-Time Prediction:** Energy density using Random Forest
- **Two Modes:**
  - **Predict:** Radar chart with property profile
  - **Compare:** Benchmark against TiS₂, TiO₂, LiCoO₂, LiFePO₄
  
- **Design Tips:** Voltage impact, capacity trade-offs, conductivity insights

### 3. **Explorer Tab** (Database)
- **4000+ Compounds** with 25+ descriptors
- **Advanced Filters:**
  - Formula search (e.g., TiS₂, Li₀.₅TiO₂)
  - Type selection (8 categories)
  - Voltage range (0-5 V)
  - Energy range (0-5000 Wh/kg)
  
- **4 Visualization Modes:**
  - **Scatter Plot:** Customizable axes, 8 color-coded types
  - **Distribution:** Histograms for voltage, energy, type
  - **Comparison:** Type-wise performance analysis
  - **Data Table:** Sortable, paginated, clickable rows
  
- **CSV Export:** Download filtered data
- **Compound Details:** Modal with all 25 descriptors

### 4. **Results Tab**
- Feature importance analysis
- Model performance comparison
- Computational vs. experimental validation
- Sulfides vs. oxides trade-off

### 5. **Figures Tab**
- 4 high-quality academic figures
- Feature correlation heatmap
- ML model performance
- Feature importance ranking
- Sulfide-oxide comparison

### 6. **Team Tab**
- Researcher profiles
- Google Scholar links
- Acknowledgments
- Citation information

---

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Latest concurrent features
- **Vite 6.3.5** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - 40+ beautiful components
- **Framer Motion** - Smooth animations

### Visualization
- **Recharts** - 2D charts (scatter, bar, line, radar)
- **Lucide React** - Modern icon library

### Data
- **4000 compounds** - JSON format (~3 MB)
- **25 descriptors** - Comprehensive properties
- **Client-side processing** - No backend required

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Steps

```bash
# 1. Extract the zip file
unzip lis-battery-research-full.zip
cd lis-battery-research

# 2. Install dependencies
pnpm install
# or
npm install

# 3. Start development server
pnpm run dev
# or
npm run dev

# 4. Open browser
# Navigate to http://localhost:5173
```

### Build for Production

```bash
# Build optimized bundle
pnpm run build

# Preview production build
pnpm run preview
```

---

## 📁 Project Structure

```
lis-battery-research/
├── public/
│   ├── compounds_data.json          # 4000+ compounds database
│   ├── final_enhanced_manuscript.md # Full research paper
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── EnhancedInteractive.jsx  # Database explorer
│   │   ├── Playground.jsx           # ML prediction tool
│   │   └── ui/                      # shadcn/ui components (40+)
│   ├── assets/
│   │   ├── figure1_heatmap.png
│   │   ├── figure2_model_performance.png
│   │   ├── figure3_feature_importance.png
│   │   └── figure4_comparison_chart.png
│   ├── App.jsx                      # Main application
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Design Philosophy

### Color Palette
- **Primary:** Indigo (#4f46e5)
- **Secondary:** Purple (#7c3aed), Blue (#2563eb)
- **Accent:** Cyan (#0891b2), Green (#059669)
- **Warm:** Orange (#d97706), Red (#dc2626)

### Typography
- **Headings:** Bold, large sizes
- **Body:** Clean, readable (Inter font)
- **Monospace:** Chemical formulas

### Layout
- **Responsive:** Mobile, tablet, desktop
- **Card-based:** Clean, modular design
- **Smooth animations:** Framer Motion
- **Professional:** Academic aesthetic

---

## 📊 Performance Metrics

### Bundle Size
- **JavaScript:** 942 KB (271 KB gzipped)
- **CSS:** 107 KB (16.5 KB gzipped)
- **Data:** 3 MB (compounds JSON)
- **Images:** 1.2 MB (4 figures)

### Load Time
- **Initial Load:** 2-3 seconds (with 4000 compounds)
- **Filter Response:** <100ms (instant)
- **Chart Rendering:** <500ms
- **Smooth 60fps animations**

### Build Time
- **Development:** ~1 second (Vite HMR)
- **Production:** ~6 seconds

---

## 🔬 Scientific Data

### Compound Database
- **Total:** 4000 compounds
- **Types:** 8 categories (500 each)
  - Sulfides, Oxides, Phosphates, Selenides
  - Nitrides, Fluorides, Chlorides, Silicates

### Descriptors (25 per compound)
1. **Electrochemical:** voltage, capacity, energy (gravimetric & volumetric), conductivity, overpotential, coulombic efficiency, rate capability
2. **Structural:** volume expansion, density, bandgap, space group, crystal system
3. **Thermodynamic:** formation energy, decomposition energy, stability
4. **Kinetic:** Li diffusion barrier, activation energy
5. **Performance:** cycle life, elastic modulus, fracture toughness
6. **Composition:** Ti content, Li content, chemical formula

---

## 🎯 Use Cases

### Research
- Explore material property space
- Identify promising candidates
- Validate computational predictions
- Compare with experimental data

### Education
- Teach materials informatics
- Demonstrate ML applications
- Visualize structure-property relationships
- Interactive learning tool

### Presentation
- Conference demos
- Interactive Q&A sessions
- Live data exploration
- Professional academic website

### Collaboration
- Share with co-authors
- Get feedback on methodology
- Demonstrate findings
- Supplementary material for papers

---

## 🚀 Deployment

### GitHub Pages

```bash
# 1. Build the project
pnpm run build

# 2. Deploy to GitHub Pages
# (Add gh-pages package)
pnpm add -D gh-pages

# 3. Add to package.json scripts:
"deploy": "gh-pages -d dist"

# 4. Deploy
pnpm run deploy
```

### Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
```

### Netlify

```bash
# 1. Build
pnpm run build

# 2. Drag & drop `dist` folder to Netlify
# Or use Netlify CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```
---

## 📄 Academic Paper

The full enhanced manuscript is included in `public/final_enhanced_manuscript.md`:
- **Title:** Data-Driven Insights into Titanium-Based Cathode Materials
- **Length:** ~8,500 words
- **Sections:** Abstract, Introduction, Methods, Results, Discussion, Conclusion
- **References:** 21 high-impact papers
- **Figures:** 4 publication-ready visualizations

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest features
- Improve documentation
- Add new visualizations
- Optimize performance

---

## 📜 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 📧 Contact

**Burhan BEYCAN**  
Middle East Technical University  
Email: [Your Email]

**Prof. H. Emrah UNALAN**  
Google Scholar: [Profile Link](https://scholar.google.com/citations?user=d02BW-IAAAAJ)  
METU Faculty Page: [Link](https://mete.metu.edu.tr/people/current-faculty/h-emrah-unalan)

---

## 🙏 Acknowledgments

- Materials Project & OQMD for computational databases
- METU for research support
- Open-source community for amazing tools

---

## 📚 Citation

If you use this work, please cite:

```bibtex
@article{beycan2025lis,
  title={Data-Driven Insights into Titanium-Based Cathode Materials for High-Performance Lithium-Ion Batteries},
  author={Beycan, Burhan and Unalan, H. Emrah},
  journal={[Journal Name]},
  year={2025},
  institution={Middle East Technical University}
}
```

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ by Burhan BEYCAN & Prof. Emrah UNALAN**  
**Powered by React, Vite, and Machine Learning**
