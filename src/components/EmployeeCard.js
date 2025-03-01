import React from 'react';

const EmployeeCard = ({ employee }) => {
    return (
        <div>
            <h2>{employee.name}</h2>
            <p>{employee.position}</p>
        </div>
    );
};

export default EmployeeCard;
