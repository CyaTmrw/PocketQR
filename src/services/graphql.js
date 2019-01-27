import ApolloClient from "apollo-boost";
import store from "../redux/store";

const client = new ApolloClient({
    uri: "http://pocketqr.xyz",
    request: (operation) => {
        let token = store.getState().user.token;
        if (token != null) {
            operation.setContext({
              headers: {
                authorization: token
              },
            });
        }
    }
});

export default client;