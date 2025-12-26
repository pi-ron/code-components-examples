# DataTable Component Development

When working with DataTable components in this directory:

## Component Structure
- `data-table.tsx` - Main DataTable component with TanStack Table integration
- `data-table.webflow.tsx` - Webflow adapter with exposed props
- `data-table-wrapper.tsx` - Webflow-compatible wrapper for complex data
- `columns.tsx` - Example column definitions and data types
- Follows the established pattern of original + Webflow adapter files

## Development Guidelines

### Core Features
- **Sorting**: Click column headers to sort (asc/desc)
- **Filtering**: Search input for filtering data by specified column
- **Pagination**: Navigate through data pages with Previous/Next controls
- **Column Visibility**: Toggle column visibility via dropdown
- **Row Selection**: Select individual rows or all rows with checkboxes

### Props Configuration
The DataTable accepts the following configurable props:
- `data`: Array of data objects to display (handled internally in wrapper)
- `enableSorting`: Enable/disable column sorting (default: true)
- `enableFiltering`: Enable/disable search filtering (default: true)
- `enablePagination`: Enable/disable pagination (default: true)
- `enableColumnVisibility`: Enable/disable column visibility toggle (default: true)
- `enableRowSelection`: Enable/disable row selection (default: true)
- `searchPlaceholder`: Placeholder text for search input
- `searchColumn`: Column name to filter on (default: "email")

### Data Structure
Data objects should follow this structure:
```typescript
{
  id: string        // Unique identifier
  amount: number    // Numeric value for formatting
  status: string    // Status for badge display
  email: string     // Text content for filtering
}
```

### Column Definitions
- Use `ColumnDef<TData>[]` from TanStack Table
- Include `accessorKey` for data mapping
- Custom `header` components for sorting controls
- Custom `cell` components for formatting and actions
- Use `id` field for special columns (select, actions)

## Webflow Integration Critical Requirements

### Wrapper Component Pattern (REQUIRED)
Due to Webflow's prop type limitations:
1. **Complex data MUST be internal**: Never pass arrays or objects through Webflow props
2. **Use wrapper component**: Create `.wrapper.tsx` to handle data and columns internally
3. **Simple props only**: Expose only boolean (Visibility) and text (Text) props to Webflow
4. **No render functions**: Webflow's declareComponent doesn't support render functions

### Webflow Adapter Structure
```typescript
// ✅ CORRECT: Use wrapper with simple props
export default declareComponent(DataTableWrapper, {
  name: "Data Table",
  props: {
    enableSorting: props.Visibility({ defaultValue: true }),
    searchPlaceholder: props.Text({ defaultValue: "Filter..." })
  }
});
```

### TypeScript Type Safety
- Import types from columns.tsx: `import { Payment } from "./columns"`
- Type sample data exactly: `const sampleData: Payment[] = [...]`
- Match column definitions with data structure exactly
- Avoid union types in status fields when possible

### Common Integration Issues
1. **Type mismatch**: `ColumnDef<Payment>[]` vs `ColumnDef<{...}, unknown>[]`
   - Fix: Import and use exact types from column definitions
2. **Array prop error**: `props.Array` is not supported
   - Fix: Use wrapper component pattern
3. **Render function error**: declareComponent doesn't support render
   - Fix: Use wrapper component instead

## Available Components

### Base Table
- Imported from `@/components/ui/table`
- Provides styled table elements (Table, TableHeader, etc.)
- Uses Tailwind CSS for consistent styling

### Interactive Elements
- **Button**: Used for sorting headers, pagination, actions
- **Input**: Search/filter input field
- **Checkbox**: Row selection controls
- **Badge**: Status display with variants
- **DropdownMenu**: Column visibility and row actions

## Implementation Notes

### TanStack Table Integration
- Use `useReactTable` hook with configuration options
- Enable features conditionally based on props
- Manage state for sorting, filtering, visibility, selection
- Use `flexRender` for dynamic cell/header rendering

### Performance Considerations
- Table handles large datasets efficiently
- Pagination reduces rendering overhead
- Filtering operates on current page data
- Consider virtualization for very large datasets

### Styling Approach
- Consistent with shadcn/ui design system
- Responsive design with mobile support
- Accessible with proper ARIA attributes
- Hover states and transitions for better UX

## Testing Requirements
- Verify all features work independently
- Test sorting on different column types
- Validate filtering with various search terms
- Check pagination navigation
- Test row selection (individual and select all)
- Verify column visibility toggle
- Test responsive behavior on mobile devices
- **CRITICAL**: Test Webflow CLI build: `npx webflow library share`

## Webflow Usage
1. Import DataTable component into Webflow
2. Configure feature toggles as needed (no data configuration required)
3. Customize search placeholder and column if desired
4. Test in Webflow canvas environment

## Troubleshooting Checklist
- [ ] All TypeScript types match exactly between data and columns
- [ ] No Array/Object props in declareComponent
- [ ] Wrapper component handles all complex data internally
- [ ] Webflow CLI builds successfully
- [ ] Component appears in Webflow shared library
