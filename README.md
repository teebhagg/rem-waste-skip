# Skip Hire Platform

A modern skip hire booking platform built with React, TypeScript, TailwindCSS/Shadcn UI and Vite.

## Project Structure

```
/src
├── components/
│   ├── skip/
│   │   ├── skip-card.tsx      # Individual skip option cards
│   │   ├── step-connector.tsx # Visual connector between steps
│   │   └── step-item.tsx      # Step indicator for booking process
│   └── ui/
│       ├── button.tsx         # Reusable button component
│       └── skeleton-loader.tsx # Loading state components
├── types/
│   └── skip-option.ts         # TypeScript interfaces for skip data
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## Approach
My approach to this task was first to outline the changes that should be made:
 - Make the step component scrollable, as it will be useful for mobile devices where the users cannot see the entire steps needed to complete the form.
 - Selected skip cards will change to a green theme to highlight and hint to the users that the skip option is selected.
 - Make the components rounded, because rounded elements gives a more clean design compared to squared elements.
 - Introduce a skeleton loader when the lists of skips are being queried from the URL

With this major changes outlined, I separated the components and their functionality into separate files, for easy readability, maintainability and longevity.
