import gql from "graphql-tag";

const mutation = gql`
mutation($email: String!, $name: String, $phone: String, $message: String) {
    createEnquiry (
        Email: $email, 
        Name: $name,
        Phone: $phone,
        Message: $message
    ) {
        ID
        Email
        Name
        Phone
        Message
    }
}
`;

export default mutation;