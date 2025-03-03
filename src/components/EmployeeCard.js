import React from 'react';
import './EmployeeCard.css';

const EmployeeCard = ({ employee }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2 className="card-title">{employee.name}</h2>
                <p className="card-text">{employee.position}</p>
            </div>
        </div>
    );
};

export default EmployeeCard;
