import axios from 'axios';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import DataTable from '@/layout/DataTable';

const TeamMemberDashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  const getUserTasks = useCallback(async () => {
    try {
      const response = await axios.get(`/users/${user?._id}/tasks`);
      if (response?.data?.tasks) {
        sessionStorage.setItem('userTasks', JSON.stringify(response.data.tasks));
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    const storedTasks = sessionStorage.getItem('userTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else if (user?._id) {
      getUserTasks();
    }
  }, [user, getUserTasks]);

  const calculateTimePeriod = (assignedDate) => {
    const now = new Date();
    const taskDate = new Date(assignedDate);
    const difference = differenceInCalendarDays(now, taskDate);

    if (difference === 0) return 'Today';
    if (difference === 1) return 'Yesterday';
    return `${difference} days ago`;
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Time Period',
        accessor: 'timePeriod',
      },
      {
        Header: 'Task Ref.',
        accessor: 'zentaoId',
      },
      {
        Header: 'Complexity',
        accessor: 'complexity',
      },
      {
        Header: 'Estimated Time',
        accessor: 'estimatedTime',
      },
      {
        Header: 'Spent Time',
        accessor: 'spentTime',
      },
      {
        Header: 'Ratio',
        accessor: 'ratio',
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      tasks.map((task) => {
        const estimatedTime = task.estimated * 60; // assuming estimated is in hours
        const spentTime = task.consumed * 60; // assuming consumed is in hours
        const ratio = spentTime - estimatedTime;
        const timePeriod = calculateTimePeriod(task.assignedDate);

        return {
          ...task,
          timePeriod,
          complexity: task.type, // You can add more logic here based on your requirements
          estimatedTime: `${estimatedTime} minutes`,
          spentTime: `${spentTime} minutes`,
          ratio: `${ratio > 0 ? '+' : ''}${ratio} minutes`,
        };
      }),
    [tasks]
  );

  return (
    <div className="container-fluid bg-info">
      <div className="row d-flex flex-md-row flex-column justify-content-center align-items-center">
        <div className="col-md-8 bg-success">score</div>
        <div className="col-md-4 bg-primary">ranking</div>
      </div>

      <div className="row d-flex flex-md-row flex-column justify-content-center align-items-center gap-5">
        <div className="col-md-2 bg-danger">products</div>
        <div className="col-md-2 bg-danger">projects</div>
        <div className="col-md-2 bg-danger">spent / est</div>
        <div className="col-md-2 bg-danger">tasks</div>
        <div className="col-md-2 bg-danger">bugs</div>
      </div>

      <div className="row d-flex flex-md-row flex-column justify-content-center align-items-center">
        <div className="col-md-4">work distribution</div>
        <div className="col-md-4">spent/est chart</div>
        <div className="col-md-4">issues breakdown</div>
      </div>

      <div className="row bg-warning">
        <div className="col-12">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;
