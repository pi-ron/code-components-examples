# Shadcn/ui Components

When working with Shadcn/ui Components:

## Component Overview
Base UI components adapted for Webflow code components, featuring Tailwind styling and exposed props for Webflow configuration.

## Available Components
- Button variants and sizes
- Input fields with validation
- Card components
- Dialog/Modal components
- Form controls
- Navigation components

## Development Guidelines
- Use Tailwind CSS for styling
- Expose all configurable props via PropTypes
- Implement proper TypeScript types
- Follow shadcn/ui component patterns
- Ensure Webflow compatibility

## Props Configuration
When imported into Webflow, configure these props:
- Component variants (style, size, color)
- Text content and labels
- Event handlers
- Disabled states
- Custom CSS classes

## File Structure
- src/components/: Individual component files
- src/lib/: Shared utilities and types
- src/styles/: Tailwind configuration
- src/ui/: Reusable UI primitives

## Testing Notes
- Test all prop combinations
- Verify responsive behavior
- Check accessibility features
- Validate Tailwind class application
- Test in Webflow environment
