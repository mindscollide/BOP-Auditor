import React from "react";
import { Table, Typography } from "antd";
import "./Table.css";
const CustomTable = ({
  column,
  rows,
  className,
  pagination,
  loading,
  id,
  labelTitle,
  expandable,
  onChange,
  locale,
}) => {
  console.log("CustomTable", className);

  return (
    <>
      <h4 className="labelTitle">{labelTitle}</h4>
      <Table
        rowClassName={id}
        columns={column}
        dataSource={rows}
        className={className}
        loading={loading}
        onChange={onChange}
        pagination={pagination}
        expandable={expandable}
        locale={locale}
      />
    </>
  );
};

export default CustomTable;
