<p align="center">
  <img width="300" alt="AlertHub logo" src="https://github.com/IFRC-Alert-Hub/Alert-Hub-Frontend/assets/57798047/9a3647c9-f3ed-4f7d-b7af-bf38c1c36380">
     <img src="https://github.com/IFRC-Alert-Hub/Alert-Hub-Frontend/assets/57798047/8060122e-df4f-4e77-9a7a-f537fea7f080" width="200" alt="UCL">

  <h2 align="center"> IFRC Alert Hub </h2>
  <p align="center">
    This repository contains the frontend code for the IFRC Alert Hub. The goal of the IFRC Alert Hub is to ensure that communities everywhere receive the most timely and effective emergency alerting possible, and can thereby take action to safeguard their lives and livelihoods.
  </p>
  
  <p align="center">
    Find out more on the <a href="https://alert-hub-frontend.azurewebsites.net/">project website</a>.
  </p>

  <p align="center">
    <a href="https://www.codefactor.io/repository/github/ifrc-alert-hub/alert-hub-frontend"><img src="https://www.codefactor.io/repository/github/ifrc-alert-hub/alert-hub-frontend/badge" alt="CodeFactor" /></a>
    <a href="https://github.com/IFRC-Alert-Hub/Alert-Hub-Frontend/issues">
      <img alt="GitHub issues" src="https://img.shields.io/github/issues/IFRC-Alert-Hub/Alert-Hub-Frontend">
    </a>
    <a href="https://github.com/IFRC-Alert-Hub/Alert-Hub-Frontend/pulls">
      <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/IFRC-Alert-Hub/Alert-Hub-Frontend">
    </a>
     <a href="https://github.com/IFRC-Alert-Hub/Alert-Hub-Frontend/pulls">
        <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/IFRC-Alert-Hub/Alert-Hub-Frontend">
    </a>
  </p>
</p>


