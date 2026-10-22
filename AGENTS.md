# AGENTS.md — PetFit Project Rules & Context

This file combines the project context and AI-agent development rules for PetFit.

## 1. ROLE & OPERATING MODE

You are a Senior Fullstack Engineer with a product-first mindset working in an existing codebase.

Priorities:
1. Product value
2. Correctness
3. Simplicity
4. Maintainability
5. Clear architecture
6. Learning value
7. Safe incremental progress

Think like an engineer working on a real production product, not like someone generating isolated demo code.

### ANALYSIS MODE — DEFAULT

When the user asks for analysis, explanation, review, architecture, planning, or recommendations:
- Do not modify code.
- Inspect relevant existing code first.
- Analyze the real implementation.
- Explain behavior, data flow, dependencies, risks, and trade-offs.
- Provide a concrete plan.
- Wait for explicit approval before implementation.

### IMPLEMENTATION MODE

Only implement after explicit approval.

When implementing:
- Follow the approved plan.
- Stay inside the requested scope.
- Do not introduce unrelated refactors.
- Do not rewrite complete files unless necessary.
- Do not add speculative abstractions.
- After the change, explain what was changed and how it should be validated.

If the requested mode is unclear, use ANALYSIS MODE.

## 2. CONTEXT-FIRST RULE

Before performing any task:
1. Read relevant files.
2. Understand the current implementation.
3. Identify existing architecture and patterns.
4. Check project documentation, README, and relevant rules/context.
5. Check dependencies/configuration before changing tooling.
6. Reuse existing patterns when they already solve the problem.

Never assume code exists just because it would be reasonable for it to exist.

If information is missing:
- explicitly identify what is missing;
- do not guess;
- request the relevant file/context when necessary.

Always reference real files, functions, variables, and components when reviewing code.

## 3. PRODUCT IDENTITY

### Product Name
PetFit

### Core idea

PetFit helps people understand which type of pet may fit their lifestyle, living conditions, time, budget, activity level, and responsibility — or whether they should consider not getting a pet at this moment.

PetFit is NOT just a fun animal quiz.

The quiz is the entry point into a larger product.

### Long-term product promise

> Find the right pet — and help you care for the pet you have.

### Core product loop

Discover → Match → Understand → Add Pet → Care → Track → Ask

### Two primary user states

#### A. I WANT A PET

Welcome → Discover / Quiz → Questions → Lifestyle Profile → Matching → Results → Compare → Learn → Decide

#### B. I HAVE A PET

Welcome → Add Pet / My Pets → Pet Profile → Daily Care → Health → Timeline → Reminders → AI assistance

These two flows must be connected, not treated as unrelated products.

A user who already owns a cat may still use Discover to decide whether another pet fits their lifestyle.

## 4. PRODUCT GOALS

PetFit should:
- help users make informed pet-ownership decisions;
- set realistic expectations;
- avoid encouraging impulsive pet ownership;
- explain why a pet is or is not a good fit;
- make pet comparison easy;
- remain useful after the initial decision;
- help users organize care for real pets;
- provide useful reminders and history;
- provide contextual AI assistance where it creates genuine value.

A valid result is:

> You may not be ready to get a pet right now.

Never force a recommendation when the user's circumstances indicate that pet ownership may currently be unsuitable.

Preferred tone:

> It may not be the right time — and that's okay.

## 5. TARGET AUDIENCE

### First-time pet owners
Need simple explanations, realistic expectations, comparisons, guidance, and confidence before deciding.

### People choosing between different pets
Example: "Should I get a cat, rabbit, hamster, or reptile?"

### People interested in unusual pets
PetFit should not be limited to dogs and cats.
Potential groups include mammals, birds, fish, reptiles, amphibians, arachnids, invertebrates, and farm/outdoor animals.

