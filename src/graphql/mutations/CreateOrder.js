import gql from "graphql-tag";

const mutation = gql`
mutation($ID: Int!, $Email: String, $Name: String, $Phone: String!, $PickUpTime: String, $Message: String, $Status: String, $Total: Float, $Tax: Float, $Discount: Float, $NetTotal: Float, $OrderItems: String) {
    createOrder(
        ID: $ID
        Email: $Email,
        Name: $Name,
        Phone: $Phone,
        PickUpTime: $PickUpTime,
        Message: $Message,
        Status: $Status,
        Total: $Total,
        Tax: $Tax,
        Discount: $Discount,
        NetTotal: $NetTotal,
        OrderItems: $OrderItems
    ) {
        ID
        Email
        Name
        Phone
        PickUpTime
        Message
        Status
        Total
        Tax
        Discount
        NetTotal
    }
}
`;

export default mutation;