// src/components/HomePage.jsx
import React from 'react';
import Layout from './Layout';
import GenericPage from "./GenericPage.jsx";

const jsonData = {
    name: 'John Doe',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'Anytown',
    },
    hobbies: ['reading', 'coding', {favorite:"hiking", location: "Mountains"}],
};

function HomePage() {
    return (
        <Layout>
            <h2>Welcome to the Home Page!</h2>
            <p>This is the content of the home page.</p>
            <GenericPage data={jsonData} />
        </Layout>
    );
}

export default HomePage;