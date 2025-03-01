import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../AuthContext';

const TalentCheckIn = () => {
    const { session } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [cycle, setCycle] = useState('');
    const [highImpactTalent, setHighImpactTalent] = useState('');
    const [needsImprovementTalent, setNeedsImprovementTalent] = useState('');
    const [strengths, setStrengths] = useState('');
    const [opportunityAreas, setOpportunityAreas] = useState('');
    const [flightRisk, setFlightRisk] = useState('');
    const [careerAspirations, setCareerAspirations] = useState('');
    const [plannedActions, setPlannedActions] = useState('');
    const [sessionNotes, setSessionNotes] = useState('');
    const [actionPlanHighlights, setActionPlanHighlights] = useState('');
    const [quarterlyProgressUpdate, setQuarterlyProgressUpdate] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            if (!session) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            const { user } = session;
            const { data: managerData, error: managerError } = await supabase
                .from('Employee_Details')
                .select('employee_id')
                .eq('employee_email', user.email)
                .single();

            if (managerError) {
                setError(managerError.message);
                setLoading(false);
                return;
            }

            // Fetch employees under the manager
            const { data, error } = await supabase
                .from('Employee_Details')
                .select('*')
                .eq('manager_id', managerData.employee_id);

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            setEmployees(data);
            setLoading(false);
        };

        fetchEmployees();
    }, [session]);

    const handleCheckIn = async (e) => {
        e.preventDefault();
        if (!selectedEmployee || !cycle || !highImpactTalent || !needsImprovementTalent || !strengths || !opportunityAreas || !flightRisk || !careerAspirations || !plannedActions || !sessionNotes || !actionPlanHighlights || !quarterlyProgressUpdate) {
            setError('All fields are required.');
            return;
        }

        const { error } = await supabase
            .from('Check_In')
            .insert([
                { 
                    employee_id: selectedEmployee, 
                    cycle, 
                    high_impact_talent: highImpactTalent, 
                    needs_improvement_talent: needsImprovementTalent, 
                    strengths, 
                    opportunity_areas: opportunityAreas, 
                    flight_risk: flightRisk, 
                    career_aspirations: careerAspirations, 
                    planned_actions: plannedActions, 
                    session_notes: sessionNotes, 
                    action_plan_highlights: actionPlanHighlights, 
                    quarterly_progress_update: quarterlyProgressUpdate 
                }
            ]);

        if (error) {
            setError(error.message);
        } else {
            setSelectedEmployee('');
            setCycle('');
            setHighImpactTalent('');
            setNeedsImprovementTalent('');
            setStrengths('');
            setOpportunityAreas('');
            setFlightRisk('');
            setCareerAspirations('');
            setPlannedActions('');
            setSessionNotes('');
            setActionPlanHighlights('');
            setQuarterlyProgressUpdate('');
            setError('');
            alert('Check-in submitted successfully!');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">Talent Check-In</h1>
            <form onSubmit={handleCheckIn}>
                <div className="mb-3">
                    <label>Select Employee:</label>
                    <select 
                        value={selectedEmployee} 
                        onChange={(e) => setSelectedEmployee(e.target.value)} 
                        className="form-control"
                    >
                        <option value="">Select an employee</option>
                        {employees.map((employee) => (
                            <option key={employee.employee_id} value={employee.employee_id}>
                                {employee.employee_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Cycle:</label>
                    <input 
                        type="text" 
                        value={cycle} 
                        onChange={(e) => setCycle(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>High Impact Talent:</label>
                    <select 
                        value={highImpactTalent} 
                        onChange={(e) => setHighImpactTalent(e.target.value)} 
                        className="form-control"
                    >
                        <option value="">Select Yes or No</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Needs Improvement Talent:</label>
                    <select 
                        value={needsImprovementTalent} 
                        onChange={(e) => setNeedsImprovementTalent(e.target.value)} 
                        className="form-control"
                    >
                        <option value="">Select Yes or No</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Strengths:</label>
                    <input 
                        type="text" 
                        value={strengths} 
                        onChange={(e) => setStrengths(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Opportunity Areas:</label>
                    <input 
                        type="text" 
                        value={opportunityAreas} 
                        onChange={(e) => setOpportunityAreas(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Flight Risk:</label>
                    <select 
                        value={flightRisk} 
                        onChange={(e) => setFlightRisk(e.target.value)} 
                        className="form-control"
                    >
                        <option value="">Select Flight Risk Level</option>
                        <option value="No">No</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Career Aspirations:</label>
                    <input 
                        type="text" 
                        value={careerAspirations} 
                        onChange={(e) => setCareerAspirations(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Planned Actions:</label>
                    <input 
                        type="text" 
                        value={plannedActions} 
                        onChange={(e) => setPlannedActions(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Session Notes:</label>
                    <textarea 
                        value={sessionNotes} 
                        onChange={(e) => setSessionNotes(e.target.value)} 
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="mb-3">
                    <label>Action Plan Highlights:</label>
                    <textarea 
                        value={actionPlanHighlights} 
                        onChange={(e) => setActionPlanHighlights(e.target.value)} 
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="mb-3">
                    <label>Quarterly Progress Update:</label>
                    <textarea 
                        value={quarterlyProgressUpdate} 
                        onChange={(e) => setQuarterlyProgressUpdate(e.target.value)} 
                        className="form-control"
                        rows="3"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Check-In</button>
            </form>
        </div>
    );
};

export default TalentCheckIn;
