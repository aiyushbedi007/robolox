import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useSession } from '@supabase/auth-helpers-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const session = useSession();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
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

            const { data: employeeData, error: employeeError } = await supabase
                .from('Employee_Details')
                .select('*')
                .eq('manager_id', managerData.employee_id);

            if (employeeError) {
                setError(employeeError.message);
                setLoading(false);
                return;
            }

            setEmployees(employeeData);
            setLoading(false);
        };

        fetchData();
    }, [session]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">Employee Dashboard</h1>
            <div className="row">
                {employees.map((employee) => (
                    <div className="col-md-4 mb-4" key={employee.employee_id}>
                        <Link to={`/employee-details/${employee.employee_id}`} className="text-decoration-none">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{employee.employee_name}</h5>
                                    <p className="card-text"><strong>Email:</strong> {employee.employee_email}</p>
                                    <p className="card-text"><strong>Job Profile:</strong> {employee.job_profile}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
