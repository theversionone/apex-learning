# Apex Learning Quiz Automation Extension

## Ethical & Ownership Disclaimer
This project is a private, experimental Chrome extension developed for research and technical learning purposes. The developer is the owner of the Apex Learning platform and has full rights and permissions to build, test, and operate this extension within private, controlled environments.  

This extension is not intended, designed, or permitted for use in real educational settings where it could enable academic dishonesty. It is not a tool for students to cheat on assessments, nor is it intended for public release or classroom use. Instead, the extension exists to explore the technical challenges of:  
- Automating structured web tasks (such as quizzes) through DOM manipulation  
- Using AI services to process and respond to dynamic content (text and images)  
- Experimenting with Chrome extension architecture and UI development  
- Conducting controlled tests of automation workflows on a platform the developer owns  

By clearly restricting this project to private environments and personal research, it avoids misuse and emphasizes its purpose as a learning exercise in web automation, not as a shortcut for academic work.  

---

## Why Automating Quizzes?
Automating quizzes in this project serves **legitimate technical and research purposes**, not academic dishonesty. Some of the key motivations include:  

- **Regression Testing**: Automating quizzes ensures that new platform features or changes do not break existing functionality. Automated quiz completion can serve as a form of end-to-end testing.  
- **AI Workflow Experiments**: Scraping questions, sending them to AI services, and filling in responses is a valuable case study for integrating large language models into real-world automation pipelines.  
- **Performance Benchmarking**: Comparing results across different AI providers (e.g., GroqCloud vs. Google) allows for evaluation of speed, accuracy, and reliability.  
- **Developer Learning**: Quizzes provide a structured, repeatable format to practice DOM manipulation, event handling, and extension development in a safe, controlled setting.  

In short, quizzes are an ideal medium for automation R&D because they combine structured inputs, measurable outputs, and repeatable processes — making them excellent for experimenting with browser automation and AI technologies.  

---

## Overview
This project is a private Chrome extension designed to automatically complete quizzes on Apex Learning with high accuracy. The extension leverages modern web technologies and multiple AI providers to scrape quiz content, interpret questions (including text and images), and submit answers automatically.

The primary goal is technical exploration: demonstrating how Chrome extensions, DOM manipulation, and AI services can be combined into advanced automation workflows.

## Features
- AI-Powered Automation — Integrates with multiple free AI providers (Google, GroqCloud) for flexible and reliable quiz answering.  
- DOM Manipulation & Scraping — Extracts quiz questions, text, and images from Apex Learning dynamically.  
- Customizable Delays — Adjustable time intervals for automation actions, simulating human-like interaction.  
- Hotkey Toggle & Popup UI — Start/stop automation via keyboard shortcuts or a modern popup interface.  
- Options Page — Accessible through the popup UI, where users can configure API keys for GroqCloud and Google.  
- Modern UI — Clean, responsive, and modern design built with Tailwind CSS v4.  
- Private & Local Use Only — Extension is not distributed publicly and runs only in controlled environments.  

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4  
- **Build Tools**: Vite with `@crxjs/vite-plugin` for hot reload and streamlined Chrome extension development  
- **Backend Services**: AI APIs (Google, GroqCloud) for handling quiz question analysis and answer generation  
- **Browser Platform**: Chrome (Manifest v3)  

## Status
Currently in active development. Initial focus is on DOM scraping, AI integration, and a working hot-reload development environment via Vite.
