// Dependencies
import React, { Component } from 'react';

// HOC
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
