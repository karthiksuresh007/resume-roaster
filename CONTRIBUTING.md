# Git Commit Message Guidelines

## Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies
- **ui**: UI/UX changes
- **a11y**: Accessibility improvements

## Scopes (Component Areas)
- **landing**: Landing page components
- **results**: Results page components
- **paywall**: Paywall and pricing
- **ui**: UI components (Button, Card, etc.)
- **effects**: Animation effects
- **api**: API integration
- **config**: Configuration files
- **deps**: Dependencies

## Examples

```bash
# Feature
git commit -m "feat(landing): add drag & drop upload zone"

# Bug fix
git commit -m "fix(results): typewriter animation not triggering on mobile"

# UI improvement
git commit -m "ui(paywall): improve pricing card hover effects"

# Documentation
git commit -m "docs: update README with deployment instructions"

# Performance
git commit -m "perf(effects): optimize fire particles rendering"

# Refactor
git commit -m "refactor(ui): extract GlassCard to reusable component"
```

## Best Practices

1. **Use present tense**: "add feature" not "added feature"
2. **Be concise**: Keep subject line under 50 characters
3. **Be descriptive**: Explain what and why, not how
4. **Reference issues**: Include issue numbers if applicable
5. **Commit often**: Small, focused commits are better

## Branching Strategy

### Main Branches
- `main`: Production-ready code
- `develop`: Development branch (optional for MVP)

### Feature Branches
```bash
# Create feature branch
git checkout -b feat/upload-zone

# Work on feature...
git add .
git commit -m "feat(landing): implement file upload validation"

# Merge back to main
git checkout main
git merge feat/upload-zone
```

### Naming Convention
- `feat/feature-name`: New features
- `fix/bug-description`: Bug fixes
- `refactor/component-name`: Refactoring
- `docs/update-readme`: Documentation

## Quick Commands

```bash
# Check status
git status

# View changes
git diff

# Stage all changes
git add .

# Commit with message
git commit -m "type(scope): message"

# View commit history
git log --oneline --graph

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create and switch to new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# Delete branch
git branch -d branch-name

# Push to remote
git push origin main

# Pull from remote
git pull origin main
```

## Pre-commit Checklist

Before committing, ensure:
- [ ] Code runs without errors
- [ ] No console.log() statements left
- [ ] Formatting is consistent
- [ ] No sensitive data (API keys, passwords)
- [ ] Changes are tested locally
- [ ] Commit message is clear and descriptive

## GitHub Setup (When Ready)

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/resumer.git
git push -u origin main
```

---

**Remember**: Good commit messages help future you understand what past you was thinking! 🔥
