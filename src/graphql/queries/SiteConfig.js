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
            OpenTime
            CloseTime
            Facebook
            Instagram
            Twitter
            YouTube
        }
    }
`;

export default query;