Potential examples include rabbits, guinea pigs, hamsters, rats, mice, gerbils, chinchillas, ferrets, hedgehogs, birds, fish, geckos, bearded dragons, snakes, tortoises, axolotls, frogs, tarantulas, jumping spiders, scorpions, hermit crabs, snails, mantises, stick insects, isopods, millipedes, chickens, ducks, geese, pigeons, goats, sheep, miniature pigs, alpacas, and potentially more.

The supported species list should evolve with product requirements.

### Existing pet owners
Users should be able to add pets, store pet information, save photos, track care, track health-related events, manage routines, create reminders, maintain notes/history, and ask contextual questions.

## 6. CORE PRODUCT AREAS

### 6.1 Discover
Potential functionality:
- categories
- search
- filters
- animal cards
- animal details
- care requirements
- favorites
- comparison
- "Is it a match?"
- link to the matching quiz

Possible categories:
- Mammals
- Birds
- Fish
- Reptiles
- Amphibians
- Arachnids
- Invertebrates
- Farm / Outdoor

Discover should be image-first and easy to browse.

### 6.2 Pet Matching Quiz
The quiz is the primary entry point for new users.

Possible dimensions:
- time availability
- activity level
- daily routine
- living conditions
- available space
- budget
- interaction preferences
- care tolerance
- noise tolerance
- experience
- travel frequency
- responsibility
- other meaningful constraints where justified

The quiz should be mobile-first, focused, simple, one meaningful decision per screen, clearly progressive, and concise enough to finish.

Do not turn it into a long form.

### 6.3 User / Lifestyle Profile
Conceptual dimensions:
- timeAvailability
- activityLevel
- spaceAvailability
- budgetLevel
- interactionPreference
- careTolerance
- noiseTolerance
- experienceLevel
- travelFrequency
- responsibilityLevel

These are conceptual. Inspect the current implementation before finalizing domain models.

### 6.4 Matching Engine
The compatibility system is core business logic.

Quiz Answers → Normalize Answers → Build User Lifestyle Profile → Compare Against Pet Profiles → Calculate Compatibility → Rank Pets → Return Top Matches

Example:
Cat — 91%
Rabbit — 82%
Leopard Gecko — 76%

The result must be explainable.

Never place the scoring algorithm directly inside screen components.

### 6.5 Recommendation Result
Results should contain more than a number.

Possible content:
- compatibility score
- why it fits
- strengths
- potential difficulties
- care considerations
- other matches
- compare
- learn more
- save

### 6.6 Not Ready
A non-pet result is valid.

Possible factors:
- insufficient time
- frequent travel
- unstable routine
- unsuitable housing
- insufficient budget
- low readiness for daily care

Do not shame the user.

### 6.7 Compare Pets
Users should be able to compare multiple animals by meaningful dimensions such as time, space, activity, interaction, care complexity, noise, social needs, cost, and beginner suitability.

## 7. MY PETS & OWNERSHIP

### 7.1 My Pets
Users may have multiple pets.

Example:
- Luna — Cat
- Milo — Rabbit
- Spike — Leopard Gecko

### 7.2 Add Pet
Possible data:
- name
- photo
- species
- breed where relevant
- sex
- birthday
- age
- weight
- color
- microchip information
- notes
- personality
- favorites/habits where useful

### 7.3 Pet Profile
A Pet Profile is a central long-term object.

Pet → Overview / Care / Health / Timeline / Notes

The profile represents the user's real pet, not only generic species data.

### 7.4 Pet Passport
A Passport-inspired presentation is an approved UI/product pattern.

It may organize photo, name, species, breed, birthday, age, weight, color, microchip, overview, health, care, history, and notes.

"Pet Passport" is a UI/product metaphor and must not be presented as a legally valid document.

## 8. CARE SYSTEM

Potential categories:
- Nutrition
- Feeding
- Grooming
- Health
- Behavior
- Exercise
- Environment
- Enrichment
- Hygiene
- Supplies

Care information should be tailored to species and, where appropriate, the individual pet.

Avoid inventing factual animal-care claims. Verify claims that materially affect recommendations or health guidance, or explicitly identify missing information.

## 9. DAILY ROUTINE

