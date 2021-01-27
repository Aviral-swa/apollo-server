# **Apollo-Server**

### What is GraphQL?
- GraphQL is a punctuation that portrays how to request information, and is for the most part used to stack information from a server to a client. GraphQL has three fundamental qualities:

    - It allows the client to determine precisely what information it needs.
    - It makes it simpler to total information from numerous sources.
    - It uses a type system to describe data.

With GraphQL, the user is able to make a single call to fetch the required information rather than to construct several REST requests to fetch the same.

### What is Rest API?
- REST decides how the API resembles. It means "Representational State Transfer". It is a bunch of rules that developers follow when they make their API. One of these guidelines expresses that you ought to have the option to get a piece of information (called an resource) when you connect to a particular URL.

### Why use GraphQL?
- GraphQL lets you ask for what you want in a single query, saving bandwidth and reducing waterfall requests. It also enables clients to request their own unique data specifications.

### Advantages over Rest API?
- Fetching data with a single API call.
- No over- and under-fetching problems. 
- Tailoring requests to your needs.
- Autogenerating API documentation.

### What is a GraphQL schema?
- GraphQL server uses a schema to describe the shape of your data graph. This schema defines a hierarchy of types with fields that are populated from your back-end data stores. The schema also specifies exactly which queries and mutations are available for clients to execute against your data graph.

### What are resolvers?
- A resolver is a function that resolves a value for a type or field in a schema. Resolvers can return objects or scalars like Strings, Numbers, Booleans, etc. If an Object is returned, execution continues to the next child field. If a scalar is returned execution completes.

## Packages used.
- ### apollo-datasource-rest

  - Used to access dataSources which helps to connect actual Api endpoints by providing *post*, *put*, *create*, *delete* and other request types.

- ### apollo-server-express

  - Used to setup the apollo server by provinding various methods & classes like ApolloServer which is used to create the apollo server

- ### merge-graphql-schemas

  - This package is used to make typeDefs and resolvers in a single object which are spread across the project and then ultimatly pass into the apollo server insrance
