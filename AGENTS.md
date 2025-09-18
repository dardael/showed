# AGENTS.md

## Project Overview

This comprehensive guide outlines best practices, conventions, and standards for development with modern web technologies including ReactJS, NextJS, TypeScript,CSS, and UI frameworks. The guide emphasizes clean, maintainable, and scalable code following SOLID principles and functional programming patterns.

## Tech Stack

- **Frontend Framework**: Next.js 14+ with App Router
- **UI Library**: React 18+ with TypeScript
- **Styling**: Tailwind CSS + Chakra UI
- **Testing**: Jest + React Testing Library
- **Database**: MongoDB with Mongoose
- **Code Quality**: ESLint + Prettier + TypeScript strict mode

## Project Structure

```
showed/
|-- .storybook                    # contains storybook configuration
|-- infra/                        # contains Dockerfile to build to run the project
|  |-- showed/                    # image for development containing nginx and node
|  |-- showed-prod/               # image for production containing nginx and node
|  |-- storybook/                 # image for launching storybook
|-- public/                       # static files served by Next.js
|-- scripts/                      # scripts to launch on server side
|-- src/                          # main source code
|  |-- app/                       # Next.js App router pages and api
|  |  |-- api/                    # Next.js api routes
|  |-- components/                # reusable React components. story are used to document components and are next to the component files
|  |  |-- core/                   # core components used across the app.
|  |  |  |-- database/            # contains methods to interact with the database and connection to the database
|  |  |  |-- dependencyInjection/ # contains dependency injection logic.
|  |  |  |  |-- container.ts      # the file that fill the dependency injection container with dependencies
|  |  |  |  |-- getter.ts         # contains the method to get the object from the dependency injection container.
|  |  |  |  |-- getter.mock.ts    # contains the method to mock the dependency injection container for storybook.
|  |-- controllers/               # server actions used to call server from client
|  |-- lib/                       # containing logic, mostly used by controllers
|  |  |-- frontend/               # contains frontend logic
|  |  |-- core/                   # core logic used across the app
|  |-- types.d.ts                 # global types for the project
|-- tests/                        # contains jest unit tests
|  |-- components/                # react components tests
|  |-- lib/                       # server logic tests
|-- docker-compose.yml            # contains docker image to run the project and to run storybook
|-- jest.config.ts                # contains jest configuration
|-- jest.config.setup             # contains jest code launched before each test
|-- next.config.js                # contains next.js configuration
|-- package.json                  # contains project dependencies
|-- postcss.config.js             # contains postcss configuration
|-- README.md                     # project documentation
|-- tailwind.config.js            # contains tailwind configuration
|--- tsconfig.json                # contains typescript configuration
```

## Development Guidelines

### Development philosophy

- Write clean, maintainable, and scalable code
- Follow SOLID principles
- Follow clean code practices
- use hexagonal architecture in lib directory
- use dependency injection in lib directory
- Prefer functional and declarative programming patterns over imperative
- Emphasize type safety and static analysis

### Code implementation guidelines

#### planning phase

- Begin with step-by-step planning
- Write detailed pseudocode before implementation
- Document component architecture and data flow
- Consider edge cases and error scenarios

#### Code Style Standards

- Use tabs for indentation
- Use single quotes for strings (except to avoid escaping)
- Eliminate unused variables
- Add space after keywords
- Add space before function declaration parentheses
- Always use strict equality (===) instead of loose equality (==)
- Space infix operators
- Add space after commas
- Keep else statements on the same line as closing curly braces
- Use curly braces for if statements
- Always handle error parameters in callbacks
- Limit line length to 80 characters
- Use trailing commas in multiline object/array literals
- avoid static function in classes
- Add comments only for complex logic. Functions and variable names should be self-explanatory
- Only have a class or a react component by file. Only interfaces and types can be grouped in a single file with its class or component

### Naming Conventions

#### General Rules

- **PascalCase for**: Components, Type definitions, Interfaces
- **kebab-case for**: Directory names (e.g., components/auth-wizard), File names (e.g., user-profile.tsx)
- **camelCase for**: Variables, Functions, Methods, Hooks, Properties, Props
- **UPPERCASE for**: Environment variables, Constants, Global configurations

#### Specific Naming Patterns

- Prefix boolean variables with verbs: `isLoading`, `hasError`, `canSubmit`
- Use complete words over abbreviations

## Core Feature Implementation

### React Component Best Practices

