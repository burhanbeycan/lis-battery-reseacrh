# Contributing to Li-S Battery Research Website

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### Suggesting Features

We welcome feature suggestions! Please open an issue with:
- Clear description of the feature
- Use case and benefits
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of your changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide clear description
   - Reference any related issues
   - Include screenshots for UI changes

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Code Style

- Use **React functional components** with hooks
- Follow **ES6+ syntax**
- Use **Tailwind CSS** for styling
- Keep components **modular and reusable**
- Add **PropTypes** or TypeScript types when applicable
- Write **meaningful variable names**

## Testing

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design (mobile, tablet, desktop)
- Verify accessibility (keyboard navigation, screen readers)
- Check performance (bundle size, load time)

## Areas for Contribution

### High Priority
- [ ] Add unit tests (Jest, React Testing Library)
- [ ] Improve accessibility (ARIA labels, keyboard nav)
- [ ] Optimize bundle size (code splitting, lazy loading)
- [ ] Add more visualization types (3D plots, heatmaps)
- [ ] Implement data caching (IndexedDB, localStorage)

### Medium Priority
- [ ] Add dark mode toggle
- [ ] Improve mobile UX
- [ ] Add data export formats (Excel, JSON)
- [ ] Create tutorial/onboarding flow
- [ ] Add search functionality across all data

### Low Priority
- [ ] Add internationalization (i18n)
- [ ] Create admin dashboard
- [ ] Add user authentication
- [ ] Implement data versioning
- [ ] Add social sharing features

## Questions?

Feel free to open an issue for any questions or discussions!

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help create a welcoming environment

Thank you for contributing! 🎉
