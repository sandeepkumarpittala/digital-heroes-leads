// ============================================
// src/pages/AdminDashboardPage.jsx
// Protected Admin Dashboard
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../components/common/Select.jsx';
import Button from '../components/common/Button.jsx';
import Loader from '../components/common/Loader.jsx';
import { getLeads, updateLeadStatus } from '../services/leadService.js';
import { useAuth } from '../context/AuthContext.jsx';

const STATUS_OPTIONS = ['New', 'Contacted', 'Closed'];
const STATUS_FILTER_OPTIONS = ['All', 'New', 'Contacted', 'Closed'];

const STATUS_BADGE_STYLES = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-amber-100 text-amber-700',
  Closed: 'bg-green-100 text-green-700',
};

const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [updatingLeadId, setUpdatingLeadId] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLeads();
    }, 400);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter]);

  const fetchLeads = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const params = {};

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      if (statusFilter !== 'All') {
        params.status = statusFilter;
      }

      const response = await getLeads(params);
      setLeads(response.data || []);
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      setErrorMessage(
        backendMessage || 'Failed to load leads. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingLeadId(leadId);

    try {
      const response = await updateLeadStatus(leadId, newStatus);
      const updatedLead = response.data;

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === leadId ? { ...lead, status: updatedLead.status } : lead
        )
      );
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      setErrorMessage(
        backendMessage || 'Failed to update lead status. Please try again.'
      );
    } finally {
      setUpdatingLeadId(null);
    }
  };

  // ------------------------------------------------
  // Handle logout — clears auth state then navigates to /login
  // ------------------------------------------------
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full sm:w-72 px-3.5 py-2.5 rounded-xl text-sm border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
          />

          <div className="w-full sm:w-56">
            <Select
              name="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={STATUS_FILTER_OPTIONS}
              placeholder="Filter by status"
            />
          </div>
        </div>

        {errorMessage && (
          <p className="mb-4 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {errorMessage}
          </p>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="py-16">
              <Loader fullScreen label="Loading leads..." />
            </div>
          ) : leads.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-500 text-sm">
                No leads found. Try adjusting your search or filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left font-medium text-gray-600 px-6 py-3">
                      Name
                    </th>
                    <th className="text-left font-medium text-gray-600 px-6 py-3">
                      Email
                    </th>
                    <th className="text-left font-medium text-gray-600 px-6 py-3">
                      Budget Range
                    </th>
                    <th className="text-left font-medium text-gray-600 px-6 py-3">
                      Status
                    </th>
                    <th className="text-left font-medium text-gray-600 px-6 py-3">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                    >
                      <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                        {lead.budgetRange}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_BADGE_STYLES[lead.status]}`}
                          >
                            {lead.status}
                          </span>

                          <select
                            value={lead.status}
                            disabled={updatingLeadId === lead._id}
                            onChange={(e) =>
                              handleStatusChange(lead._id, e.target.value)
                            }
                            className="text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboardPage;