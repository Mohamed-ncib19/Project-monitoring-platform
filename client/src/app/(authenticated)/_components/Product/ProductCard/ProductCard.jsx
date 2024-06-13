import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ArrowRightIcon from '@/../../public/icons/arrows/arrow-right-icon';
import EditDotsIcon from '@/../../public/icons/edit-dots-icon';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import Link from 'next/link';
import { useBreadCumb } from '@/app/(authenticated)/_context/BreadcrumbsContext';

export const ProductCard = ({
  dataProvider,
  handleFunctions,
  supportBreadCumb = false,
  productKey,
  productsRootLayer,
  permission
}) => {


  const { setBreadCumbItem } = useBreadCumb();

  const handleShow = handleFunctions.editModal || '';
  const handleShowDelete = handleFunctions.deleteModal || '';

const renderTooltip = (props) => (
  <Tooltip id="description-tooltip" {...props} className="larger-tooltip"  >
    {dataProvider?.description}
  </Tooltip>
);

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const formatDate = (value) => {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone : 'UTC'
    });   
    return formattedDate;
  };



  const daysLeft = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const differenceInTime = inputDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays <= 7) {
      return differenceInDays;
    } else {
      return 0 ;
    }
  };

  return (
    <>
      <Link
        href={`/portfolio/${dataProvider?.portfolio}/products/${dataProvider?._id}/projects`}
        key={productKey}
        className="product-card text-decoration-none col-xl-3 col-lg-8 col-12  py-1 d-flex flex-column justify-content-between m-xl-0 m-auto gap-3 rounded-2"
        onClick={
          supportBreadCumb
            ? () =>
                setBreadCumbItem((prev) => [
                  ...prev,
                  {
                    product: dataProvider.name,
                    productLink: `/portfolio/${dataProvider?.parent}/products`,
                  },
                ])
            : null
        }
      >
        <div className="d-flex flex-row-reverse  justify-content-between align-items-center ">

          {permission && (
            <div className='d-flex flex-row-reverse justify-content-lg-start justify-content-between align-items-center '>
        <Dropdown onClick={stopPropagation}>
              <Dropdown.Toggle
                as="button"
                className="border-0 edit-product m-2 fs-5 text-muted rounded-circle px-2 py-1"
              >
                <EditDotsIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShowDelete}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>)}
          <div className='d-flex gap-2' >
          {
           productsRootLayer && (
            <span id='portfolio-name' className='portfolio-name d-flex justify-content-center align-items-center px-3 py-2 text-white text-center rounded-5 ' >
                {dataProvider?.portfolioName || ''}
            </span>
           ) 
          }

{
            daysLeft(dataProvider?.endDate) !== 0
            ? (
              <span className="project-delay-notification d-flex justify-content-center align-items-center px-3 text-white text-center rounded-5 ">
              {` ${daysLeft(dataProvider?.endDate)} days left`}
              </span>
              )
              : ''
              }
              </div>
        </div>
        <div className="d-flex flex-md-row flex-column align-items-center px-4 gap-4">
          <Avatar
            name={dataProvider.name}
            variant='product-avatar'
            rounded={'1'}
            textColor='dark'
          />
          <p className="fw-bold fs-5 text-dark ">{dataProvider.name}</p>
        </div>
        <div className="d-flex flex-column px-4 py-3">
     
       {
        !dataProvider.description 
          ? (
            <p className="text-dark-gray text-center">
              <span>No description available</span>
            </p>
          )
          : (
            <OverlayTrigger
              placement="top-start"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <p className="text-dark-gray">
                {dataProvider.description.length > 90
                  ? `${dataProvider.description.slice(0, 90)}...`
                  : dataProvider.description
                }
              </p>
            </OverlayTrigger>
          )
      }
        </div>
        <span className="fw-bold px-4 text-dark text-lg-start text-center w-100 col-12">
            <span>
            {formatDate(dataProvider?.startDate)} 
            </span>
            
            -
            <span>
              {formatDate(dataProvider?.endDate)}
            </span>
          </span>
        <div className="d-flex flex-column px-4 pt-5">
          <p>
            <span className=" text-secondary fw-semibold">
              Number of Projects :
            </span>{' '}
            <span className="fw-bolder text-dark">
              {dataProvider.projectCount || 0}
            </span>
          </p>
          <div className="line rounded w-25   mb-3"></div>
        </div>
        <span className=" check-products align-self-end justify-content-end border-0 rounded-circle px-2 py-1 fs-4  text-dark-gray">
          <ArrowRightIcon />
        </span>
      </Link>
    </>
  );
};
