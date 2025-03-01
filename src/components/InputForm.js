import React, { useState } from 'react';

const InputForm = () => {
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default InputForm;
