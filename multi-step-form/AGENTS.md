# Multi-Step Form Component

When working with the Multi-Step Form:

## Component Overview
A dynamic form generator with step-by-step navigation, progress tracking, and conditional logic.

## Key Features
- Step-by-step navigation with progress tracking
- Dynamic field generation based on configuration
- Form validation and error handling
- Conditional logic for showing/hiding fields
- Data persistence across form steps

## Development Guidelines
- Use React state for step management
- Implement validation schema for each step
- Support conditional field rendering
- Maintain form data across navigation
- Use TypeScript for field configuration types

## Props Configuration
When imported into Webflow, configure these props:
- Form steps configuration
- Validation rules
- Conditional logic rules
- Progress display options
- Submission endpoints

## File Structure
- src/components/: Form step components
- src/hooks/: Custom hooks for form state
- src/types/: Form field type definitions
- src/validation/: Validation schemas

## Testing Notes
- Test step navigation forward/backward
- Verify validation at each step
- Test conditional field behavior
- Check data persistence
- Validate form submission
