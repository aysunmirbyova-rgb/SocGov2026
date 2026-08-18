# SosialYol — AI Social Service Navigator for Azerbaijan

An AI-powered personalized social-service navigation platform that helps Azerbaijani citizens discover and understand social services relevant to their individual circumstances.

## Features

- **Category-based navigation** — Employment, Financial support, Disability, Elderly, Child/family, Education, Housing, and more
- **Natural language input** — Describe your situation in plain text
- **AI recommendation engine** — Matches your situation to relevant social services
- **"Why am I seeing this?"** — Transparent explanations for every recommendation
- **8 demo scenarios** — Pre-built realistic use cases for demonstration
- **Official links** — Direct links to e-gov.az and other government portals

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Demo Scenarios

1. **Unemployed Young Person** — Recent graduate seeking work
2. **Low-Income Family** — Family of 5 struggling financially
3. **Person with Disability** — Group II disability needing support
4. **Elderly Person Needing Help** — 72-year-old living alone
5. **Single Parent** — Single mother with two children
6. **Student from Low-Income Family** — University student needing aid
7. **Job Seeker Needing Retraining** — Career change after job loss
8. **Family in Housing Crisis** — Damaged apartment, can't afford rent

## Tech Stack

- React 19 + Vite
- Custom recommendation engine (keyword + category matching)
- Responsive design with Azerbaijan brand colors

## Build for Production

```bash
npm run build
npm run preview
```

## Disclaimer

This is an MVP demonstration tool. Service information is for guidance only. Final eligibility is determined by the relevant government authority.
