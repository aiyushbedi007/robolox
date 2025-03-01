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
        <form onSubmit={handleSubmit} className="mb-3">
            <input type="text" value={input} onChange={handleChange} className="form-control" />
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
    );
};

export default InputForm;
