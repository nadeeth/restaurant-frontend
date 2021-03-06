import gql from "graphql-tag";

const query = gql`
    query($path: String) {
        readPages(URLSegment: $path) {
            MenuTitle
            Title
            Content
            Banner {
                URL
            }
        }
    }
`;

export default query;