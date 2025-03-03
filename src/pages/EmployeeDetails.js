import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const EmployeeDetails = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { data: employeeData, error: employeeError } = await supabase
                .from('Employee_Details')
                .select('*')
                .eq('employee_id', employeeId)
                .single();

            if (employeeError) {
                setError(employeeError.message);
                setLoading(false);
                return;
            }

            const { data: performanceData, error: performanceError } = await supabase
                .from('Performance')
                .select('*')
                .eq('employee_id', employeeId);

            const { data: checkInData, error: checkInError } = await supabase
                .from('Check_In')
                .select('*')
                .eq('employee_id', employeeId);

            if (performanceError || checkInError) {
                setError(performanceError?.message || checkInError?.message);
                setLoading(false);
                return;
            }

            setEmployee({
                ...employeeData,
                performance: performanceData,
                checkIn: checkInData,
            });
            setLoading(false);
        };

        fetchData();
    }, [employeeId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">{employee.employee_name}'s Details</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Email: {employee.employee_email}</h5>
                    <h5 className="card-title">Job Profile: {employee.job_profile}</h5>
                    
                    <h3>Performance Records</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Cycle</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.performance.map((performance) => (
                                <tr key={performance.Cycle}>
                                    <td>{performance.Cycle}</td>
                                    <td>{performance.Rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>Check-In Data</h3>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">Cycle</th>
                                    <th className="text-center">High Impact Talent</th>
                                    <th className="text-center">Needs Improvement Talent</th>
                                    <th className="text-center">Strengths</th>
                                    <th className="text-center">Opportunity Areas</th>
                                    <th className="text-center">Flight Risk</th>
                                    <th className="text-center">Career Aspirations</th>
                                    <th className="text-center">Planned Actions</th>
                                    <th className="text-center">Session Notes</th>
                                    <th className="text-center">Action Plan Highlights</th>
                                    <th className="text-center">Quarterly Progress Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.checkIn.map((checkIn) => (
                                    <tr key={checkIn.cycle}>
                                        <td>{checkIn.cycle}</td>
                                        <td>{checkIn.high_impact_talent}</td>
                                        <td>{checkIn.needs_improvement_talent}</td>
                                        <td>{checkIn.strengths}</td>
                                        <td>{checkIn.opportunity_areas}</td>
                                        <td>{checkIn.flight_risk}</td>
                                        <td>{checkIn.career_aspirations}</td>
                                        <td>{checkIn.planned_actions}</td>
                                        <td>{checkIn.session_notes}</td>
                                        <td>{checkIn.action_plan_highlights}</td>
                                        <td>{checkIn.quarterly_progress_update}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
