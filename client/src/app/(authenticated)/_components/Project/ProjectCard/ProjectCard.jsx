import {
  Dropdown,
  OverlayTrigger,
  ProgressBar,
  Tooltip,
} from 'react-bootstrap';
import EditDotsIcon from '@/../../public/icons/edit-dots-icon';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import Image from 'next/image';

import KanbanSVG from '@/../../public/SVG/kanban.svg';
import ScrumSVG from '@/../../public/SVG/scrum.svg';
import TasksIcon from '@/../../public/icons/tasks-icon';
import BugsIcon from '@/../../public/icons/bugs-icon';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { notify } from 'reapop';
import { AlertModal } from '../../Modals/AlertModal';

const getRandomBgColor = () => {
  const bgColors = [
    { variant: 'primary', textColor: 'white' },
    { variant: 'secondary', textColor: 'white' },
    { variant: 'success', textColor: 'white' },
    { variant: 'danger', textColor: 'white' },
    { variant: 'warning', textColor: 'dark' },
    { variant: 'dark', textColor: 'white' },
  ];
  const randomIndex = Math.floor(Math.random() * bgColors.length);
  return bgColors[randomIndex];
};

export const renderMembers = (membersData = [], maxVisible = 4, setShowProjectTeam) => {
  return(
    <button
    className="avatar-container px-3 py-4 z-index-1000 border-0 rounded-4"
    onClick={() => setShowProjectTeam(true)}
  >
    {membersData.slice(0, maxVisible).map((member) => {
      const randomPalette = getRandomBgColor();
      const tooltipId = `tooltip-${member._id}`;

      return (
        <OverlayTrigger
          key={member._id}
          placement="top"
          overlay={<Tooltip id={tooltipId}>{`${member.firstname} ${member.lastname}`}</Tooltip>}
        >
          <div className="avatar-overlap z-index-999">
            <Avatar
              name={`${member.firstname} ${member.lastname}`}
              rounded="circle"
              variant={randomPalette?.variant}
              textColor={randomPalette?.textColor}
            />
          </div>
        </OverlayTrigger>
      );
    })}
  </button>

  );
};

