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
   This project was developed in collaboration with the <a href="https://www.ifrc.org/">International Federation of Red Cross and Red Crescent Societies (IFRC)</a> as a part of the <a href="https://www.ucl.ac.uk/computer-science/collaborate/ucl-industry-exchange-network-ucl-ixn">University College London (UCL) Industry Exchange Network (IXN)</a>. This frontend was developed by <a href="https://github.com/piraveenankirupakaran">Piraveenan Kirupakaran</a> and <a href="https://github.com/yizhou-lee">Yizhou Li</a> from <a href="https://www.ucl.ac.uk/">University College London (UCL)</a>.
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
- [Internationalisation (i18n)](#internationalisation-i18n)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Translation Script](#running-the-translation-script)
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

## Alert Hub Demo
We also provide a collection of short videos to showcase our designs from the user’s perspective. This can be seen in the link below: 
https://www.youtube.com/playlist?list=PL4btLGFFcA_ordYZKnoVNt2Ky0rM4bqXv

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
   pip install googletrans==3.1.0a0
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

2. Install the dependencies and ensure compatibility by enabling legacy peer dependencies:
This step is crucial due to the potential compatibility issues with certain packages. By setting the legacy-peer-deps option to true, you ensure smooth installation of dependencies, especially for testing-library/react-hooks version 8.0.1:
```bash
npm config set legacy-peer-deps true


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
# Azure Setup

This guide provides step-by-step instructions to deploy a Docker container to Azure Web App for Containers using Azure Container Registry.

## Part 1: Set Up Azure Container Registry

### Step 1: Create Azure Container Registry
In this guide, we'll assume the name of the registry is `registryName`.

1. **Enable Access Key**: In your Azure Container Registry settings, enable access keys to authenticate Docker with the registry. Remember to save the username and password, as you'll need them for future steps.

### Step 2: Prepare and Push Your Docker Container

1. **Build and Run Docker Container Locally**:

   ```bash
   docker build -t registryName.azurecr.io/alert-hub-frontend:latest .
   docker run --name test2 -d -p 80:80 registryName.azurecr.io/alert-hub-frontend:latest

Once the container is running, you can access it locally by opening your browser and navigating to http://localhost.

2. Push Docker Image to Azure Container Registry:
   
    ```bash
    docker login registryName.azurecr.io # Enter your username and password (from step 1)
    docker push registryName.azurecr.io/alert-hub-frontend:latest

3. Check the Pushed Image:

After pushing, verify that the Docker container image is available in your Azure Container Registry under the repository named alert-hub-frontend.


## Part 2: Deploy Docker Container to Azure Web App for Containers

### Step 1: Create Azure Web App for Containers
1. In the Azure portal, navigate to the "Create a resource" section.
2. Search for "Web App for Containers" and select it.
3. Choose a unique name for your web app.
4. Configure the necessary settings such as the resource group, operating system, and app service plan.
5. Under "Configure container," choose "Azure Container Registry" as the image source.
6. Provide the registry details and the image path (e.g., `registryName.azurecr.io/alert-hub-frontend:latest`).

### Step 4: Enable Continuous Deployment
1. In your Azure Web App's settings, navigate to the "Deployment Center" section.
2. Turn on Continuous Deployment (CD) and select the appropriate source repository (e.g., GitHub).
3. Configure the deployment settings as needed, ensuring automatic deployments are triggered upon repository changes.

### Step 5: Finalise and Test
1. Save the configurations and let the CD process deploy your Docker container to the Azure Web App.
2. Once deployed, navigate to the URL of your Azure Web App to access the containerised application.

Remember to replace "registryName" with your actual Azure Container Registry name.

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

