# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-10-05

### 🎉 Initial Release

#### Added
- **6 Main Tabs:**
  - Overview: Research summary and key findings
  - Playground: Interactive ML prediction tool
  - Explorer: 4000+ compound database
  - Results: Research findings and analysis
  - Figures: 4 academic visualizations
  - Team: Researcher profiles

- **Playground Features:**
  - 6 adjustable descriptors (voltage, capacity, conductivity, stability, volume expansion, bandgap)
  - Real-time energy density prediction using Random Forest model
  - Two visualization modes (Predict with radar chart, Compare with benchmark)
  - Design tips and insights

- **Explorer Features:**
  - 4000+ titanium compounds with 25+ descriptors each
  - Advanced filtering (formula search, type selection, voltage/energy ranges)
  - 4 visualization modes (Scatter plot, Distribution, Comparison, Data table)
  - CSV export functionality
  - Detailed compound modal with all properties

- **Data & Visualizations:**
  - 4000 compounds across 8 material types
  - 25 descriptors per compound (electrochemical, structural, thermodynamic, kinetic, performance)
  - 4 high-quality academic figures
  - Interactive charts using Recharts

- **Technical Stack:**
  - React 19.1.0 with hooks
  - Vite 6.3.5 build tool
  - Tailwind CSS + shadcn/ui (40+ components)
  - Framer Motion for animations
  - Recharts for data visualization

- **Documentation:**
  - Comprehensive README.md
  - Full academic manuscript (8,500+ words)
  - Deployment guide
  - Contributing guidelines
  - MIT License

#### Performance
- Bundle size: 942 KB (271 KB gzipped)
- Load time: 2-3 seconds with full dataset
- Filter response: <100ms
- Chart rendering: <500ms
- 60fps animations

---

## [Unreleased]

### Planned Features
- [ ] Unit tests (Jest, React Testing Library)
- [ ] Dark mode toggle
- [ ] Additional visualization types (3D plots, heatmaps)
- [ ] Data caching (IndexedDB)
- [ ] Improved mobile UX
- [ ] Tutorial/onboarding flow
- [ ] Internationalization (i18n)

### Known Issues
- Large bundle size (optimization needed)
- Initial load time with 4000 compounds
- Mobile performance could be improved

---

## Version History

### Version Naming Convention
- **Major (X.0.0):** Breaking changes, major new features
- **Minor (1.X.0):** New features, non-breaking changes
- **Patch (1.0.X):** Bug fixes, minor improvements

---

**Note:** This is the first public release. Future updates will be documented here.
