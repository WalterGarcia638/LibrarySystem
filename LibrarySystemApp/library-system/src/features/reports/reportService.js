import axiosClient from '../../api/axiosClient';

export const reportService = {
    getLoansByPeriod: async(startDate, endDate) => {
        const response = await axiosClient.get(`/reports/loans?start=${startDate}&end=${endDate}`);
        return response.data;
    },
    getUsersWithPendingFines: async() => {
        const response = await axiosClient.get(`/reports/pending-fines`);
        return response.data;
    }
};