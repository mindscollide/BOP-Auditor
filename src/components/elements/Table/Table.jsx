import React from "react";
import { Table } from "antd";
import "./Table.css";
const CustomTable = React.memo(
  ({
    column,
    rows,
    className,
    pagination = false,
    loading,
    id,
    labelTitle,
    expandable,
    onChange,
    locale,
    scroll,
    prefixCls,
    style,
    bordered,
    rowKey,
    rowId,
  }) => {
    return (
      <>
        <h4 className="labelTitle">{labelTitle}</h4>
        <Table
          bordered={bordered}
          rowClassName={id}
          columns={column}
          dataSource={rows}
          className={className}
          loading={loading}
          onChange={onChange}
          pagination={pagination}
          expandable={expandable}
          locale={locale}
          prefixCls={prefixCls}
          scroll={scroll}
          style={style}
          rowKey={rowKey}
          id={rowId}
        />
      </>
    );
  }
);

export default CustomTable;
