# Functional Documentation

## Feature: Customizable Text Block Component

### Overview

The customizable text block component allows users to add and configure rich text blocks within a block. This feature provides flexibility in styling and ensures that the text block integrates seamlessly into the overall design of the page.

### Key Functionalities

#### 1. **Add Text Block Component to a Block**

- Users can select the text block component from the available component options.
- The text block component is added to the block and is visible in the block editor interface.

#### 2. **Edit Text Block Properties**

Users can customize the following properties of the text block:

- **Text Content**: Multi-line text input for entering rich text.
- **Font Family**: Select input based on the `Font` enumeration (e.g., Roboto Flex, Advent Pro).
- **Font Weight**: Options include normal, bold, lighter, bolder, and numeric weights (100-900).
- **Font Size**: Select input with predefined sizes (e.g., 12px, 14px, 16px, etc.).
- **Alignment**: Options include left, center, right, and justify.
- **Foreground Color**: Color picker with options for blank (transparent), white, and theme-based colors.
- **Background Color**: Color picker with options for blank (transparent), white, and theme-based colors.

#### 3. **Render Configured Text Block on Page**

- The text block displays with the configured content and styling on the live page.
- The font family, weight, size, alignment, foreground color, and background color match the user’s configuration.
- Transparent colors are rendered correctly as `transparent` in CSS.

#### 4. **Save and Persist Text Block Configuration**

- The text block’s configuration is saved to the database.
- The saved configuration is loaded when revisiting the block editor.
- Changes to the text block persist after saving the block.

### User Interface

#### **Admin Editor**

- **Text Content**: Multi-line text area for entering content.
- **Font Family**: Dropdown menu populated with options from the `Font` enumeration.
- **Font Weight**: Dropdown menu with predefined weight options.
- **Font Size**: Dropdown menu with predefined size options.
- **Alignment**: Dropdown menu with alignment options.
- **Foreground and Background Colors**: Color pickers with options for blank, white, and theme-based colors.

#### **Live Page**

- The text block is rendered with all applied styles and configurations.
- Transparent colors are displayed as `transparent`.

### Validation

- **Text Content**: Must not be empty.
- **Font Size**: Must be within a predefined range (e.g., 8px to 100px).
- **Colors**: Must be valid hex codes or empty for transparency.
- **Alignment**: Must be one of the predefined options.

### Testing

- Unit tests for `TextBlockProperties`, `TextBlockComponent`, and `TextBlockService` ensure validation and functionality.
- Integration tests verify that the text block component integrates seamlessly with the block editor.
- UI tests confirm that the admin interface behaves as expected.

### Implementation Details

#### **Domain Layer**

- **TextBlockProperties**: Value object for managing text block properties.
- **TextBlockComponent**: Entity for managing text block instances.

#### **Application Layer**

- **TextBlockService**: Service for adding and updating text blocks.

#### **Infrastructure Layer**

- **Component Repository**: Updated to handle text block properties.
- **Dependency Injection**: Registered `TextBlockService` in the DI container.

#### **UI Layer**

- **Admin Editor**: `TextBlockData` component for configuring text block properties.
- **Display Component**: `TextBlock` component for rendering the text block on live pages.

### Future Enhancements

- Add support for advanced text formatting (e.g., bold, italic, underline).
- Enable live preview of text block styles in the admin editor.
- Allow users to upload custom fonts.

### Conclusion

The customizable text block component provides a powerful and flexible way for users to add and style text content on their pages. With its intuitive interface and robust validation, this feature enhances the overall user experience and design capabilities of the application.
