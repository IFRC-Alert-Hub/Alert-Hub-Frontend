import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

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
