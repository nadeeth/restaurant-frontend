import { MockedProvider } from 'react-apollo/test-utils';
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
import query from "./graphql/queries/SiteConfig";

const mocks = [
  {
    request: {
      query: query,
      variables: {
        name: 'App',
      },
    },
    result: {
      data: {
        "readSiteConfig": [
          {
            "Title": "FeastCloud.",
            "Tagline": "your tagline here",
            "Logo": {
              "URL": "/assets/Uploads/54eb302cf3/text3971.png"
            },
            "OrderTax": 12.5,
            "OrderDiscount": 10,
            "FooterText": "Copyright (c) FeatCloud Inc.",
            "Facebook": "https://facebook.com/nadeeth",
            "Instagram": "https://instagram.com/nadeeth",
            "Twitter": "https://twitter.com/nadeeth",
            "YouTube": "https://youtube.com/nadeeth"
          }
        ]
      },
    },
  },
];

it('renders without error', () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );
  const tree = component.toJSON();
});