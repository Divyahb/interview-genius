# Interview Genius

This is a project for the Interview Genius community. It's a multi-project application built using the [Nx](https://nx.dev) framework and the [Micro Frontends](https://micro-frontends.org/) architecture.

## Tech Stack

This project uses the following technologies:

- TypeScript
- NestJS (for the backend services)
- React (with Typescript) for the frontend applications
- Tailwind CSS for styling
- Google GenAI for AI-powered prompts
- [Nx](https://nx.dev) for managing the monorepo and generating the apps and microfrontends

## Project Structure

This project is structured into the following directories:

- `libs`: This directory contains all the shared libraries used by the frontend and backend applications. Each library is a separate Nx library, with its own source code, tests, and build configuration.
- `apps`: This directory contains the top-level applications.
  - `shell`: This is the main application shell.
- `microfrontends`: This directory contains the microfrontends.
  - `resume`: This is the resume microfrontend.
  - `search`: This is the search microfrontend.
  - `simulator`: This is the simulator microfrontend.
  - `dashboard`: This is the dashboard microfrontend.
- `backend`: This directory contains the backend services.
  - `resume-feedback-service`: This service handles feedback on resumes.
  - `interview-simulator-service`: This service simulates interviews.
  - `question-generator-service`: This service generates interview questions.
  - `user-tracker-service`: This service tracks user activity.
  - `api-gateway`: This service acts as a reverse proxy to the other services.

## Running the Application

To run the application, you can use the following commands:

```bash
# Install dependencies
npm install

# Run all the services and applications
npm run dev:all

# Run the backend services
npm run dev:backend

# Run the frontend applications
npm run dev:frontend

```

You can also run individual services or applications by using the npm run dev:<service/application> command.

## Generating Apps and Microfrontends

To generate a new app or microfrontend, you can use the following commands:

```bash
# Generate a new app
nx generate @nrwl/nest:app my-app

# Generate a new microfrontend
nx generate @nx/react:microfrontend my-mf --project=my-app

# Generate a new library
nx generate @nrwl/nest:lib my-lib --project=my-app

```

You can also generate a new microfrontend using the @nx/react/microfrontend schematics. For example, to generate a new microfrontend with a remote entry file and a remote shell, you can use the following command:

```bash
nx generate @nx/react:microfrontend my-mf --project=my-app --remoteEntryFile=true --shell=remote

```

For more information on generating apps and microfrontends with Nx, see the Nx documentation.

## Backend Services

The backend services are implemented using NestJS and are located in the backend directory. Each service has its own source code, tests, and build configuration. The services are:

**resume-feedback-service**: This service handles feedback on resumes.
**interview-simulator-service**: This service simulates interviews.
**question-generator-service**: This service generates interview questions.
**user-tracker-service**: This service tracks user activity.
**api-gateway**: This service acts as a reverse proxy to the other services.

For more information on the backend services, see the backend README.

## Contributing

Contributions are welcome! Please see the contributing guidelines for more information.
