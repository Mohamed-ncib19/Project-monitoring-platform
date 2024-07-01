import axios from 'axios';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import DataTable from '@/layout/DataTable';
import clsx from 'clsx';
import { OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';
import Image from 'next/image';
import BestDeveloperCup from '@/../../public/images/1st-Place.png'
import CoreButton from '@/components/buttons/CoreButton';
import ProductIcon from '../../../../../public/icons/sidebar-icons/product-icon';
import ProjectIcon from '../../../../../public/icons/sidebar-icons/project-icon';
import ToDoTasksIcon from '../../../../../public/icons/to-do-tasks';
import BugsIcon from '../../../../../public/icons/bugs-icon';


const renderScoreProgress = (props) =>(
<Tooltip id="sprint-progress-tooltip" {...props} className="larger-tooltip">
  {/*Score Progress*/}
  {`20%`}
</Tooltip>
);

const TeamMemberDashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const getUserTasks = useCallback(async (id) => {
    try {
      const response = await axios.get(`/users/${id}/tasks`);
      if (response?.data?.tasks) {
        setTasks(response.data.tasks);
        setError(null);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch tasks.');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getUserTasks(user._id);
    }
  }, [user]);

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
        Cell:({row}) =>{
          return(
            <span
            className={clsx({
              'text-success': row?.original.ratio > 0,
              'text-danger': row?.original.ratio < 0,
              'text-muted' : row?.original.ratio === 0
            })}
            >{row?.original?.ratio>0 ? `+${row?.original?.ratio} minutes` : row?.original.ratio ===0 ? `${row?.original.ratio} minutes` : `-${row?.original?.ratio} minutes`}</span>
          );
        }
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      tasks.map((task) => {
        const estimatedTime = task.estimated * 60;
        const spentTime = task.consumed * 60;
        const ratio = spentTime - estimatedTime;
        const timePeriod = calculateTimePeriod(task.assignedDate);

        return {
          ...task,
          timePeriod,
          complexity: task.type,
          estimatedTime: `${estimatedTime} minutes`,
          spentTime: `${spentTime} minutes`,
          ratio: ratio,
        };
      }),
    [tasks]
  );

  return (
    <div className="container-fluid bg-info d-flex flex-column gap-3 px-5 py-4">
      
      <div className="row d-flex flex-md-row flex-column justify-content-between align-items-center gap-5 ">
        
        <div className="col-lg score-shortcut rounded-3 d-flex flex-column px-4 py-4">
          <span className='text-muted fw-semibold' >YOU’RE SCORING</span>
          <span className='h3 fw-bold' >46</span>
          <div className='d-flex justify-content-between align-items-center' >
            <span className='text-muted' >Performance rate</span>
            <span className='h4 text-success' >4%</span>
          </div>
          <OverlayTrigger
            placement='top-start'
            delay={{show: 250, hide: 400}}
            overlay={renderScoreProgress}
          >
          <ProgressBar now={20} />
          </OverlayTrigger>
        </div>

        <div className="rank-shortcut col-lg-4 bg-primary  p-3 rounded-3">
          <div className='row d-flex justify-content-between align-items-center' >
          <div className=' col-md-6 d-flex flex-column'>
            <span className='h3 text-light fw-bold' >Best developer of the week!</span>
            <CoreButton label='Check out!' variant='bg-light' textColor='text-dark' />
          </div>
          <Image
          src={BestDeveloperCup}
          className=' w-auto h-auto'
          />
          </div>

        </div>
      </div>

      <div className="row d-flex flex-lg-row flex-column justify-content-center align-items-center gap-5">
        
        <div className="col-lg-2 col-md-4 col bg-light rounded-4 shadow">
          <div className="row d-flex flex-lg-row flex-column">
            <div className="col h1 m-auto d-flex justify-content-center align-items-center">
              <ProductIcon height={110} />
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-lg-start align-items-center">
              <span className='h3 text-light fw-bold text-dark' >1</span>
              <span className='h4 text-light fw-bold text-dark' >Product</span>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-4 col bg-light rounded-3 shadow">
          <div className="row d-flex flex-lg-row flex-column">
            <div className="col h1 m-auto d-flex justify-content-center align-items-center">
              <ProjectIcon height={110} />
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-lg-start align-items-center">
              <span className='h3 text-light fw-bold text-dark' >1</span>
              <span className='h4 text-light fw-bold text-dark' >Project</span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-2 col-md-4 col px-2 py-2">
          <div className="row bg-green shadow rounded-4">
            <div className="col spent-estimate-shortcut-left px-4 d-flex flex-column justify-content-center align-items-center ">
              <span className="h3 fw-bold">
                50 <span className="h5 text-start fw-bold">h</span>
              </span>
              <span className="fw-bold">spent</span>
            </div>
            <div className=" spent-estimate-shortcut-right px-4 col d-flex flex-column justify-content-center align-items-center">
              <span className="h3 fw-bold">
                42 <span className="h5 text-start fw-bold">h</span>
              </span>
              <span className="fw-bold">spent</span>
            </div>
          </div>
        </div>

        
        <div className="col-lg-2 col-md-4 col bg-light rounded-3 shadow">
          <div className="row d-flex flex-lg-row flex-column">
            <div className="col h1 m-auto d-flex justify-content-center align-items-center">
              <ToDoTasksIcon  />
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-lg-start align-items-center">
              <span className='h3 text-light fw-bold text-dark' >4</span>
              <span className='h4 text-light fw-bold text-dark' >Tasks</span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-2 col-md-4 col bg-light rounded-3 shadow">
          <div className="row d-flex flex-lg-row flex-column">
            <div className="col h1 m-auto d-flex justify-content-center align-items-center">
              <BugsIcon width={110} />
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-lg-start align-items-center">
              <span className='h3 text-light fw-bold text-dark' >0</span>
              <span className='h4 text-light fw-bold text-dark' >Bugs</span>
            </div>
          </div>
        </div>
        
        </div>

      <div className="row d-flex flex-md-row flex-column justify-content-center align-items-center">
        <div className="col-md-4">work distribution</div>
        <div className="col-md-4">spent/est chart</div>
        <div className="col-md-4">issues breakdown</div>
      </div>

      <div className="row shadow">
        <div className="col-12">
          {error && <div className="alert alert-danger">{error}</div>}
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;