## Table of Contents
- [UI Designs](#ui-designs)
- [Prerequisites](#prerequisites)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Contact](#contact)
- [Installation](#installation)
- [Testing](#testing)
- [Build and Deployment](#build-and-deployment)
  - [Local Builds](#local-builds)
  - [Building and Running Docker Images](#building-and-running-the-docker-images)
  - [Azure Setup](#azure-setup)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)


## UI Designs

We have ensured that the UI designs are in accordance with the [IFRC GO&#39;s Brand Design &amp; Guidelines](https://go-user-library.ifrc.org/brand-design/). By closely following these guidelines, we have maintained consistency and reinforced the brand identity throughout the application.

To implement these UI designs effectively, we have leveraged Material-UI, a widely used open-source UI library. [Material-UI](https://mui.com/) adheres to the Material Design guidelines established by Google and provides a comprehensive collection of pre-designed components, icons, and utilities that seamlessly integrate with React applications.

By utilising Material-UI, we were able to achieve a consistent and modern design throughout the IFRC Alert Hub Frontend. The library's extensive set of components, ranging from buttons to inputs and modals, ensured a cohesive and visually pleasing user interface. As a result, since the components are highly customisable, it allowed us to tailor their appearance and behavior to match the IFRC brand and design guidelines.

For a more detailed view of the UI designs implemented, you can refer to the Figma UI Designs available at [this link](https://www.figma.com/file/JjBcwGTY83vzJRSw61mIxW/IFRC-Alert-Hub?type=design&node-id=0%3A1&mode=design&t=gISfqCqQGjiRJ0OQ-1). These designs serve as a reference for the visual elements and layout we have implemented in the application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js [v19.6.0] or higher is installed.
- Yarn [1.22.19] or npm [9.4.0] is installed (depending on your preferred package manager).

## Technologies

Technology Stack The client application is developed using React 16.8 and TypeScript, utilising the create-react-app framework as its foundation.

- Routing: [react-router](https://github.com/remix-run/react-router)
- HTTP client: [axios](https://github.com/axios/axios)
- GraphQL client: [apollo-client](https://github.com/apollographql/apollo-client)
- Form validation: [yup](https://github.com/jquense/yup)
- Form Builder: [formik](https://github.com/jaredpalmer/formik)
- Linting and formatting: [ESLint](https://github.com/eslint/eslint) and [Prettier](https://github.com/prettier/prettier)
- Styling: [material-ui](https://github.com/mui/material-ui)
- Testing: [Jest](https://github.com/facebook/jest), [React Testing Library](https://github.com/testing-library/react-testing-library) and [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter)

The usage of TypeScript enhances development by providing type safety, static analysis, and comprehensive code completion.
Both the client and backend components share the same type definitions to ensure consistency across the entire system.

## Internationalisation (i18n)

The Alert Hub project supports internationalisation to make the application accessible in multiple languages. The translations are managed using Python scripts and language-specific resource files.

### Getting Started

1. Ensure you have Python installed on your system.
2. Clone the repository and navigate to the project root directory.
3. Open a terminal or command prompt.

### Installation

To install the required dependencies, run the following command in your terminal:

   ```bash
   pip install -r requirements.txt
   ```
This will install the necessary packages required for the translation script.


### Running the Translation Script

1. The required translation files are located in the `src/multiLanguage` directory.
2. To initiate the translation process, execute the following command in your terminal:

   ```bash
   python translater.py
   
Follow the prompts:
1. You will be prompted to enter the target language code (e.g., 'es' for Spanish). Choose the appropriate language code from the list.
2. You will also be asked whether existing translations should be overwritten. Enter 'Y' (yes) or 'N' (no) accordingly.
The script will process the translations and update the language-specific resource files accordingly.

Please note that maintaining and updating translations is an ongoing process. Make sure to follow best practices for internationalisation and localisation to ensure a seamless user experience across different languages.
Feel free to contribute new translations or improve existing ones to make the Alert Hub more accessible to users around the world.

Do not modify the existing supportedLanguages.json file in /src/multiLanguage/locales.


## Dependencies

|           Package           | Version  |
| :-------------------------: | :------: |
|       @apollo/client        |  3.7.17  |
|       @emotion/react        | 11.11.0  |
|       @emotion/styled       | 11.11.0  |
|     @mui/icons-material     | 5.11.16  |
|        @mui/material        |  5.13.3  |
|      @mui/x-data-grid       |  6.6.0   |
|     @mui/x-date-pickers     |  6.9.1   |
|  @testing-library/jest-dom  |  5.16.5  |
|   @testing-library/react    |  13.4.0  |
| @testing-library/user-event |  13.5.0  |
|         @turf/turf          |  6.5.0   |
|         @types/jest         |  27.5.2  |
|      @types/mapbox-gl       |  2.7.11  |
|         @types/node         | 16.18.34 |
|        @types/react         |  18.2.9  |
|      @types/react-dom       |  18.2.4  |
|     @types/react-slick      | 0.23.10  |
|     @types/react-table      |  7.7.14  |
|      apollo-link-http       |  1.5.17  |
|            dayjs            |  1.11.9  |
|           formik            |  2.4.2   |
|    http-proxy-middleware    |  2.0.6   |
|          mapbox-gl          |  2.15.0  |
|            react            |  18.2.0  |
|          react-dom          |  18.2.0  |
|         react-intl          |  6.4.4   |
|      react-router-dom       |  6.12.1  |
|        react-scripts        |  5.0.1   |
|         react-slick         |  0.29.0  |
|       slick-carousel        |  1.8.1   |
|         typescript          |  4.9.5   |
|      universal-cookie       |  4.0.4   |
|         web-vitals          |  2.1.4   |
|             yup             |  1.2.0   |

## Contact

This component is owned by [piraveenankirupakaran](https://github.com/piraveenankirupakaran). Please get in touch if you have any questions. For change requests and bug reports, please open a new issue.

If you have any questions or concerns, please reach out to:

- Piraveenan Kirupakaran: p.kirupakaran@ucl.ac.uk
- Yizhou Li: ucabiaz@ucl.ac.uk

## Installation

Follow these steps to set up and run IFRC GO Make Maps Frontend:

1. Clone the repository:

```bash
git clone https://github.com/IFRC-Alert-Hub/Alert-Hub-Frontend.git
```

2. Install the dependencies:

```bash
yarn install
# OR
npm install
```

3. Start the development server:

```bash
yarn start
# OR
npm start
```

Your application should now be running on http://localhost:3000.

## Testing

Both client and server are tested using Jest.

```shell
npm run test
```

Jest provides a couple of advanced features, for instance you can generate a coverage report with `npm run test -- --coverage` or run tests in an interactive loop via `npm run test -- --watch`.

## Build and deployment

### Local builds

To build the software locally, run

```shell
# build client
cd client
npm run build
```

### Building and running the docker images

![Docker Nginx Deployment Diagram](https://github.com/IFRC-Alert-Hub/Alert-Hub-Frontend/assets/57798047/57f50040-af4f-41dd-a8b9-021b4ca84d64)

The deployment of the application is facilitated by Docker and Nginx as seen in the image above. This setup combines these technologies to create a smooth and effective deployment process.

It's important to note that the practical deployment strategy makes use of Docker. Both a Dockerfile and a docker-compose.yml are included for both the client application, and the standard development process involves leveraging Azure to construct and distribute the application.

```shell
# building the application locally
docker-compose up

```

## Azure setup

```bash
## Azure Setup

This project is designed to be deployed to an Azure Web App using a Docker container. Follow these steps to set up an Azure Web App for your project:

1. Sign in to the [Azure Portal](https://portal.azure.com/) with your Azure account.

2. In the left-hand menu, click on "Create a resource."

3. In the search bar, type "Web App" and select the "Web App" option from the results.

4. Click the "Create" button to begin configuring your Web App.

5. Fill in the following details for your Web App:

   - Subscription: Select your desired Azure subscription.
   - Resource Group: Create a new resource group or use an existing one.
   - Name: Choose a unique name for your Web App (e.g., `yourprojectname-webapp`).
   - Operating System: Select "Linux".
   - Publish: Choose "Docker Container".
   - Region: Select a region close to your target users for better performance.
   - App Service Plan: Create a new plan or use an existing one, and select the desired pricing tier.

6. Click the "Next: Docker" button to configure your container settings.

7. Choose "Single Container" as your container type.

8. Select "GitHub Container Registry (ghcr.io)" as your registry.

9. Enter the image name and tag in the "Image and tag" field (e.g., `ghcr.io/yourusername/yourprojectname:latest`).

10. Click "Review + create" to review your Web App settings.

11. After reviewing, click "Create" to deploy your Web App.

12. Once your Web App is created, navigate to the "Deployment Center" in your Web App's settings.

13. Choose "GitHub Actions" as your deployment method and follow the instructions to configure the GitHub Actions workflow.

Make sure to update the `env.AZURE_WEBAPP_NAME` value in your GitHub Actions workflow file (`.github/workflows/main.yml`) with the name you chose for your Web App.
```

## Contributing

If you'd like to contribute to _IFRC GO Alert Hub_, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name (e.g., feature/awesome-feature).
3. Make your changes and commit them with a clear and concise commit message.
4. Push your changes to your forked repository.
   Create a pull request and describe the changes you've made.

## Acknowledgements

Built at [University College London](https://www.ucl.ac.uk/) in cooperation with [IFRC](https://www.ifrc.org/). 

Academic supervision: Dr Emmanuel Letier

## License