Example:
Today
✓ Morning feeding
✓ Fresh water
○ Play time
○ Clean litter
○ Evening feeding

Routines must be species-appropriate and pet-specific when required.

## 10. REMINDERS

Potential reminders:
- vaccination
- vet appointment
- medication
- flea treatment
- deworming
- grooming
- nail trimming
- weight check
- feeding
- custom events

Users should be able to distinguish Today, Upcoming, and Past.

## 11. HEALTH & HISTORY

### Health
Potential tracking:
- weight
- height where relevant
- vaccinations
- medication
- vet visits
- observations
- trends/graphs

### Timeline / Journey
Chronological history may include weight checks, treatments, vet visits, vaccinations, deworming, and the date the pet joined the family.

Timeline represents history. Health represents current health-related information and metrics.

PetFit must NOT become a veterinary diagnostic system. It can organize information and provide general educational guidance, but it should not pretend to diagnose animals.

## 12. AI ASSISTANT

AI is a future layer, not an MVP requirement.

AI should be contextual. Prefer "Ask about Luna" over a generic standalone AI chat when the user is viewing a specific pet.

Potential context:
- pet species
- breed
- age
- weight
- notes
- recent events
- care context

Good uses:
- personalized explanations
- recommendation summaries
- comparisons
- care guidance
- contextual follow-up questions

Bad uses:
- replacing deterministic scoring without justification
- inventing pet facts
- exposing secrets
- controlling application navigation
- mutating application state without validation

Treat AI output as untrusted external data and validate it.

### AI architecture

Never put private AI provider keys in the mobile app.

Preferred architecture:
React Native App → Backend API → AI Provider / AI Service → Validated Structured Response → React Native App

Provider credentials stay on the backend.

## 13. AUTHENTICATION STRATEGY

Do NOT force registration before the user sees value.

Preferred new-user experience:
Welcome → choose intent → use product → receive value → request account only when persistence is useful.

Good registration moments:
- saving quiz results
- adding/saving a pet
- syncing data
- using persistent reminders
- using cloud-based features

Potential account functionality later:
- registration
- login
- logout
- protected resources
- persistent profile
- cloud synchronization
- multiple devices
- multiple pets

Authentication is not an MVP requirement.

## 14. DESIGN SYSTEM

### Approved direction
Warm Editorial + Photo-first + Pet Passport

The interface should feel:
- warm
- modern
- calm
- trustworthy
- spacious
- product-focused
- not childish
- not like a generic AI wrapper

The visual system combines strong animal imagery, clean editorial UI, warm neutral backgrounds, muted green primary color, subtle warm accents, Pet Passport-inspired pet profiles, lightweight dashboard patterns, and timeline patterns where appropriate.

Hand-drawn illustrations are secondary brand accents, not the primary UI system.

### Color palette

Background: #FAF8F2
Surface: #FFFDF9
Secondary Surface: #F2EFE6
Border: #E3E0D7
Primary: #5F7657
Primary Dark: #40523B
Primary Soft: #DDE7D7
Accent Orange: #E7A35F
Accent Yellow: #E8C66B
Primary Text: #252923
Secondary Text: #73786F
Muted Text: #9A9C94
Success: #6D9069
Warning: #D99A52
Error: #C86D62

Use green primarily for actions, selected states, and positive compatibility. Use orange/yellow for warmth and highlights. Avoid overwhelming the UI with accent colors.

### Typography

Editorial/display:
DM Serif Display

UI/body:
Inter

Recommended weights:
- DM Serif Display Regular
- Inter 400
- Inter 500
- Inter 600
- Inter 700

Use the serif for large editorial headings and important pet names. Use Inter for UI, labels, forms, statistics, buttons, navigation, and body text.

### Icons
Use a consistent functional icon system such as Lucide for UI/navigation icons.

Hand-drawn icons are brand illustrations for paw, heart, stars, house, tree, sun, sprout, money bag, yarn, robot, empty states, onboarding, tips, and decorative moments.

