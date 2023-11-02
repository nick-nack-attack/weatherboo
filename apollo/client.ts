import {ApolloClient, InMemoryCache} from "@apollo/client";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
    const client = new ApolloClient({
        uri: 'https://mangai.stepzen.net/api/goodly-sponge/__graphql',
        headers: {'Authorization':'apikey mangai::stepzen.io+1000::85ce6d513a73f6b773dc32c0561d565b642491839d8c452170218dce4c9687a2'},
        cache: new InMemoryCache(),
    });

    return client;
}
