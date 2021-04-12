import React from 'react';

export const List = ({ children }) => (
  <ul style={{ maxWidth: "calc(100% - 200px)", margin: "0 auto" }}>
    {children}
  </ul>
)

export const ListItem = ({ children }) => <li>{children}</li>