#### Component Architecture

- Use functional components with TypeScript interfaces
- Define components using the function keyword
- Extract reusable logic into custom hooks
- Implement proper component composition
- Use React.memo() strategically for performance
- Implement proper cleanup in useEffect hooks

#### React Performance Optimization

- Use useCallback for memoizing callback functions
- Implement useMemo for expensive computations
- Avoid inline function definitions in JSX
- Implement code splitting using dynamic imports
- Implement proper key props in lists (avoid using index as key)

### Next.js Best Practices

#### Core Concepts

- Utilize App Router for routing
- Implement proper metadata management
- Use proper caching strategies
- Implement proper error boundaries

#### Components and Features

- Use Next.js built-in components:
    - Image component for optimized images
    - Link component for client-side navigation
    - Script component for external scripts
    - Head component for metadata
- Implement proper loading states
- Use proper data fetching methods

#### Server Components

- Default to Server Components
- Use URL query parameters for data fetching and server state management
- Use 'use client' directive only when necessary:
    - Event listeners
    - Browser APIs
    - State management
    - Client-side-only libraries

```tsx
// Example: Server Component with data fetching
interface PostsPageProps {
    searchParams: { page?: string; category?: string };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
    const page = Number(searchParams.page) || 1;
    const category = searchParams.category || 'all';

    const posts = await fetchPosts({ page, category });

    return (
        <div className='posts-page'>
            <h1>Posts</h1>
            <PostsList posts={posts} />
            <Pagination currentPage={page} />
        </div>
    );
}
```

### TypeScript Implementation

- Enable strict mode
- Define clear interfaces for component props, state, and Redux state structure
- Use type guards to handle potential undefined or null values safely
- Apply generics to functions, actions, and slices where type flexibility is needed
- Utilize TypeScript utility types (Partial, Pick, Omit) for cleaner and reusable code
- Prefer interface over type for defining object structures, especially when extending
- Use mapped types for creating variations of existing types dynamically

```tsx
// Example: TypeScript interfaces and types
interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    createdAt: Date;
    updatedAt: Date;
}

interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

type UserCreateInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UserUpdateInput = Partial<Pick<User, 'name' | 'email' | 'role'>>;

// Type guard example
function isUser(obj: unknown): obj is User {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'id' in obj &&
        'name' in obj &&
        'email' in obj
    );
}
```

## State Management

### Local State

- Use useState for component-level state
- Implement useReducer for complex state
- Use useContext for shared state
- Implement proper state initialization

### Global State with Redux Toolkit

- Use Redux Toolkit for global state
- Use createSlice to define state, reducers, and actions together
- Avoid using createReducer and createAction unless necessary
- Normalize state structure to avoid deeply nested data
- Use selectors to encapsulate state access
- Avoid large, all-encompassing slices; separate concerns by feature

```tsx
// Example: Redux slice with TypeScript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    users: User[];
    currentUser: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { setLoading, setUsers, setCurrentUser, setError, clearError } =
    userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUsers = (state: RootState) => state.user.users;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;
```

## UI and Styling

### Component Libraries

- Use Chakra UI for consistent, accessible component design
- Apply composition patterns to create modular, reusable components

### Styling Guidelines

- Design with mobile-first, responsive principles for flexibility across devices
- Ensure color contrast ratios meet accessibility standards for readability
- Maintain consistent spacing values to establish visual harmony

## Testing Strategy

### Unit Testing

- Write thorough unit tests to validate individual functions and components
- Use Jest and React Testing Library for reliable and efficient testing of React components
- Follow patterns like Arrange-Act-Assert to ensure clarity and consistency in tests
- Mock external dependencies and API calls to isolate unit tests

## Error Handling and Validation

### Form Validation

- Use Chakra ui form for schema validation
- Implement proper error messages

### Error Boundaries

- Use error boundaries to catch and handle errors in React component trees gracefully
- Design user-friendly fallback UIs to display when errors occur, keeping users informed without breaking the app

## Performance Optimization

### Frontend Optimization

- Code splitting with dynamic imports
- Lazy loading for non-critical components
- Caching strategies for API responses
- Image optimization with Next.js Image component

```tsx
// Example: Code splitting and lazy loading
import { lazy, Suspense } from 'react';

const LazyDashboard = lazy(() => import('./Dashboard'));
const LazySettings = lazy(() => import('./Settings'));

export function App() {
    return (
        <div className='app'>
            <Suspense fallback={<div>Loading Dashboard...</div>}>
                <LazyDashboard />
            </Suspense>

            <Suspense fallback={<div>Loading Settings...</div>}>
                <LazySettings />
            </Suspense>
        </div>
    );
}
```

