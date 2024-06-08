import { Dropdown } from "react-bootstrap";
import ArrowRightIcon from "@/../../public/icons/arrows/arrow-right-icon";
import EditDotsIcon from "@/../../public/icons/edit-dots-icon";
import { Avatar } from "@/app/(authenticated)/_components/Avatar";

export const ProjectCard = ({dataProvider,handleFunctions,projectKey})=>{
    //const handleShow = handleFunctions.find(func => func.hasOwnProperty('editModal'))?.editModal;
    //const handleShowDelete = handleFunctions.find(func => func.hasOwnProperty('deleteModal'))?.deleteModal;
      
    return(
        <>
         <div
                  key={projectKey}
                  className="project-card text-decoration-none col-12 col-xl-3 col-lg-4 col-md-5 py-1 d-flex flex-column justify-content-between gap-1 rounded-2"
                >
                  <div className="d-flex justify-content-end ">
                    
                    <div >
                      <Dropdown>
                        <Dropdown.Toggle as='button' className='border-0 edit-project m-2 fs-5 text-muted rounded-circle px-2 py-1' >
                        <EditDotsIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=>console.log('edited')} >Edit</Dropdown.Item>
                          <Dropdown.Item onClick={()=>console.log('deleted')} >Delete</Dropdown.Item>
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
                    <p className="fw-bold fs-5 text-dark ">{dataProvider.name}</p>
                  </div>
                  <div className="d-flex flex-column px-4 py-3">
                    <p className="text-dark-gray">
                      {dataProvider.description.length > 130
                        ? `${dataProvider.description.slice(0, 130)}...`
                        : dataProvider.description}
                    </p>
                  </div>
                  <div>
                    <span className="fw-bold px-4 text-dark" >{dataProvider.startDate} - {dataProvider.endDate}</span>
                  </div>
                  <div className="d-flex flex-column px-4 pt-5">
                  
                    <p>
                      <span className=" text-secondary fw-semibold">
                        Number of Projects :
                      </span>{' '}
                      <span className="fw-bolder text-dark">
                        {dataProvider.projects || 0}
                      </span>
                    </p>
                    <div className="line rounded w-25   mb-3"></div>
                  </div>
                </div></>
    );
}