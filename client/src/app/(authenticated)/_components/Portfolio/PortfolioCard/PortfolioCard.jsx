import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import ArrowRightIcon from "@/../../public/icons/arrows/arrow-right-icon";
import EditDotsIcon from "@/../../public/icons/edit-dots-icon";
import { Avatar } from "@/app/(authenticated)/_components/Avatar";
import Link from "next/link";
import { useBreadCumb } from "@/app/(authenticated)/_context/BreadcrumbsContext";


export const PortfolioCard = ({ dataProvider, handleFunctions,portfolioKey }) => {
  const { setBreadCumbItem } = useBreadCumb();

  console.log(dataProvider);


  const handleShow = handleFunctions.editModal;
  const handleShowDelete = handleFunctions.deleteModal;


  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const renderTooltip = (props) => (
    <Tooltip id="description-tooltip" {...props} className="larger-tooltip"  >
      {dataProvider?.description}
    </Tooltip>
  );
  return (
  <>
    <Link
      href={`/portfolio/${dataProvider._id}/products`}
      key={portfolioKey}
      className="text-decoration-none portfolio-card col-12 col-xl-3 col-lg-12 col-md-12 py-1 d-flex flex-column justify-content-between gap-1 rounded-2"
      onClick={() => setBreadCumbItem(prev => [...prev, {portfolio:dataProvider.name , portfolioLink : `/portfolio` }])}
      >
      <div className="d-flex justify-content-end">
        <div onClick={stopPropagation}>
          <Dropdown>
            <Dropdown.Toggle as="button" className="border-0 edit-protfolio z-index-999 m-2 fs-5 text-muted rounded-circle px-2 py-1">
              <EditDotsIcon />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={handleShowDelete}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="d-flex flex-md-row flex-column align-items-center px-4 gap-4">
        <Avatar
          name={dataProvider.name}
          variant={'info'}
          rounded={'1'}
          textColor={'dark'}
        />
        <p className="fw-bold fs-5 text-dark">{dataProvider.name}</p>
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
              placement="left-end"
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
      <div className="d-flex flex-column px-4 pt-5">
        <p>
          <span className="protfolio-children-length fw-semibold">
            Number of Products:
          </span>{' '}
          <span className="fw-bolder text-dark">
            {dataProvider && dataProvider?.productCount || 0 }
          </span>
        </p>
        <div className="line rounded w-25 mb-3"></div>
        <p>
          <span className="protfolio-children-length fw-semibold">
            Number of Projects:
          </span>{' '}
          <span className="fw-bolder text-dark">
            {dataProvider && dataProvider?.projectCount || 0}
          </span>
        </p>
      </div>
      <span className="check-products align-self-end justify-content-end border-0 rounded-circle px-2 py-1 fs-4 text-dark-gray">
        <ArrowRightIcon />
      </span>
    </Link>
    </>
  );
};
