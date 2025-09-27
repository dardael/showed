# Technical Documentation

## Feature: Customizable Text Block Component

### Overview

The customizable text block component is designed to provide users with the ability to add and configure rich text blocks within a block. This feature offers flexibility in styling and ensures seamless integration of text blocks into the overall design of the page.

---

### Architecture

#### Domain Layer

1. **TextBlockProperties**

    - A value object that encapsulates the properties of a text block, such as font family, font size, alignment, and colors.
    - Ensures that all property values are valid and conform to the predefined constraints.

2. **TextBlockComponent**
    - An entity representing a text block instance.
    - Manages the lifecycle of the text block, including creation, updates, and rendering.

#### Application Layer

1. **TextBlockService**
    - A service responsible for managing text block operations, including adding, updating, and validating text blocks.
    - Interacts with the repository layer to persist changes.

#### Infrastructure Layer

1. **Component Repository**

    - Updated to handle the persistence and retrieval of text block configurations.
    - Ensures that text block properties are stored and retrieved correctly.

2. **Dependency Injection**
    - Registered `TextBlockService` in the DI container to ensure proper dependency management.

#### UI Layer

1. **Admin Editor**

    - `TextBlockData` component: Provides an interface for configuring text block properties.
    - Includes inputs for text content, font family, font size, alignment, and color pickers.

2. **Display Component**
    - `TextBlock` component: Renders the configured text block on live pages.
    - Applies all styles and properties as configured by the user.

---

### Key Functionalities

1. **Add Text Block Component**

    - Users can select and add a text block component to a block.
    - The component is visible in the block editor interface.

2. **Edit Text Block Properties**

    - Users can customize properties such as:
        - Text Content: Multi-line input for rich text.
        - Font Family: Dropdown with options from the `Font` enumeration.
        - Font Weight: Predefined weight options.
        - Font Size: Dropdown with predefined sizes.
        - Alignment: Options include left, center, right, justify.
        - Foreground and Background Colors: Color pickers with options for blank, white, and theme-based colors.

3. **Render Configured Text Block**

    - The text block displays with the configured content and styling on the live page.
    - Transparent colors are rendered as `transparent` in CSS.

4. **Save and Persist Configuration**
    - The text block’s configuration is saved to the database.
    - Changes persist after saving and are loaded when revisiting the block editor.

---

### Validation

- **Text Content**: Must not be empty.
- **Font Size**: Must be within a predefined range (e.g., 8px to 100px).
- **Colors**: Must be valid hex codes or empty for transparency.
- **Alignment**: Must be one of the predefined options.

---

### Testing

1. **Unit Tests**

    - `TextBlockProperties`: Validates property constraints.
    - `TextBlockComponent`: Ensures proper lifecycle management.
    - `TextBlockService`: Verifies service methods and interactions with the repository.

2. **Integration Tests**

    - Validates the interaction between the admin editor and the repository layer.
    - Ensures that text block configurations persist correctly.

3. **UI Tests**
    - Confirms that the admin interface behaves as expected.
    - Verifies that all inputs and configurations are functional.

---

### Future Enhancements

- Add support for advanced text formatting (e.g., bold, italic, underline).
- Enable live preview of text block styles in the admin editor.
- Allow users to upload custom fonts.

---

### Conclusion

The customizable text block component enhances the application by providing a flexible and intuitive way for users to add and style text content. With robust validation and seamless integration, this feature significantly improves the user experience and design capabilities of the application.
