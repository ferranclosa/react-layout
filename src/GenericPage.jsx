import React from 'react';

function GenericPage({ data }) {
    if (!data || typeof data !== 'object') {
        return <div style={{ padding: '20px', backgroundColor: '#ffe6e6', border: '1px solid #ff0000', borderRadius: '5px' }}>Invalid or missing data.</div>;
    }

    const renderItem = (key, value) => {
        if (typeof value === 'object' && value !== null) {
            return (
                <div key={key} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong style={{ display: 'block', marginBottom: '5px', color: '#333' }}>{key}:</strong>
                    <div style={{ marginLeft: '20px' }}>{renderObject(value)}</div>
                </div>
            );
        } else if (Array.isArray(value)) {
            return (
                <div key={key} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong style={{ display: 'block', marginBottom: '5px', color: '#333' }}>{key}:</strong>
                    <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                        {value.map((item, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>{typeof item === 'object' ? renderObject(item) : String(item)}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div key={key} style={{ marginBottom: '5px', padding: '5px', borderBottom: '1px solid #eee' }}>
                    <strong style={{ marginRight: '5px', color: '#555' }}>{key}:</strong> {String(value)}
                </div>
            );
        }
    };

    const renderObject = (obj) => {
        return Object.entries(obj).map(([key, value]) => renderItem(key, value));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#007bff', marginBottom: '20px' }}>Generic Page</h1>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#fff' }}>
                {renderObject(data)}
            </div>
        </div>
    );
}

export default GenericPage;