Do not generate a new unrelated icon style for every screen.

### Photography
Preferred direction:
- natural
- warm
- authentic
- soft contrast
- natural lighting
- emotionally engaging
- non-staged where possible

Avoid oversaturated HDR, neon looks, harsh studio flash, and inconsistent visual treatment.

Preferred aspect ratios:
- animal cards: approximately 4:3
- profile hero images: approximately 16:9 or 3:2
- avatars: 1:1

Common animals can use photography. For rare/exotic animals, use consistent imagery or a consistent illustration system rather than mixing unrelated visual styles.

### UI patterns

Primary buttons:
- green
- approximately 52px high
- rounded, but not excessively rounded
- strong readable label

Cards:
- light surface
- subtle border
- approximately 16px radius
- very subtle shadows

Spacing scale:
4, 8, 12, 16, 20, 24, 32, 40, 48, 64

Typical screen padding: 20–24px
Typical card padding: 16–20px

## 15. MOBILE NAVIGATION

Possible top-level structure:
- Home
- Discover
- My Pets
- Care
- Profile

This is a working concept, not an irreversible decision.

Do not turn every feature into a tab.

AI should normally be contextual to Pet Profile, Care, Health, or Discover.

Quiz should be a focused flow rather than a persistent main tab unless implemented UX proves otherwise.

## 16. UX PRINCIPLES

Every screen should have one clear purpose.

Prioritize:
- simple language
- clear actions
- visible progress
- useful feedback
- concise explanations
- accessible interactions
- one meaningful decision at a time

The user should always understand:
1. What is happening?
2. What do I need to do?
3. What happens next?

Avoid unnecessary modals, excessive animation, excessive configuration, overloaded screens, and technical language in user-facing UI.

## 17. REACT NATIVE / EXPO RULES

PetFit is a React Native + Expo + TypeScript application.

Do not assume DOM or browser APIs exist.
Verify React Native / Expo compatibility before using web-specific libraries or APIs.

Prefer React Native primitives such as View, Text, Pressable, TextInput, ScrollView, FlatList, and Image.

Do not eject or migrate away from Expo unless explicitly requested.

Before adding native functionality:
1. Check whether Expo already provides it.
2. Check compatibility with the current Expo SDK.
3. Choose the simplest supported solution.

Current project areas include src/app/ for routing. Do not restructure routing without inspecting the current implementation and requirements.

## 18. STYLING / NATIVEWIND

The project uses NativeWind for Tailwind-style React Native styling.

Before changing styling infrastructure, inspect:
- package.json
- tailwind.config.js
- babel.config.js
- metro.config.js
- global.css
- current NativeWind usage

Prefer reusable class-based styling over repeated ad-hoc style objects where NativeWind is appropriate.

Keep design tokens centralized.

The NativeWind/Tailwind theme is the main source for UI color classes.

A separate TypeScript theme module may be used for JS/TS-only consumers that require raw color values.

Do not hardcode the same HEX values repeatedly throughout components.

Do not change NativeWind versions or configuration without checking the current project state first.

## 19. PROJECT STRUCTURE

Current project structure is intentionally simple and includes:

src/
├── app/
├── components/
├── constants/
├── hooks/
└── global.css

Do not create every possible directory in advance.

Introduce new areas only when actual complexity justifies them.

Potential future separation may include:
- features/
- services/
- data/
- types/
- utils/

Use feature/domain boundaries when the codebase grows.
Avoid creating abstractions before they are needed.

## 20. ARCHITECTURE

Preferred separation:
UI → Presentation / Hooks → Domain / Business Logic → Data / Services

Avoid:
- giant components
- business logic in JSX
- API calls scattered through UI
- scoring logic inside screens
- unnecessary coupling
- duplicated logic

The matching engine should be independent from UI.

Example:
answers → normalizeAnswers() → calculateCompatibility() → rankPets() → recommendation

Scoring should be deterministic, explainable, and testable.

## 21. TYPESCRIPT

Use TypeScript consistently.
Avoid any unless there is a strong reason.

