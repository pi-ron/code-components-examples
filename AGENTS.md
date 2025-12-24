# Webflow Code Components Guidelines

When working with Webflow code components in this directory:

## Purpose
This repository contains example React components designed for Webflow via DevLink. Each component demonstrates different patterns for bringing custom functionality into Webflow.

## Component Types
- **Pricing Quote Calculator**: Multi-input forms with validation
- **Multi-Step Form**: Dynamic form generation with progress tracking
- **CMS Slider**: Carousel integrating with Webflow CMS collections
- **Store Locator**: Map component with Webflow Cloud backend
- **Shadcn/ui Components**: Base UI components with Tailwind styling

## Development Guidelines
- Use React with TypeScript for type safety
- Follow Webflow Code Components architecture patterns
- Expose props via PropTypes for Webflow canvas configuration
- Use Shadow DOM for proper style isolation
- Implement responsive design with Tailwind CSS

## Import Process
1. Navigate to specific component folder
2. Install dependencies with npm install
3. Run locally with npm run dev
4. Import to Webflow using DevLink CLI
5. Configure props in Webflow canvas

## Key Considerations
- Components must be Webflow-compatible
- Use slot-based content for CMS integration
- Implement proper error handling
- Test in Webflow environment after import
- Follow established file structure patterns

## Documentation
Each component has its own README with:
- Setup instructions
- Configuration options
- Webflow integration steps
- Troubleshooting tips
