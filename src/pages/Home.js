import React from 'react';

const Home = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Welcome to Talent Check-In</h1>
            <p className="lead">
                A Talent Check-In is a structured process used by Managers and the CEO to evaluate and discuss employees' performance, growth potential, and career development opportunities. This involves:
            </p>
            <ul className="list-unstyled">
                <li className="mb-2">
                    <h5>• Reviewing employee details</h5>
                    <p>Such as their current job role, key achievements, and performance trends.</p>
                </li>
                <li className="mb-2">
                    <h5>• Analyzing historical data</h5>
                    <p>Such as previous check-in outcomes and past performance records, to identify progress and patterns.</p>
                </li>
                <li className="mb-2">
                    <h5>• Conducting the current cycle’s talent check-in</h5>
                    <p>By gathering feedback, assessing developmental needs, and identifying key actions for the employee’s growth.</p>
                </li>
            </ul>
            <p>
                The goal is to ensure meaningful conversations between Managers and CEO while maintaining a streamlined and secure process for tracking and analyzing talent data over time.
            </p>
        </div>
    );
};

export default Home;
