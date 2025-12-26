# Shadcn/ui Component Development

When working with shadcn/ui components in this directory:

## Component Structure
- Each component has two files: `ComponentName.tsx` (original) and `ComponentName.webflow.tsx` (Webflow adapter)
- Complex components may need a third file: `ComponentName.wrapper.tsx` for Webflow compatibility
- Webflow adapters expose props via PropTypes for canvas configuration
- Components use Tailwind CSS for styling with CSS-in-JS approach

## Development Guidelines

### Component Files
- **Original (.tsx)**: Pure shadcn/ui implementation with all features
- **Webflow (.webflow.tsx)**: Adapted version with exposed props for Webflow
- **Wrapper (.wrapper.tsx)**: Webflow-compatible wrapper for components with complex data (arrays, objects)
- Maintain consistency between original and Webflow versions

### Props Exposure
- Expose all configurable props via PropTypes in .webflow.tsx files
- Use descriptive prop names with clear validation
- Provide sensible default values for all props
- Include proper TypeScript types
- **CRITICAL**: Only use primitive prop types (Text, Number, Visibility, Variant)

### Webflow Integration Requirements

#### Prop Types Limitations
Webflow's `@webflow/data-types` has strict limitations:
- **Supported**: Text, Number, Visibility, Variant
- **NOT Supported**: Array, Object, complex data structures

#### Wrapper Component Pattern
For components requiring complex data (arrays, objects):
1. Create `ComponentName.wrapper.tsx` that handles internal data and complex logic
2. Use the wrapper in `.webflow.tsx` adapter instead of the original component
3. Only expose simple boolean/text props to Webflow through the wrapper
4. Never pass arrays or objects through Webflow props

#### Webflow Adapter Structure
```typescript
// ❌ DON'T: Use complex props or render functions
export default declareComponent(ComplexComponent, {
  props: { data: props.Array(...) }, // Not supported
  render: (props) => ... // Not supported
});

// ✅ DO: Use wrapper with simple props
export default declareComponent(ComplexComponentWrapper, {
  props: { 
    enableFeature: props.Visibility({ defaultValue: true }),
    placeholder: props.Text({ defaultValue: "Search..." })
  }
});
```

#### TypeScript Type Safety
- Import types from component files to ensure exact matches
- Use proper type annotations: `const data: CustomType[] = [...]`
- Match column definitions exactly with data types for table components
- Avoid union types in data structures when possible

### Styling Approach
- Use Tailwind CSS classes for styling
- Implement variant systems for different styles (default, destructive, outline, secondary, ghost, link)
- Support size variants (default, sm, lg, icon)
- Ensure responsive design considerations

### Component Patterns
- Follow React forwardRef pattern for ref forwarding
- Use compound components when appropriate (e.g., Dialog with Trigger, Content, etc.)
- Implement proper accessibility features (ARIA attributes, keyboard navigation)
- Handle loading states and error states

## Available Components

### Interactive Elements
- **Button**: Multiple variants, sizes, and states
- **Input**: Text, email, password with validation states
- **Checkbox**: Single and group implementations
- **Radio**: Single and group implementations
- **Switch**: Toggle functionality
- **Select**: Dropdown with search capability

### Layout Components
- **Card**: Container with header, content, footer
- **Dialog**: Modal with overlay and close functionality
- **Sheet**: Slide-out panel from edges
- **Tabs**: Tab navigation with content panels
- **Accordion**: Collapsible content sections

### Data Components
- **DataTable**: Full-featured table with sorting, filtering, pagination, row selection
- **Badge**: Status indicators and labels
- **Avatar**: User profile images with fallback
- **Progress**: Linear and circular progress indicators
- **Skeleton**: Loading placeholder content

## Webflow Integration

### PropTypes Configuration
```typescript
// ✅ CORRECT: Use only primitive types
export default declareComponent(ComponentWrapper, {
  props: {
    variant: props.Variant({ options: ['default', 'destructive'] }),
    size: props.Variant({ options: ['default', 'sm', 'lg'] }),
    disabled: props.Visibility({ defaultValue: false }),
    placeholder: props.Text({ defaultValue: "Enter text..." }),
    className: props.Text({ defaultValue: "" })
  }
});
```

### Event Handling
- Expose onClick, onChange, onSubmit handlers as props
- Use proper event types (React.MouseEvent, React.ChangeEvent)
- Provide callback function signatures in prop documentation

### Content Slots
- Use children prop for flexible content injection
- Implement named slots for complex components (e.g., Dialog.Title, Dialog.Content)
- Support CMS content binding through slot props

## Testing Requirements
- Verify all prop combinations work correctly
- Test responsive behavior across breakpoints
- Validate accessibility with screen readers
- Check keyboard navigation functionality
- Test in Webflow canvas environment
- **CRITICAL**: Verify Webflow CLI build: `npx webflow library share`

## Common Webflow Integration Issues
1. **TypeScript type mismatches**: Ensure exact type matches between data and column definitions
2. **Array/Object prop errors**: Webflow doesn't support complex props - use wrapper pattern
3. **Render function errors**: declareComponent doesn't support render functions
4. **Missing dependencies**: Install with `npx shadcn@latest add component-name`
5. **Import errors**: Verify all imports use correct paths and types

## File Naming Conventions
- Use PascalCase for component files: `Button.tsx`, `Button.webflow.tsx`
- For complex components: `DataTable.tsx`, `DataTable.webflow.tsx`, `DataTable.wrapper.tsx`
- Keep original, Webflow, and wrapper files in same directory
- Maintain consistent naming across related components

## Import Statements
```typescript
// Original component
import { Button } from "./Button"

// Webflow component
import { Button } from "./Button.webflow"

// Wrapper component (for complex data)
import { DataTableWrapper } from "./DataTable.wrapper"
```

## Performance Considerations
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Avoid unnecessary re-renders with stable references
- Optimize bundle size with tree shaking
- Consider virtualization for large data sets (tables, lists)
