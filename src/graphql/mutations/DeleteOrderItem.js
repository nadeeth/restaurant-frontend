import gql from "graphql-tag";

const mutation = gql`
mutation($ID: Int!) {
    deleteOrderItem(
        ID: $ID
    ) {
        ID
        OrderID
        Title
        Price
        Qty
    }
  }
`;

export default mutation;