### Backend Optimization

- Database query optimization
- Load balancing strategies
- API response optimization

## Security Considerations

### Data Security

- Implement input sanitization to prevent XSS attacks
- Use DOMPurify for sanitizing HTML content
- Use proper authentication methods
- Validate all user inputs

```tsx
// Example: Input sanitization with DOMPurify
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
    html: string;
    className?: string;
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
    const sanitizedHtml = DOMPurify.sanitize(html);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
    );
}
```

### Authentication & Authorization

- Implement proper user authentication flow
- Use JWT tokens securely
- Implement role-based access control
- Secure API endpoints

## Accessibility (a11y)

### Core Requirements

- Use semantic HTML for meaningful structure
- Apply accurate ARIA attributes where needed
- Ensure full keyboard navigation support
- Manage focus order and visibility effectively
- Maintain accessible color contrast ratios
- Follow a logical heading hierarchy
- Make all interactive elements accessible
- Provide clear and accessible error feedback

## dependency injection

typedi is used for dependency injection in the project. It allows for better separation of concerns and easier testing by decoupling components from their dependencies. it is used with hexagonal architecture in the lib directory. in the lib/core directory, you can find the `dependencyInjection` folder which contains the `container.ts` file that fills the dependency injection container with dependencies, and the `getter.ts` file that contains the method to get the object from the dependency injection container. The `getter.mock.ts` file is used to mock the dependency injection container for storybook.

In lib folder. each directory is a functional domain. for example lib/theme contains the theme logic. in each functional domain. you can find a service folder which contains interface for service visible outside the domain. the implementation of these interfaces are directly under the domain folder. for example in lib/theme/service you can find the `themeService.ts` file which contains the interface for the theme service, and in lib/theme you can find the `themeServiceImpl.ts` file which contains the implementation of the theme service. this allows for better separation of concerns and easier testing by decoupling components from their dependencies.

For other object not visible outside, you can find the interface direclty under the domain folder, and the implementation in /bridge folder. for example in lib/theme you can find the `theme.ts` file which contains the interface for the theme, and in lib/theme/bridge you can find the `themeImpl.ts` file which contains the implementation of the theme. this allows for better separation of concerns and easier testing by decoupling components from their dependencies.

In a domain folder, you can find the model folder which contains the model for the domain and the document model for monggose. for example in lib/theme/model you can find the `themeModel.ts`which contains the logic for Mongoose model and `theme.ts` file which contains the model for the theme . this allows for better separation of concerns and easier testing by decoupling components from their dependencies.

## Command to use

### Launch tests

```bash
docker compose run --rm showed npm run test
```

### Install npm packages

```bash
docker compose run --rm showed npm install
```

### Launch storybook

```bash
docker compose up -d storybook
```

### Launch the project

```bash
docker compose up -d showed
```

## Common Issues

### Issue 1: Hydration Mismatch Errors

**Solution**:

- Ensure server and client render the same content
- Use `useEffect` for client-only code
- Use `dynamic` imports with `ssr: false` for client-only components
- Check for differences in date/time formatting between server and client

### Issue 2: Performance Issues with Large Lists

**Solution**:

- Implement virtualization for large datasets
- Use pagination or infinite scrolling
- Optimize re-renders with `React.memo` and `useMemo`
- Consider server-side filtering and sorting

### Issue 3: TypeScript Type Errors in Production Build

**Solution**:

- Enable strict mode in TypeScript configuration
- Fix all type errors before deployment
- Use proper type definitions for third-party libraries
- Implement proper error boundaries for runtime type issues

### Issue 4: SEO and Meta Tags Not Working

**Solution**:

- Use Next.js `Metadata` API in App Router
- Implement proper Open Graph tags
- Ensure meta tags are rendered server-side
- Test with social media debuggers

## Reference Resources

- [Next.js Official Documentation](https://nextjs.org/docs)
- [React Official Documentation](https://react.dev/)
- [TypeScript Official Documentation](https://www.typescriptlang.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chakra UI Documentation](https://v2.chakra-ui.com/docs/components)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Typedi Documentation](https://docs.typestack.community/typedi/02-basic-usage-guide)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)

```

```
