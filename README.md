# 🪐 Nexus Commerce | Elite E-Commerce Architecture

**Live Demo:** [https://nexus-commerce-beta.vercel.app/](https://nexus-commerce-beta.vercel.app/)

Nexus Commerce is an advanced, high-performance web platform built on **Angular 18**. This platform implements a modern `standalone-components` architecture focusing on robust state management, premium UI aesthetics, and frictionless user flows.

---

## 🎯 Architecture Overview

* **Zero-Latency Interactions:** Deep integration with `NgZone` and Angular reactive strategies (RxJS) to ensure instant state updates, circumventing standard browser event-loop drops.
* **Firebase Identity & Auth:** Secure robust authentication system linked dynamically. Custom tooltips handle explicit `invalid-credential` errors precisely during async operations.
* **Premium Glassmorphism UI:** Sophisticated micro-animations configured via strictly modular SCSS for high visual appeal without performance penalties.

### ⚙️ Main Modules
- `Core`: Services and State Managers
- `Features`: Login flows, Product Cart logic, User identity
- `Shared/UI`: Reusable standalone layout elements

---

## 🛠️ Technological Stack

| System | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Angular 18 | `standalone: true`, RxJS |
| **Authentication** | Firebase / GoTrue | Identity and JWT Auth |
| **Styling** | SCSS | Glassmorphism, Responsive CSS Grid |
| **Data Transfer** | Fetch/Observables| Stream handling |

---

## 🔥 Getting Started

Run the platform locally:

```bash
# 1. Install Dependencies
npm install

# 2. Fire up the local server
npm start
```
*Wait for the compiler to bundle. The application will run smoothly at `http://localhost:4200/`.*

---

*Engineered with 💡 and modern web mechanics for maximum UX throughput.*
