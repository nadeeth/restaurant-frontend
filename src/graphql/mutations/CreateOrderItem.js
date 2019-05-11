import gql from "graphql-tag";

const mutation = gql`
mutation($ID: Int!, $OrderID: Int, $Title: String, $Price: Float, $Qty: Int) {
    createOrderItem(
        ID: $ID
        OrderID: $OrderID,
        Title: $Title,
        Price: $Price,
        Qty: $Qty
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