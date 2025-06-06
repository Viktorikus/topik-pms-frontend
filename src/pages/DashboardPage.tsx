import StatsCard from '../components/dashboard/StatsCard';
import ProgressChart from '../components/dashboard/ProgressChart';

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <StatsCard />
      <ProgressChart />
    </div>
  );
};

export default DashboardPage;