import gql from "graphql-tag";

const query = gql`
    query($path: String) {
        readHomePages(URLSegment: $path) {
            MenuTitle
            Title
            Content
            Banner {
                URL
            }
            Background {
                URL
            }
        }
    }
`;

export default query;