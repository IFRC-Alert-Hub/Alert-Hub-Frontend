# IFRC Alert Hub

This repository contains the frontend code for the IFRC Alert Hub. The goal of the IFRC Alert Hub is to ensure that communities everywhere receive the most timely and effective emergency alerting possible, and can thereby take action to safeguard their lives and livelihoods.

## UI Designs

We have ensured that the UI designs are in accordance with the [IFRC GO&#39;s Brand Design &amp; Guidelines](https://go-user-library.ifrc.org/brand-design/). By closely following these guidelines, we have maintained consistency and reinforced the brand identity throughout the application.

To implement these UI designs effectively, we have leveraged Material-UI, a widely used open-source UI library. [Material-UI](https://mui.com/) adheres to the Material Design guidelines established by Google and provides a comprehensive collection of pre-designed components, icons, and utilities that seamlessly integrate with React applications.

By utilising Material-UI, we were able to achieve a consistent and modern design throughout the IFRC Alert Hub Frontend. The library's extensive set of components, ranging from buttons to inputs and modals, ensured a cohesive and visually pleasing user interface. As a result, since the components are highly customisable, it allowed us to tailor their appearance and behavior to match the IFRC brand and design guidelines.

For a more detailed view of the UI designs implemented, you can refer to the Figma UI Designs available at [this link](https://www.figma.com/file/JjBcwGTY83vzJRSw61mIxW/IFRC-Alert-Hub?type=design&node-id=0%3A1&mode=design&t=gISfqCqQGjiRJ0OQ-1). These designs serve as a reference for the visual elements and layout we have implemented in the application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js [v19.6.0] or higher is installed.
- Yarn [1.22.19] or npm [9.4.0] is installed (depending on your preferred package manager).

## Dependencies

|           Package           | Version |
| :-------------------------: | :------: |
|       @apollo/client       |  3.7.17  |
|       @emotion/react       | 11.11.0 |
|       @emotion/styled       | 11.11.0 |
|     @mui/icons-material     | 5.11.16 |
|        @mui/material        |  5.13.3  |
|      @mui/x-data-grid      |  6.6.0  |
|     @mui/x-date-pickers     |  6.9.1  |
|  @testing-library/jest-dom  |  5.16.5  |
|   @testing-library/react   |  13.4.0  |
| @testing-library/user-event |  13.5.0  |
|         @turf/turf         |  6.5.0  |
|         @types/jest         |  27.5.2  |
|      @types/mapbox-gl      |  2.7.11  |
|         @types/node         | 16.18.34 |
|        @types/react        |  18.2.9  |
|      @types/react-dom      |  18.2.4  |
|     @types/react-slick     | 0.23.10 |
|     @types/react-table     |  7.7.14  |
|      apollo-link-http      |  1.5.17  |
|            dayjs            |  1.11.9  |
|           formik           |  2.4.2  |
|    http-proxy-middleware    |  2.0.6  |
|          mapbox-gl          |  2.15.0  |
|            react            |  18.2.0  |
|          react-dom          |  18.2.0  |
|         react-intl         |  6.4.4  |
|      react-router-dom      |  6.12.1  |
|        react-scripts        |  5.0.1  |
|         react-slick         |  0.29.0  |
|       slick-carousel       |  1.8.1  |
|         typescript         |  4.9.5  |
|      universal-cookie      |  4.0.4  |
|         web-vitals         |  2.1.4  |
|             yup             |  1.2.0  |

## Contact

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

# Azure setup

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
