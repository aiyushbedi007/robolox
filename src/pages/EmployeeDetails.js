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
                    
                    <div className="accordion" id={`accordion-${employee.employee_id}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`headingPerformance-${employee.employee_id}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapsePerformance-${employee.employee_id}`} aria-expanded="true" aria-controls={`collapsePerformance-${employee.employee_id}`}>
                                    Performance Records
                                </button>
                            </h2>
                            <div id={`collapsePerformance-${employee.employee_id}`} className="accordion-collapse collapse show" aria-labelledby={`headingPerformance-${employee.employee_id}`} data-bs-parent={`#accordion-${employee.employee_id}`}>
                                <div className="accordion-body">
                                    {employee.performance.map((performance) => (
                                        <p key={performance.Cycle}><strong>Cycle:</strong> {performance.Cycle}, <strong>Rating:</strong> {performance.Rating}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`headingCheckIn-${employee.employee_id}`}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseCheckIn-${employee.employee_id}`} aria-expanded="false" aria-controls={`collapseCheckIn-${employee.employee_id}`}>
                                    Check-In Data
                                </button>
                            </h2>
                            <div id={`collapseCheckIn-${employee.employee_id}`} className="accordion-collapse collapse" aria-labelledby={`headingCheckIn-${employee.employee_id}`} data-bs-parent={`#accordion-${employee.employee_id}`}>
                                <div className="accordion-body">
                                    {employee.checkIn.map((checkIn) => (
                                        <div key={checkIn.cycle}>
                                            <p><strong>Cycle:</strong> {checkIn.cycle}</p>
                                            <p><strong>High Impact Talent:</strong> {checkIn.high_impact_talent}</p>
                                            <p><strong>Needs Improvement Talent:</strong> {checkIn.needs_improvement_talent}</p>
                                            <p><strong>Strengths:</strong> {checkIn.strengths}</p>
                                            <p><strong>Opportunity Areas:</strong> {checkIn.opportunity_areas}</p>
                                            <p><strong>Flight Risk:</strong> {checkIn.flight_risk}</p>
                                            <p><strong>Career Aspirations:</strong> {checkIn.career_aspirations}</p>
                                            <p><strong>Planned Actions:</strong> {checkIn.planned_actions}</p>
                                            <p><strong>Session Notes:</strong> {checkIn.session_notes}</p>
                                            <p><strong>Action Plan Highlights:</strong> {checkIn.action_plan_highlights}</p>
                                            <p><strong>Quarterly Progress Update:</strong> {checkIn.quarterly_progress_update}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
