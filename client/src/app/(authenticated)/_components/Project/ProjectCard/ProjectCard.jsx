import { Dropdown, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';
import EditDotsIcon from '@/../../public/icons/edit-dots-icon';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import Image from 'next/image';

import KanbanSVG from '@/../../public/SVG/kanban.svg';
import ScrumSVG from '@/../../public/SVG/scrum.svg';
import TasksIcon from '@/../../public/icons/tasks-icon';
import BugsIcon from '@/../../public/icons/bugs-icon';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
export const renderMembers = (
  membersData,
  maxVisible = 4,
  setShowProjectTeam,
) => {
  return (
    <button
      className="avatar-container px-3 py-4 z-index-1000 border-0 rounded-4"
      onClick={() => setShowProjectTeam(true)}
    >
      {membersData.slice(0, maxVisible).map((member, index) => {
        const randomPalette = getRandomBgColor();
        const tooltipId = `tooltip-${member._id}`;

        return (
          <OverlayTrigger
            key={member._id}
            placement="top"
            overlay={
              <Tooltip
                id={tooltipId}
              >{`${member.firstname} ${member.lastname}`}</Tooltip>
            }
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
  team,
  handleFunctions,
  projectKey,
  supportBreadCumb = false,
  projectsRootLayer,
  permission
}) => {

  console.log(dataProvider)

  const handleShowEditModal = handleFunctions.editModal;
  const handleShowDelete = handleFunctions.deleteModal;
  const handleShowEditMembers = handleFunctions?.editMembersModal;

  const [showProjectTeam, setShowProjectTeam] = useState(false);

  const [portfolioData, setPortfolioData] = useState([]);
  const [productData, setProductData] = useState(null);
  const [membersData, setMembersData] = useState([]);

  const renderDescriptionTooltip = (props) => (
    <Tooltip id="description-tooltip" {...props} className="larger-tooltip">
      {dataProvider?.description}
    </Tooltip>
  );

  const formatDate = (value) => {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return formattedDate;
  };

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const response = await axios.get(
          `/portfolios/${dataProvider?.portfolio}`,
        );
        if (response?.status === 200) {
          setPortfolioData(response?.data?.portfolio);
        }
      } catch (error) {
        notify({
          message: 'failed to load Portfolio informations',
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
      
        const response = await axios.get(`/products/${dataProvider?.product}`);
        if (response?.status === 200) {
          setProductData(response?.data?.product);
        }
      
    };
    if (dataProvider?.product) {
      getProduct();
    }
  }, [dataProvider]);

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response?.data?.user || {};
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  useEffect(() => {
    const fetchMembers = async (formatData) => {
      const data = await Promise.all(
        formatData?.members.map((memberId) => getUserData(memberId)),
      );
      setMembersData(data);
    };

    if (dataProvider?.members.length > 0) {
      fetchMembers(dataProvider);
    }
  }, [dataProvider?.members]);

  const daysLeft = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const differenceInTime = inputDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays <= 7) {
      return differenceInDays;
    } else {
      return 0;
    }
  };

  return (
    <>
      <div
        key={projectKey}
        className="project-card text-decoration-none col-12 col-xl-5 col-lg-8 py-1 d-flex flex-column justify-content-between m-xl-0 m-auto gap-2 rounded-2"
      >
        <div className="d-flex flex-lg-row-reverse flex-column justify-content-between align-items-center  py-1 gap-xl-0 gap-4">
          <div className="d-flex flex-row-reverse justify-content-lg-start justify-content-between align-items-center col-lg-6 col-12">
            { permission &&( 
             <Dropdown>
              <Dropdown.Toggle
                as="button"
                className="border-0 edit-project m-2 fs-5 text-muted rounded-circle px-2 py-1"
              >
                <EditDotsIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShowEditModal}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShowEditMembers}>
                  Manage memebers
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleShowDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}

            <div className="d-flex gap-2">

              {projectsRootLayer && (
                <span
                  id="product-name"
                  className="product-name d-flex justify-content-center align-items-center px-3 text-white text-center rounded-5 "
                >
                  {productData?.name || ''}
                </span>
              )}

              {daysLeft(dataProvider?.endDate) !== 0 ? (
                <span className="project-delay-notification d-flex justify-content-center align-items-center px-3 text-white text-center rounded-5 ">
                  {` ${daysLeft(dataProvider?.endDate)} days left`}
                </span>
              ) : (
                ''
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
            <span className="fw-bold fs-5 text-dark ">
              {dataProvider?.name}
            </span>
          </div>
        </div>

        <div className="d-flex flex-column px-4 py-3">
          <p>
            <span className="text-muted">Description : </span>

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

        <div className="d-flex flex-xl-row flex-column justify-content-between gap-3 px-4">
          <p className="fw-bold col-xl-6 col-12 text-lg-start text-center">
            <span className="sprint-count-label">
              Total number of sprints:{' '}
            </span>
            <span>{dataProvider?.sprintCount}</span>
          </p>
            {
            }
          <p className="fw-bold col-xl-6 col-12 text-lg-start text-center">
            <span className="sprint-count-label">Current sprint: </span>
            <span className='text-muted'>
              {
                dataProvider?.sprints.length > 0
                ? (
                  dataProvider.sprints.find(sprint => sprint.status === 'doing')?.name
                )
                : (
                  <>No sprints is currently available</>
                )
              }
            </span>

          </p>
        </div>

        <div className="d-flex flex-column px-4 gap-3 ">
          <div className='d-flex justify-content-between' >
          <span>current sprint progress</span>
          <span>05%</span>
          </div>
          <ProgressBar now={20} />

        </div>

        <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center px-4 py-3">
          <div className="d-flex gap-4">
            <div className="d-flex align-items-center gap-1">
              <TasksIcon />
              <span className="text-muted">35</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <BugsIcon />
              <span className="text-muted">8</span>
            </div>
          </div>

          <p className="mb-0 mt-3 mt-lg-0">
            {' '}
            <span className="text-muted">DueDate</span>{' '}
            <span className="fw-bold">{formatDate(dataProvider?.endDate)}</span>
          </p>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <span className="text-muted">Members assigned</span>
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
        <div className="project-team-list h-100 py-4  ">
          {membersData.map((user) => (
            <div
              key={user?._id}
              className="user-entry d-flex justify-content-between align-items-center p-2 bg-white border rounded mb-2"
            >
              <div className="d-flex align-items-center gap-3">
                <Avatar
                  name={`${user?.firstname}  ${user?.lastname}`}
                  variant="soft-gray"
                  rounded="circle"
                />
                <div className="d-flex flex-column">
                  <span className="fw-bold">{`${user?.firstname}  ${user?.lastname}`}</span>
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
