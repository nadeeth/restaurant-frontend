import gql from "graphql-tag";

const query = gql`
    query {
        readSiteConfig {
            Title
            Tagline
            Logo {
                URL
            }
            OrderTax
            OrderDiscount
            FooterText
            Facebook
            Instagram
            Twitter
        }
    }
`;

export default query;