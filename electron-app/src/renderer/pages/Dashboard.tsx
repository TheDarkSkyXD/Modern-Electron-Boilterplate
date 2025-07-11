import React from 'react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

const Dashboard: React.FC = () => {
  const handleShowNotification = () => {
    window.electron.showNotification('Hello', 'This is a notification.');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the dashboard page.</p>
          <Button onClick={handleShowNotification} className="mt-4">
            Show Notification
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
