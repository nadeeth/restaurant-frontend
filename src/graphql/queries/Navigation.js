import gql from "graphql-tag";

const query = gql`
  query {
    readPages(ShowInMenus: true) {
      MenuTitle
      ID
      URLSegment
      ClassName
    }
  }
`;

export default query;