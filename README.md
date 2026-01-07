# product-design

Storybook component library for Zluri product design system.

## Development

To run Storybook locally:

```bash
npm install
npm run storybook
```

Storybook will be available at `http://localhost:6006`

## Building

To build Storybook for production:

```bash
npm run build-storybook
```

The build output will be in the `storybook-static` directory.

## Deployment

This Storybook is automatically deployed to GitHub Pages at `https://somnath-zluri.github.io/product-design/` via GitHub Actions.

### Automatic Deployment

The repository is configured with a GitHub Actions workflow that automatically builds and deploys Storybook whenever you push to the `main` or `master` branch.

### Manual Deployment

If you need to deploy manually:

1. Build Storybook: `npm run build-storybook`
2. The GitHub Actions workflow will handle the deployment automatically, or you can manually push the `storybook-static` folder to the `gh-pages` branch (though the automated workflow is recommended).

### Enabling GitHub Pages

To enable GitHub Pages for this repository:

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on the next push to `main`/`master`

Your Storybook will be live at: `https://somnath-zluri.github.io/product-design/`
