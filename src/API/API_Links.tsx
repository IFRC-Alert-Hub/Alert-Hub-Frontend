import { ApolloClient, InMemoryCache } from "@apollo/client";

export const cap_aggregator = new ApolloClient({
  uri: "https://cap-aggregator.azurewebsites.net/graphql/",
  cache: new InMemoryCache(),
});

export const auth_system = new ApolloClient({
  uri: "https://backend-deploy-dev-yx.azurewebsites.net/users/graphql",
  cache: new InMemoryCache(),
});

export const subscription_module = new ApolloClient({
  uri: "https://backend-deploy.azurewebsites.net/subscription/graphql",
  cache: new InMemoryCache(),
});
