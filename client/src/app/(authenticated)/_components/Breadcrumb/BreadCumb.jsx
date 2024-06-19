import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { useBreadCumb } from "@/app/(authenticated)/_context/BreadcrumbsContext";
import { useEffect } from "react";
import clsx from "clsx";

export const BreadcrumbLink = () => {
  const { breadCumbItem, setBreadCumbItem,show } = useBreadCumb();

  useEffect(() => {

    if (breadCumbItem.length > 5) {
      const newBreadCumbItem = breadCumbItem.slice(0, -3);
      setBreadCumbItem(newBreadCumbItem);
    }

  }, [breadCumbItem]);

  const handleClick = (index) => {
    setBreadCumbItem(breadCumbItem.slice(0, index + 1));
  };

  const renderBreadcrumbs = () => {
    return breadCumbItem.map((item, index) => {
      if (item.portfolio) {
        return (
          <BreadcrumbItem
            key={index}
            onClick={() => handleClick(index)}
          >
            {item.portfolio}
          </BreadcrumbItem>
        );
      } else if (item.product) {
        return (
          <BreadcrumbItem
            key={index}
            onClick={() => handleClick(index)}
          >
            {item.product}
          </BreadcrumbItem>
        );
      }
      return null;
    });
  };

  return (
    <div className={clsx('d-block',{
      'd-none':!show
    })} >
    <Breadcrumb>
      {breadCumbItem.length === 3 && (
        <BreadcrumbItem active onClick={() => handleClick(0)}>
          /{breadCumbItem[0].defaultPortfolio}
        </BreadcrumbItem>
      )}
      {breadCumbItem.length === 4 && (
        <>
          <BreadcrumbItem href={breadCumbItem[3].portfolioLink} onClick={() => handleClick(1)}>
            {breadCumbItem[3].portfolio}
          </BreadcrumbItem>
          <BreadcrumbItem active onClick={() => handleClick(1)}>
            {breadCumbItem[1].defaultProducts}
          </BreadcrumbItem>
        </>
      )}
      {breadCumbItem.length === 5 && (
        <>
          <BreadcrumbItem href={breadCumbItem[3].portfolioLink} onClick={() => handleClick(1)}>
            {breadCumbItem[3].portfolio}
          </BreadcrumbItem>
          <BreadcrumbItem href={breadCumbItem[4].productLink} onClick={() => handleClick(4)}>
            {breadCumbItem[4].product}
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {breadCumbItem[2].defaultProjects}
          </BreadcrumbItem>
        </>
      )}
      {breadCumbItem.length > 5 && renderBreadcrumbs()}
    </Breadcrumb>
    </div>
  );
};
