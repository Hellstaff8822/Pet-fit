---
trigger: always_on
---

# PetFit — Project Context

## 1. Product Identity

PetFit is a mobile application built with React Native + Expo + TypeScript.

Core idea:

> Help a person understand which type of pet may fit their lifestyle, living conditions, time, budget, activity level, and responsibility — or whether they should consider not getting a pet at this moment.

PetFit is not just a fun animal quiz.

The product should encourage thoughtful and responsible decisions about pet ownership.

Prioritize:
- usefulness
- responsibility
- personalization
- simple UX
- maintainable architecture
- clear explanations

A valid result is sometimes:

> "You may not be ready to get a pet right now."

Never force a pet recommendation when the answers indicate that pet ownership may currently be unsuitable.

---

## 2. Current Stack

### Mobile

- React Native
- Expo
- TypeScript
- Expo Router

### Tooling

- npm
- Git
- GitHub
- VS Code

### Planned Backend

- Node.js
- Express
- TypeScript

### Planned Database

- PostgreSQL
- Prisma or another ORM if explicitly selected later

### Planned AI

AI will be added later.

Potential architecture:

PetFit Mobile
↓
Backend API
↓
AI Provider
↓
Structured recommendation
↓
PetFit Mobile

Never expose a private AI API key directly inside the mobile application.

---

## 3. Core Product Flow

Initial flow:

Welcome
↓
Quiz Introduction
↓
Questions
↓
Answers
↓
Scoring
↓
Recommendation
↓
Result Explanation

Later:

User Profile
↓
Deterministic Scoring Engine
↓
Recommendation
↓
AI Personalization
↓
Final Result

The deterministic scoring engine is the source of truth for compatibility.

AI should enhance:
- explanations
- personalization
- natural-language summaries
- comparisons
- follow-up insights

AI should not blindly determine the final recommendation.

---

## 4. Recommendation Engine

Separate the system into:

### Decision Logic

Responsible for:
- calculating compatibility
- weighting answers
- evaluating constraints
- ranking pets
- detecting unsuitable conditions

### UI / Presentation

Responsible for:
- displaying the result
- showing compatibility
- showing reasons
- showing warnings

### AI

Responsible for:
- personalized explanations
- natural-language summaries
- comparisons
- follow-up insights

Never place core scoring logic directly inside screen components.

Prefer:

answers
↓
normalized answers
↓
scoring
↓
ranking
↓
recommendation

The scoring engine should be deterministic, explainable and testable.

---

## 5. Question System

Questions should be structured data, not hardcoded quiz logic inside screens.

Possible fields:

- id
- category
- question
- options
- score impact
- relevant pet types
- constraints
- metadata

Example:

```ts
type Question = {
  id: string;
  category: QuestionCategory;
  question: string;
  options: QuestionOption[];
};
```

Do not finalize or redesign the domain model without first inspecting the existing implementation and requirements.

---

## 6. Pet Data

Keep pet-related data separate from UI.

Potential attributes:

- activity level
- required attention
- space requirements
- care complexity
- noise level
- social needs
- typical ownership cost
- apartment suitability
- beginner suitability

Do not invent factual animal-care claims.

When a real-world claim materially affects a recommendation, use a verified source or explicitly state that the data is missing.

---

## 7. MVP Scope

Keep the first version intentionally small.

Initial MVP:

1. Welcome screen
2. Quiz introduction
3. Questions
4. Answer selection
5. Progress indicator
6. Next/back navigation
7. Scoring
8. Result screen
9. Compatibility percentage
10. Explanation
11. Warnings / considerations

Do not add prematurely:

- authentication
- backend
- database
- AI
- complex global state
- social features
- notifications
- analytics
- subscriptions

The MVP should work locally first.

---

## 8. Development Phases

### Phase 1 — Mobile MVP

- React Native
- Expo
- TypeScript
- local data
- questionnaire
- scoring
- result screen

### Phase 2 — UX Improvements

- animations
- visual hierarchy
- accessibility
- better feedback
- improved result presentation

Do not add unnecessary architectural complexity.

### Phase 3 — Backend

Introduce:
- Node.js
- Express
- TypeScript
- API layer
- validation
- error handling

Potential responsibilities:
- user profiles
- quiz results
- pet data
- recommendation history

### Phase 4 — Database

Introduce:
- PostgreSQL
- ORM
- migrations
- relationships

Possible entities:
- User
- Pet
- Question
- QuestionOption
- QuizAttempt
- Recommendation

Only create entities that current requirements justify.

### Phase 5 — Authentication

Potential features:
- registration
- login
- logout
- protected resources
- persisted profile

Only implement accounts when the product needs persisted user data.

### Phase 6 — AI

Potential architecture:

PetFit Mobile
↓
Backend
↓
AI Service
↓
Structured response
↓
Mobile result

Keep provider credentials on the server.

Prefer structured AI output over arbitrary text when the mobile app consumes the result programmatically.

### Phase 7 — Production / Deployment

Potential areas:
- production environment
- environment variables
- secure secrets
- API deployment
- database hosting
- error monitoring
- CI/CD
- app builds
- release process

Do not implement production infrastructure before it is justified.

---

