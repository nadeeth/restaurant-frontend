import gql from "graphql-tag";

const query = gql`
    query($path: String) {
        readMenuPages(URLSegment: $path) {
            Title
            MenuTitle
            Content
            Banner {
                URL
            }
            MenuItems {
                edges {
                    node {
                        ID
                        Title
                        Price
                        Description
                        Image {
                            URL
                        }
                        Category {
                            ID
                            Title
                        }
                    }
                }
            }
        }
    }
`;

export default query;