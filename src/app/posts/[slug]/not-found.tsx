import React from 'react';

function NotFound() {
    return (
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Oops!</h1>
            <p className="text-gray-600">The page youre looking for doesnt exist.</p>
            <a href="/" className="text-blue-600 mt-4 inline-block">Go back home</a>
        </div>
    );
}

export default NotFound;