## 9. React Native / Expo Rules

This is a React Native project.

Do not assume DOM or browser APIs exist.

Verify React Native / Expo compatibility before using a web-specific API or library.

Prefer:
- View
- Text
- Pressable
- TextInput
- ScrollView
- FlatList
- Image

Do not use HTML elements unless web support is explicitly intended and compatibility is confirmed.

Do not assume browser CSS behavior is identical to React Native styling.

Expo is part of the intended architecture.

Do not eject or migrate away from Expo unless explicitly requested.

Before adding native functionality:
1. check whether Expo already provides it;
2. check compatibility with the current SDK;
3. choose the simplest supported solution.

---

## 10. TypeScript Rules

Use TypeScript consistently.

Avoid `any` unless there is a strong reason.

Prefer:
- explicit domain types
- type-safe data models
- discriminated unions where useful
- narrow types
- reusable types
- safe parsing of external data

Data from APIs, AI, storage and user input is external/untrusted data and should not automatically be assumed to have the expected shape.

---

## 11. Architecture

Prefer this separation:

UI
↓
Hooks / Presentation Logic
↓
Domain / Business Logic
↓
Data / Services

Avoid:
- giant components
- business logic in JSX
- API calls scattered through UI
- scoring logic in screens
- unnecessary coupling

A possible structure is:

```text
app/
components/
features/
hooks/
services/
data/
types/
utils/
constants/
```

Do not create every directory immediately. Follow the existing project structure and introduce abstractions only when needed.

---

## 12. State Management

Use the simplest solution that fits the current scope.

Preferred order:

1. local state
2. lifted state
3. custom hook
4. Context when genuinely shared
5. global state only when necessary

Do not introduce Redux, Zustand or another global store just because the project uses React.

For the quiz MVP, local state or a dedicated quiz hook may be enough.

---

## 13. AI Rules

AI is a future feature, not an MVP requirement.

AI must provide real product value.

Good use cases:
- personalized explanations
- recommendation summaries
- comparing top matches
- contextual follow-up insights

Bad uses:
- AI replacing deterministic scoring without justification
- AI inventing pet facts
- AI receiving secrets
- AI directly controlling navigation
- AI mutating application state without validation

Treat AI output as untrusted external data.

Validate it before using it.

---

## 14. Security

Never put secrets in:
- React Native source code
- public client-side environment variables
- constants
- GitHub

AI/API secrets must stay on the backend.

Never commit:
- `.env`
- `.env.local`
- API keys
- tokens
- passwords
- private credentials

unless they only contain safe example values.

---

## 15. UX Principles

Every screen should have one clear purpose.

Prioritize:
- simple language
- clear actions
- visible progress
- useful feedback
- concise explanations
- accessible interaction

Avoid:
- unnecessary modals
- excessive animations
- excessive configuration
- overloaded screens
- technical language in user-facing UI

The user should understand:
1. What is happening?
2. What do I need to do?
3. What happens next?

---

## 16. Accessibility

Consider accessibility from the beginning.

Pay attention to:
- readable text
- touch target size
- contrast
- screen reader labels
- keyboard/input behavior
- clear state feedback

Accessibility is not a final cleanup task.

---

## 17. Performance

Do not optimize prematurely.

Avoid obvious issues:
- unnecessary re-renders
- unstable list rendering
- expensive calculations in render
- memory leaks
- excessive effects
- unnecessary global state

Use appropriate React Native list primitives such as `FlatList` for longer lists.

Measure before implementing complex optimizations.

---

## 18. Testing

Prioritize testing of important business logic:

- scoring
- recommendation ranking
- validation
- data transformations
- API behavior
- important user flows

The scoring engine should be testable independently from the UI.

Prefer pure functions where possible.

Conceptually:

answers
→ calculateScores()
→ rankedPets

should be testable without rendering screens.

---

## 19. Learning Project Rules

PetFit is also a learning project.

When the developer is learning:
- explain the concept first;
- show the architecture;
- provide hints;
- let the developer implement;
- review the implementation;
- explain mistakes;
- provide full code only when explicitly requested or necessary.

Do not turn the project into blind copy-paste development.

---

## 20. Long-Term Direction

Long-term architecture may evolve toward:

```text
                  PETFIT MOBILE
                       │
                React Native
                    + Expo
                       │
                       │ HTTPS
                       ▼
                 PETFIT API
                       │
               Node.js + Express
                       │
          ┌────────────┴────────────┐
          │                         │
     PostgreSQL                  AI Service
          │                         │
          └────────────┬────────────┘
                       │
                Recommendation
                       │
                       ▼
                PetFit Mobile
```

Do not implement the complete architecture prematurely.

Build progressively:

Phase 1:
Local mobile MVP

↓

Phase 2:
Better UX

↓

Phase 3:
Backend

↓

Phase 4:
Database

↓

Phase 5:
Authentication

↓

Phase 6:
AI

↓

Phase 7:
Production / Deployment

---

## 21. Final Product Principle

Build PetFit as a useful product, not a technology showcase.

Prioritize:

1. correctness
2. product value
3. simplicity
4. maintainability
5. clear architecture
6. learning value
7. safe incremental progress
