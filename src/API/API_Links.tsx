import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
export const cap_aggregator = new ApolloClient({
  uri: "https://cap-aggregator.azurewebsites.net/graphql/",
  cache: new InMemoryCache(),
});

export const auth_system = new ApolloClient({
  link: createHttpLink({
    uri: "https://backend-deploy.azurewebsites.net/users/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

export const subscription_module = new ApolloClient({
  link: createHttpLink({
    uri: "https://backend-deploy.azurewebsites.net/subscription/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});