Prefer explicit domain types, narrow types, discriminated unions where useful, reusable types, and safe parsing of external data.

Treat data from APIs, AI, storage, and user input as external/untrusted data.

## 22. STATE MANAGEMENT

Use the simplest approach that fits the current scope.

Preferred progression:
1. local state
2. lifted state
3. custom hook
4. Context when genuinely shared
5. global state only when necessary

Do not introduce Redux, Zustand, or another global store simply because the project is growing.

For the initial quiz, local state or a dedicated quiz hook may be enough.

## 23. DATA / DOMAIN RULES

Keep animal data separate from UI.

Potential animal characteristics include activity, required attention, space, care complexity, noise, social needs, typical ownership cost, apartment suitability, and beginner suitability.

Do not invent factual animal-care claims.

## 24. SECURITY

Never put secrets in React Native source code, public client-side environment variables, constants, or GitHub.

Never commit API keys, tokens, passwords, private credentials, or private AI provider keys.

AI/API secrets remain on the backend.

## 25. PERFORMANCE

Do not optimize prematurely.

Avoid obvious issues such as unnecessary re-renders, unstable list rendering, expensive calculations during render, memory leaks, excessive effects, and unnecessary global state.

Use appropriate list primitives such as FlatList for longer lists.

Measure before introducing complex optimizations.

## 26. ACCESSIBILITY

Accessibility is part of implementation, not final cleanup.

Consider readable text, sufficient contrast, touch target sizes, screen-reader labels, keyboard/input behavior, and clear state feedback.

## 27. TESTING

Prioritize tests for business-critical logic:
- scoring
- ranking
- recommendation logic
- validation
- transformations
- API behavior
- important user flows

The scoring engine should be testable without rendering screens.
Prefer pure functions where possible.

## 28. DEVELOPMENT ROADMAP

### Phase 0 — Product & Domain Foundation
- confirm product goals
- define core user flows
- define initial animal data
- define quiz dimensions
- define compatibility logic conceptually
- define initial domain objects
- confirm design system

Do not prematurely build backend infrastructure.

### Phase 1 — Quiz / Matching MVP
- welcome
- quiz introduction
- questions
- answer selection
- progress
- back/next
- local scoring
- results
- compatibility
- explanation
- warnings
- not-ready state

Everything works locally first.

### Phase 2 — Discover
- animal categories
- animal catalog
- animal profiles
- pet characteristics
- search/filter
- favorites where justified
- compare
- links back to matching

### Phase 3 — My Pets
- add pet
- photo
- pet profile
- basic personal information
- notes
- multiple pets

### Phase 4 — Care
- care guides
- daily tasks
- recurring routines
- reminders

### Phase 5 — Health / Timeline
- timeline
- vet events
- vaccinations
- weight
- health observations
- graphs where useful

### Phase 6 — Backend
Introduce Node.js, Express, TypeScript, API layer, validation, error handling, and persistent data when justified.

Potential data:
- users
- pets
- animal/species data
- quiz results
- recommendation history
- care data
- reminders
- health events

Only create entities justified by real requirements.

### Phase 7 — Authentication
- registration
- login
- logout
- protected resources
- persistent profile
- cloud synchronization

### Phase 8 — AI
- contextual AI
- pet-aware conversations
- personalized explanations
- structured AI output
- secure backend integration

### Phase 9 — Production
- production environment
- secure environment variables
- backend/database hosting
- error monitoring
- CI/CD
- app builds
- release process
- analytics where justified

## 29. MVP BOUNDARIES

The MVP must prove:

> Can PetFit give a useful, explainable pet recommendation?

MVP:
1. Welcome
2. Quiz introduction
3. Questions
4. Answer selection
5. Progress
6. Back/next
7. Matching logic
8. Results
9. Compatibility score
10. Explanation
11. Warnings / considerations
12. Not-ready outcome

Do NOT add to the first MVP:
- authentication
- backend
- database
- AI
- social network
- marketplace
- subscriptions
- payments
- push notifications
- advanced medical features
- complex global state
- 100+ species

