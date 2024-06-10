import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ArrowRightIcon from '@/../../public/icons/arrows/arrow-right-icon';
import EditDotsIcon from '@/../../public/icons/edit-dots-icon';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import Image from 'next/image';

import KanbanSVG from '@/../../public/SVG/kanban.svg';
import ScrumSVG from '@/../../public/SVG/scrum.svg';
import TasksIcon from '../../../../../../public/icons/tasks-icon';
import BugsIcon from '../../../../../../public/icons/bugs-icon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { notify } from 'reapop';

export const ProjectCard = ({ dataProvider, handleFunctions, projectKey, supportBreadCumb = false, projectsRootLayer, setProduct}) => {
  const handleShowEditModal = handleFunctions.editModal;
  const handleShowDelete = handleFunctions.deleteModal;

  const [portfolioData , setPortfolioData] = useState([]);
  const [productData , setProductData] = useState([]);

  const renderTooltip = (props) => (
    <Tooltip id="description-tooltip" {...props} className="larger-tooltip">
      {dataProvider?.description}
    </Tooltip>
  );

  console.log(dataProvider);

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
    if (projectsRootLayer) {
      setProduct(dataProvider?.product);
    }
  }, [projectsRootLayer, dataProvider]);
  
  useEffect(()=>{
    const getPortfolio = async () =>{
      try {
        const response = await axios.get(`/portfolios/${dataProvider?.portfolio}`);
        if(response?.status === 200){
          setPortfolioData(response?.data?.portfolio);
        }
      } catch (error) {
        notify({ message : 'failed to load Portfolio informations' , status : 'warning'});
      }
    }
    if(dataProvider?.portfolio){
      getPortfolio();
    }
  },[dataProvider]);

  useEffect(()=>{
    const getProduct = async () =>{
      try {
        const response = await axios.get(`/products/${dataProvider?.product}`);
        console.log(response)
        if(response?.status === 200){
          setProductData(response?.data?.product);
        }
      } catch (error) {
        notify({ message : 'failed to load Product informations' , status : 'warning'});
      }
    }
    if(dataProvider?.product){
      getProduct();
    }
  },[dataProvider]);
  console.log(portfolioData);

  console.log(productData)

  const getUserData = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response?.data?.user || {};
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  return (
    <>
      <div
        key={projectKey}
        className="project-card text-decoration-none col-12 col-xl-5 col-lg-8 py-1 d-flex flex-column justify-content-between m-xl-0 m-auto gap-4 rounded-2"
      >
        <div className="d-flex flex-row-reverse justify-content-between ">
          <div>
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
                <Dropdown.Item onClick={() => console.log('manage')}>
                  Manage memebers
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleShowDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className='d-flex' >
     {
           projectsRootLayer && (
            <span id='portfolio-name' className='portfolio-name d-flex justify-content-center align-items-center px-3 m-2 text-white text-center rounded-5 ' >
                {portfolioData?.name || ''}
            </span>
           ) 
          }

          <span className="project-delay-notification d-flex justify-content-center align-items-center px-3 m-2 text-white text-center rounded-5 ">
            6 days left
          </span>

          </div>
        </div>

        <div className="d-flex flex-md-row flex-column align-items-center px-4 gap-4">
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

          <p className="fw-bold fs-5 text-dark ">{dataProvider?.name}</p>
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
                overlay={renderTooltip}
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
            <span>{dataProvider?.sprintCount || 0}</span>
          </p>

          <p className="fw-bold col-xl-6 col-12 text-lg-start text-center">
            <span className="sprint-count-label">Current sprint: </span>
            <span>
              {dataProvider?.description ? (
                dataProvider.description.length > 50 ? (
                  `${dataProvider.description.slice(0, 50)}...`
                ) : (
                  dataProvider.description
                )
              ) : (
                <span className=" text-dark-gray">no sprints...</span>
              )}
            </span>
          </p>
        </div>

        <div className="d-flex flex-column px-4 pt-5">
          <span>current sprint progress</span>
          <span>progress bar</span>
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

          <div className="d-flex flex-column align-items-center mt-3 mt-lg-0">
            <span>Members assigned</span>
            {/*   <div className="d-flex gap-2">
                         {dataProvider?.members?.map( async (member, index) =>{
                          const response = await getUserData(member);
                          console.log(response);
                         } )}
                      </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
