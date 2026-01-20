import moment from "moment";
import { convertDateTimeIntoLocal } from "../utils/Timer";

export const createTableFunc = (value, tenors, data) => {
  let columns = [];
  let tableData = [];
  if (value === 1) {
    // forward table data

    // Base static columns
    const staticColumns = [
      {
        title: "",
        key: "employeeidcol",
        children: [
          {
            title: "Employee ID",
            dataIndex: "employeeID",
            key: "employeeID",
            width: 100,
          },
        ],
      },
      {
        title: "",
        key: "employeenamecol",
        children: [
          {
            title: "Employee Name",
            dataIndex: "employeeName",
            key: "employeeName",
            width: 150,
          },
        ],
      },
      {
        title: "",
        key: "employeeemailcol",
        children: [
          {
            title: "Email ID",
            dataIndex: "emailID",
            key: "emailID",
            width: 120,
          },
        ],
      },
      // {
      //   title: "",
      //   key: "employeestatuscol",

      //   children: [
      //     {
      //       title: "Status",
      //       dataIndex: "status",
      //       key: "status",
      //       width: 70,
      //       render: (text) => (
      //         <span
      //           style={{
      //             color: text?.toLowerCase() === "active" ? "green" : "red",
      //           }}
      //         >
      //           {text}
      //         </span>
      //       ),
      //     },
      //   ],
      // },
      {
        title: "",
        children: [
          {
            title: "Time Stamps",
            dataIndex: "timeStamps",
            key: "timeStamps",
            width: 200,
            render: (text) => (
              <span>
                {text &&
                  moment(convertDateTimeIntoLocal(text)).format(
                    "DD/MM/YYYY hh:mm:ss A"
                  )}
              </span>
            ),
          },
        ],
      },
    ];

    // Dynamic tenor columns
    const tenorColumns = tenors.map((tenor, index) => ({
      title: tenor.tenorName,
      key: index,
      children: [
        {
          title: "Bid",
          dataIndex: `${tenor.tenorName}_Bid`,
          width: 70,
          align: "center",
          render(text) {
            return <div>{text ? text : "-"}</div>;
          },
        },
        {
          title: "Ask",
          dataIndex: `${tenor.tenorName}_Ask`,
          width: 70,
          align: "center",
          render(text) {
            return <div>{text ? text : "-"}</div>;
          },
        },
      ],
    }));

    // Combine all columns
    columns = [...staticColumns, ...tenorColumns];

    // Map data rows
    tableData = data.map((emp) => {
      const row = {
        employeeID: emp.employeeID,
        employeeName: emp.employeeName,
        emailID: emp.emailID,
        status: emp.status,
        timeStamps: emp.timeStamps,
      };
      emp.tenorRates.forEach((t) => {
        const tenorName = tenors.find(
          (x) => x.tenorID === t.tenorID
        )?.tenorName;
        if (tenorName) {
          row[`${tenorName}_Bid`] = t.bid || "-";
          row[`${tenorName}_Ask`] = t.ask || "-";
        }
      });

      return row;
    });
  } else if (value === 2) {
    // Base static columns
    const staticColumns = [
      {
        title: "Employee ID",
        dataIndex: "employeeID",
        key: "employeeID",
        width: 100,
      },
      {
        title: "Employee Name",
        dataIndex: "employeeName",
        key: "employeeName",
        width: 180,
      },
      {
        title: "Email ID",
        dataIndex: "emailID",
        key: "emailID",
        width: 220,
      },
      // {
      //   title: "Status",
      //   dataIndex: "status",
      //   key: "status",
      //   width: 100,
      //   render: (text) => (
      //     <span
      //       style={{
      //         color: text?.toLowerCase() === "active" ? "green" : "red",
      //       }}
      //     >
      //       {text}
      //     </span>
      //   ),
      // },
      {
        title: "Time Stamps",
        dataIndex: "timeStamps",
        key: "timeStamps",
        width: 200,
        render: (text) => (
          <span>
            {text &&
              moment(convertDateTimeIntoLocal(text)).format(
                "DD/MM/YYYY hh:mm:ss A"
              )}
          </span>
        ),
      },
      {
        title: "Currency",
        dataIndex: "currency",
        key: "currency",
        width: 100,
        align: "center",
      },
    ];

    // === Dynamic Tenor Columns ===
    const tenorColumns = tenors.map((tenor, index) => ({
      title: tenor.tenorName, // e.g. "1 MONTH", "2 MONTH"
      dataIndex: `${tenor.tenorName}_rate`,
      // key: `${tenor.tenorName}_rate`,
      key: index,
      width: 120,
      align: "center",
      render: (text) => <div>{text ? text : "-"}</div>,
    }));

    columns = [...staticColumns, ...tenorColumns];

    // === Table Data Mapping ===
    data.forEach((emp) => {
      // Group by currency
      const currencies = [...new Set(emp.tenorRates.map((r) => r.currency))];

      currencies.forEach((cur) => {
        const row = {
          employeeID: emp.employeeID,
          employeeName: emp.employeeName,
          emailID: emp.emailID,
          status: emp.status,
          timeStamps: emp.timeStamps,
          currency: cur,
        };

        // Fill each tenor rate
        tenors.forEach((t) => {
          const rateObj = emp.tenorRates.find(
            (r) => r.tenorID === t.tenorID && r.currency === cur
          );
          row[`${t.tenorName}_rate`] = rateObj ? rateObj.rate : "-";
        });

        tableData.push(row);
      });
    });
  } else if (value === 3) {
    // For Non FE
    // Base static columns
    const staticColumns = [
      {
        title: "Employee ID",
        dataIndex: "employeeID",
        key: "employeeID",
        width: 100,
      },
      {
        title: "Employee Name",
        dataIndex: "employeeName",
        key: "employeeName",
        width: 150,
      },
      {
        title: "Email ID",
        dataIndex: "emailID",
        key: "emailID",
        width: 120,
      },
      // {
      //   title: "Status",
      //   dataIndex: "status",
      //   key: "status",
      //   width: 70,
      //   render: (text) => (
      //     <span
      //       style={{
      //         color: text?.toLowerCase() === "active" ? "green" : "red",
      //       }}
      //     >
      //       {text}
      //     </span>
      //   ),
      // },
      {
        title: "Time Stamps",
        dataIndex: "timeStamps",
        key: "timeStamps",
        width: 200,
        render: (text) => (
          <span>
            {text &&
              moment(convertDateTimeIntoLocal(text)).format(
                "DD/MM/YYYY hh:mm:ss A"
              )}
          </span>
        ),
      },
    ];

    // Dynamic tenor columns
    // === Dynamic Tenor Columns ===
    const tenorColumns = tenors.map((tenor, index) => ({
      title: tenor.tenorName, // e.g. "1 MONTH", "2 MONTH"
      dataIndex: `${tenor.tenorName}_rate`,
      key: index,
      // key: `${tenor.tenorName}_rate`,
      width: 120,
      align: "center",
      render: (text) => <div>{text ? text : "-"}</div>,
    }));

    columns = [...staticColumns, ...tenorColumns];

    // Map data rows
    tableData = data.map((emp, index) => {
      const row = {
        employeeID: emp.employeeID,
        employeeName: emp.employeeName,
        emailID: emp.emailID,
        status: emp.status,
        timeStamps: emp.timeStamps,
      };
      emp.tenorRates.forEach((t) => {
        const tenorName = tenors.find(
          (x) => x.tenorID === t.tenorID
        )?.tenorName;
        if (tenorName) {
          row[`${tenorName}_rate`] = t.rate || "-";
          //   row[`${tenorName}_Ask`] = t.ask || "-";
        }
      });

      return row;
    });
  }
  return { columns, tableData };
};
