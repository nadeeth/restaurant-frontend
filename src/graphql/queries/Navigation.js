import gql from "graphql-tag";

const query = gql`
  query {
    readPages {
      MenuTitle
      ID
      URLSegment
      ClassName
      ShowInMenus
      ShowInFooterMenu
    }
  }
`;

export default query;