export const ProjectCard = ({
  dataProvider,
  handleFunctions,
  projectKey,
  supportBreadCumb = false,
  projectsRootLayer,
  permission,
}) => {
  const { editModal, deleteModal, editMembersModal } = handleFunctions;
  const [showProjectTeam, setShowProjectTeam] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [productData, setProductData] = useState(null);
  const [membersData, setMembersData] = useState([]);
  const [sprintProgress, setSprintProgress] = useState(null);
  const [projectTasks, setProjectTasks] = useState(0);

  const renderDescriptionTooltip = (props) => (
    <Tooltip id="description-tooltip" {...props} className="larger-tooltip">
      {dataProvider?.description}
    </Tooltip>
  );

  const renderSprintProgressTooltip = (props) => (
    <Tooltip id="sprint-progress-tooltip" {...props} className="larger-tooltip">
      {`${sprintProgress || 0}%`}
    </Tooltip>
  );

  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const response = await axios.get(`/portfolios/${dataProvider?.portfolio}`);
        if (response?.status === 200) {
          setPortfolioData(response?.data?.portfolio);
        }
      } catch (error) {
        notify({
          message: 'Failed to load portfolio information',
          status: 'warning',
        });
      }
    };
    if (dataProvider?.portfolio) {
      getPortfolio();
    }
  }, [dataProvider]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`/products/${dataProvider?.product}`);
        if (response?.status === 200) {
          setProductData(response?.data?.product);
        }
      } catch (error) {
        notify({ message: 'Failed to load product information', status: 'danger' });
      }
    };
    if (dataProvider?.product) {
      getProduct();
    }
  }, [dataProvider]);

  const getProjectTasks = useCallback(async (id) => {
    try {
      const response = await axios.get(`/projects/${id}/tasks`);
      if (response?.status === 200) {
        setProjectTasks(response?.data?.tasks.length);
      } else {
        notify({ message: 'Failed to load project tasks', status: 'danger' });
      }
    } catch (error) {
      notify({ message: 'Failed to load project tasks', status: 'danger' });
    }
  }, []);

  useEffect(() => {
    if (dataProvider) {
      getProjectTasks(dataProvider?._id);
    }
  }, [dataProvider, getProjectTasks]);

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response?.data.user || {};
    } catch (error) {
      notify({ message: 'Failed to load user data', status: 'warning' });
      return {};
    }
  };
  
  useEffect(() => {
    const fetchMembers = async (dataProvider) => {
      try {
        const data = await Promise.all(
          dataProvider?.members.map((memberId) => getUserData(memberId))
        );
        setMembersData(data);
      } catch (error) {
        notify({ message: 'Failed to load members data', status: 'warning' });
      }
    };
  
    if (dataProvider?.members?.length > 0) {
      fetchMembers(dataProvider);
    }
  }, [dataProvider]);
  

  const daysLeft = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const differenceInTime = inputDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays <= 7 ? differenceInDays : 0;
  };

  useEffect(() => {
    const activeSprint = dataProvider.sprints.find((sprint) => sprint.status === 'doing');
    if (activeSprint) {
      setSprintProgress(activeSprint.progress || 0);
    }
  }, [dataProvider.sprints]);

  return (
    <>
      <div
        key={projectKey}
        className="project-card text-decoration-none col-12 col-xl-5 col-lg-8 py-1 d-flex flex-column justify-content-between m-xl-0 m-auto gap-2 rounded-2"
      >
        <div className="d-flex flex-lg-row-reverse flex-column justify-content-between align-items-center py-1 gap-xl-0 gap-4">
          <div className="d-flex flex-row-reverse justify-content-lg-start justify-content-between align-items-center col-lg-6 col-12">
            {permission && (
              <Dropdown>
                <Dropdown.Toggle
                  as="button"
                  className="border-0 edit-project m-2 fs-5 text-muted rounded-circle px-2 py-1"
                >
                  <EditDotsIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={editModal}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={editMembersModal}>
                    Manage members
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={deleteModal}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <div className="d-flex gap-2">
              {projectsRootLayer && (
                <span
                  id="product-name"
                  className="product-name d-flex justify-content-center align-items-center px-3 text-white text-center rounded-5"
                >
                  {productData?.name || ''}
                </span>
              )}
              {daysLeft(dataProvider?.endDate) !== 0 && (
                <span className="project-delay-notification d-flex justify-content-center align-items-center px-3 text-white text-center rounded-5">
                  {`${daysLeft(dataProvider?.endDate)} days left`}
                </span>
              )}
            </div>
          </div>
          <div className="d-flex flex-lg-row flex-column align-items-center py-1 gap-3">
            <OverlayTrigger
              placement="top-start"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>{dataProvider?.model}</Tooltip>}
            >
              <Image
                src={
                  dataProvider?.model === 'scrum'
                    ? ScrumSVG
                    : dataProvider?.model === 'kanban'
                    ? KanbanSVG
                    : null
                }
                alt="Framework"
              />
            </OverlayTrigger>
            <span className="fw-bold fs-5 text-dark">{dataProvider?.name}</span>
          </div>
        </div>

        <div className="d-flex flex-column px-4 py-3">
          <p>
            <span className="text-muted">Description: </span>
            {!dataProvider.description ? (
              <span>No description available</span>
            ) : (
              <OverlayTrigger
                placement="top-start"
                delay={{ show: 250, hide: 400 }}
                overlay={renderDescriptionTooltip}
              >
                <span className="text-dark-gray">
                  {dataProvider.description.length > 90
                    ? `${dataProvider.description.slice(0, 90)}...`
                    : dataProvider.description}
                </span>
              </OverlayTrigger>
            )}
          </p>
        </div>

        <div className="d-flex flex-xl-row flex-column justify-content-between align-items-center px-4 fw-bold">
          <p>
            <span className="sprint-count-label">Total number of sprints: </span>
            <span>{dataProvider?.sprintCount}</span>
          </p>

          <p>
            <span className="sprint-count-label">Current sprint: </span>
            {dataProvider?.sprints.length > 0 ? (
              dataProvider.sprints.find((sprint) => sprint.status === 'doing') ? (
                <span className="text-muted">
                  {dataProvider.sprints.find((sprint) => sprint.status === 'doing').name}
                </span>
              ) : (
                <span className="text-secondary">There is no active sprint</span>
              )
            ) : (
              <span className="text-secondary">No sprints are currently available</span>
            )}
          </p>
        </div>

        <div className="d-flex flex-column px-4 gap-3">
          <div className="d-flex justify-content-between">
            <span>Current sprint progress</span>
            <span>{`${parseInt(sprintProgress) || 0}%`}</span>
          </div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250, hide: 400 }}
            overlay={renderSprintProgressTooltip}
          >
            <ProgressBar
              now={sprintProgress}
              variant={sprintProgress === 100 ? 'success' : 'primary'}
              animated={sprintProgress === 100}
            />
          </OverlayTrigger>
        </div>

        <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center px-4 py-3">
          <div className="d-flex gap-4">
            <div className="d-flex align-items-center gap-1">
              <TasksIcon />
              <span className="text-muted">{projectTasks || 0}</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <BugsIcon />
              <span className="text-muted">0</span>
            </div>
          </div>

          <p className="mb-0 mt-3 mt-lg-0">
            <span className="text-muted">Due Date: </span>
            <span className="fw-bold">{formatDate(dataProvider?.endDate)}</span>
          </p>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <span className="text-muted">Members assigned:</span>
            {renderMembers(membersData, 4, setShowProjectTeam)}
          </div>
        </div>
      </div>

      <AlertModal
        show={showProjectTeam}
        handleClose={() => setShowProjectTeam(false)}
        headerTitle={`${dataProvider?.name} Team`}
        size="lg"
      >
        <div className="project-team-list h-100 py-4">
          {membersData.map((user) => (
            <div
              key={user?._id}
              className="user-entry d-flex justify-content-between align-items-center p-2 bg-white border rounded mb-2"
            >
              <div className="d-flex align-items-center gap-3">
                <Avatar
                  name={`${user?.firstname} ${user?.lastname}`}
                  variant="soft-gray"
                  rounded="circle"
                />
                <div className="d-flex flex-column">
                  <span className="fw-bold">{`${user?.firstname} ${user?.lastname}`}</span>
                  <span className="text-muted">{user?.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AlertModal>
    </>
  );
};
