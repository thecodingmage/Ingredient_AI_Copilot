Ingredient AI Copilot

Ingredient AI Copilot is a camera-first mobile application designed to help users interpret food ingredient lists at the moment of decision. The system uses artificial intelligence as a reasoning co-pilot, transforming complex nutritional information into concise, explainable insights with minimal user interaction.

Overview

Food packaging contains detailed nutritional and ingredient information, but interpreting it quickly remains difficult for most users. Ingredient AI Copilot addresses this gap by providing real-time, AI-driven reasoning over ingredient lists, reducing cognitive load and enabling informed decisions without requiring users to manually process raw data.

The application is intentionally designed as an AI-native experience, where the AI acts as the primary interface rather than a supplementary feature.

Problem Statement

Users are often presented with long, technical ingredient lists that are difficult to interpret during purchase or consumption. While information is technically available, it is rarely actionable at decision time. This leads to confusion, decision fatigue, or reliance on marketing claims rather than factual understanding.

The challenge is not data availability, but meaningful interpretation under time and cognitive constraints.

Solution Approach

Ingredient AI Copilot provides a minimal, camera-first workflow:

The user opens the app and scans the ingredient label of a packaged beverage.

Ingredient text is extracted from the image.

Key nutritional signals are derived using deterministic rules and heuristics.

These signals are passed to an LLM-based reasoning core.

The system returns a structured, explainable verdict including:

A concise health assessment

Key contributing factors

Plain-language explanations

An explicit AI confidence indicator

The UI surfaces only what is necessary, with optional explanations available for deeper inspection.

Application Screenshots

Below are representative screenshots of the application workflow.

Home Screen

Camera-first entry point with a single primary action.

![Home Screen](screenshots/home.png)

Ingredient Capture

User captures or selects an image of a packaged beverage ingredient label.

![Ingredient Capture](screenshots/capture.png)

AI Analysis Result

Structured verdict with explanation, suitability guidance, and confidence score.

![Analysis Result](screenshots/result.png)

Explainability and Trade-offs

Clear communication of key trade-offs and nutritional concerns.

![Explainability](screenshots/explainability.png)


Note: Place screenshots inside a screenshots/ folder at the root of the repository and update filenames as needed.

System Architecture

At a high level, the system follows the pipeline below:

Camera Input (Mobile App)
        ↓
Ingredient Text Extraction
        ↓
Signal Extraction Layer (Rules + Heuristics)
        ↓
LLM Reasoning Core
        ↓
Structured Decision Object
        ↓
UI and Explainability Layer

Signal Extraction Layer

Before invoking the language model, the system extracts meaningful signals from ingredient text to improve reliability and reduce hallucination. These signals may include:

Indicators of high added sugar

Presence of artificial sweeteners

Caffeine content

Preservatives or additives

Domain-specific nutritional flags

This hybrid approach combines deterministic logic with model-based reasoning.

LLM Reasoning Core

The language model is used strictly as a reasoning engine, not as a conversational chatbot. It receives structured signals and produces a deterministic decision object containing:

A clear verdict

Key influencing factors

Short, human-readable explanations

Explicit uncertainty or confidence reporting

This design prioritizes reasoning clarity and predictable outputs.

Explainability Design

Explainability is decision-centric rather than model-centric. Instead of exposing technical internals, the system focuses on explaining:

Why certain ingredients matter

What trade-offs exist

Where uncertainty remains

All explanations are concise, optional, and written in everyday language to ensure rapid comprehension.

Scope and Constraints

The current prototype focuses on packaged beverages to enable domain-aware reasoning and higher explanation quality.

The system is designed to be extensible to other food categories in future iterations.

OCR errors and poor image quality may affect extraction accuracy, though signal validation mitigates common issues.

Alignment with Evaluation Criteria

Experience & Interaction: Camera-first design with minimal user input.

Reasoning & Explainability: Structured decisions, transparent explanations, and uncertainty disclosure.

Technical Execution: Modular hybrid architecture combining rules and LLM-based reasoning.

Repository Structure
backend/
  ├─ index.js
  ├─ package.json
frontend/
  ├─ App.js
  ├─ app.json
  ├─ package.json
screenshots/
  ├─ home.png
  ├─ capture.png
  ├─ result.png
  └─ explainability.png
README.md

Running the Project
Backend

Navigate to the backend/ directory.

Install dependencies:

npm install


Configure environment variables (API keys, port).

Start the server:

npm start

Frontend

Navigate to the frontend/ directory.

Install dependencies:

npm install


Start the Expo development server:

npx expo start


Ensure the frontend is configured with the correct backend API endpoint.

APK and Demo

A release APK was generated for demonstration purposes and installed on a physical Android device. The demo showcases the complete scan-to-verdict workflow using real product labels.

(Optionally add a demo video link here.)

Conclusion

Ingredient AI Copilot demonstrates how AI can act as a true co-pilot—interpreting complex ingredient information, reducing cognitive effort, and enabling better decisions at the moment they matter. The system prioritizes reasoning quality, explainability, and user experience over raw data presentation.
