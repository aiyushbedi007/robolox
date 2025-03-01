import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../AuthContext';

const TalentCheckIn = () => {
    const { session } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState('');
    const [growthActions, setGrowthActions] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

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
        if (!selectedEmployee || !feedback || !growthActions) {
            setError('All fields are required.');
            return;
        }

        const { error } = await supabase
            .from('Talent_CheckIns')
            .insert([
                { employee_id: selectedEmployee, feedback, growth_actions: growthActions }
            ]);

        if (error) {
            setError(error.message);
        } else {
            setFeedback('');
            setGrowthActions('');
            setSelectedEmployee('');
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
                    <label>Feedback:</label>
                    <textarea 
                        value={feedback} 
                        onChange={(e) => setFeedback(e.target.value)} 
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="mb-3">
                    <label>Growth Actions:</label>
                    <textarea 
                        value={growthActions} 
                        onChange={(e) => setGrowthActions(e.target.value)} 
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