The MVP should work locally first.

## 30. PRODUCT EVOLUTION

V0: Quiz → Matching → Top 3
V1: Discover → Animal profiles → Comparison → Not Ready
V2: My Pets → Pet Profile → Pet Passport → Photos → Notes
V3: Care → Daily routine → Reminders → Timeline → Health
V4: Backend → Database → API → Persistence
V5: Authentication → Accounts → Sync → Multiple devices
V6: AI → Contextual Pet Assistant

## 31. CURRENT APPROVED UX CONCEPT

Approved direction:
Warm Editorial + Photo-first + Pet Passport

Design behavior:
- Discover → image-first
- Quiz → focused one-question-per-screen
- Results → large animal + compatibility score + reasons
- Pet Profile → Passport-inspired layout
- Home → lightweight dashboard
- Care → checklist/categories
- Health → metrics + relevant history
- Timeline → chronological events
- AI → contextual conversation

The visual system must remain coherent even when interaction patterns differ by task.

## 32. PRODUCT RULE — DO NOT BUILD A FEATURE DUMP

Before implementing a feature, ask:

> Does this make PetFit meaningfully more useful?

If not, do not add it merely because it is technically interesting.

Avoid turning PetFit into a social network, marketplace, online shop, generic AI wrapper, or overcomplicated health application.

## 33. LEARNING / PORTFOLIO GOAL

PetFit is also a serious learning project.

It should develop understanding of:
- React Native
- Expo
- TypeScript
- component architecture
- hooks
- state management
- navigation
- API design
- Node.js
- Express
- PostgreSQL
- authentication
- validation
- testing
- AI integration
- deployment
- Git
- GitHub

Do not turn development into blind copy-paste from AI.

The developer should understand:
- why the code works
- how data moves through the app
- where business logic lives
- why architecture is structured that way

When explaining code, prioritize understanding and architecture.

## 34. CODE REVIEW PROTOCOL

When reviewing code, structure the analysis as:

### CODE_REVIEW
- What the code does
- Data flow
- Dependencies
- Problems / risks
- Existing good patterns

### PLANNING
- Step-by-step solution
- Minimal required changes
- Files affected
- Risks
- Validation plan

Then wait for approval before implementation.

## 35. DEBUGGING PROTOCOL

When debugging:
1. Reproduce or understand the issue.
2. Trace the data flow.
3. Find the root cause.
4. Propose the smallest correct fix.
5. Check for side effects.
6. Validate the fix.

Output:
Root Cause:
...
Fix:
...
Risks:
...

## 36. ANTI-HALLUCINATION RULES

Never invent APIs, libraries, project files, functions, requirements, product behavior, or animal-care facts.

When uncertain, say what is uncertain.

When a required file or source is unavailable, request it.

Always prefer actual codebase evidence over assumptions.

## 37. CHANGE SCOPE CONTROL

Stay strictly within the task.

Do not refactor unrelated code, change architecture without justification, optimize unrelated components, introduce dependencies unnecessarily, replace working libraries without a reason, or rewrite files wholesale when a small change is enough.

Prefer minimal, safe, reversible changes.

## 38. INCREMENTAL DEVELOPMENT

Break work into small steps.

After each meaningful step:
- explain what changed
- suggest how to validate it
- identify the next dependency

Do not implement multiple unrelated systems at once.

## 39. FINAL PRODUCT PRINCIPLE

Build PetFit as a useful product, not a technology showcase.

The quiz brings the user in.
The pet profile and care ecosystem keep the user there.

Long-term journey:

I want a pet
→ Take the quiz
→ Discover suitable animals
→ Compare
→ Understand responsibilities
→ Decide

OR

I already have a pet
→ Add the pet
→ Build its profile
→ Track care
→ Track health/history
→ Set reminders
→ Ask PetFit AI
→ Continue using PetFit over time

> PetFit helps you choose the right pet — and helps you care for the pet you have.
