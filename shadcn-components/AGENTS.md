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
- DataTable with sorting, filtering, pagination, and row selection

## Development Guidelines
- Use Tailwind CSS for styling
- Expose all configurable props via PropTypes
- Implement proper TypeScript types
- Follow shadcn/ui component patterns
- Ensure Webflow compatibility

## Webflow Integration Critical Requirements

### Prop Types Limitations
Webflow's `@webflow/data-types` only supports primitive types:
- **Supported**: Text, Number, Visibility, Variant
- **NOT Supported**: Array, Object, complex data structures

### Wrapper Component Pattern
For components requiring complex data:
1. Create a `.wrapper.tsx` component that handles internal data
2. Use the wrapper in `.webflow.tsx` adapter
3. Only expose simple boolean/text props to Webflow
4. Never pass arrays or objects through Webflow props

### TypeScript Type Safety
- Import types from component files to ensure exact matches
- Use proper type annotations: `const data: Payment[] = [...]`
- Avoid union types in data structures when possible
- Match column definitions exactly with data types

### Webflow Adapter Structure
```typescript
// ❌ DON'T: Use render functions or complex props
export default declareComponent(DataTable, {
  props: { data: props.Array(...) }, // Not supported
  render: (props) => ... // Not supported
});

// ✅ DO: Use wrapper with simple props
export default declareComponent(DataTableWrapper, {
  props: { 
    enableSorting: props.Visibility({ defaultValue: true }),
    searchPlaceholder: props.Text({ defaultValue: "Filter..." })
  }
});
```

## Props Configuration
When imported into Webflow, configure these props:
- Component variants (style, size, color)
- Text content and labels
- Event handlers
- Disabled states
- Custom CSS classes
- Feature toggles (boolean Visibility props)

## File Structure
- src/components/: Individual component files
- src/lib/: Shared utilities and types
- src/styles/: Tailwind configuration
- src/ui/: Reusable UI primitives
- ComponentName.wrapper.tsx: Webflow-compatible wrapper (for complex components)

## Testing Notes
- Test all prop combinations
- Verify responsive behavior
- Check accessibility features
- Validate Tailwind class application
- Test in Webflow environment
- Verify Webflow CLI build: `npx webflow library share`

## Common Webflow Integration Issues
1. **TypeScript errors**: Check for exact type matches between data and column definitions
2. **Build failures**: Ensure no Array/Object props in declareComponent
3. **Missing dependencies**: Install with `npx shadcn@latest add component-name`
4. **Import errors**: Verify all imports use correct paths and types
5. **Shadow DOM Portal issues**: Radix UI Portal components (Dialog, AlertDialog, Sheet, Popover) render outside Shadow DOM by default - use `container` prop to fix (see `components/ui/AGENTS.md` for pattern)
6. **Path alias errors**: Use relative imports (`../../lib/utils`) instead of `@/` aliases in wrapper files
