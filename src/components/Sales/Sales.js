import React, { Fragment } from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FlexBox } from "../Navbar/styles";
import Chart from "../charts/ReactECharts";
import { Button } from "@mui/material";

const SalesCard = ({
  title,
  subtitle,
  bottomTitle,
  style = {},
  showTrend,
  isNegative,
  type,
  chartConfig,
}) => {
  return (
    <FlexBox
      style={{
        width: 340,
        height: 200,
        border: "1px solid ##BDBDBD",
        backgroundColor: "white",
        borderRadius: 10,
        padding: "35px 31px",
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        "h3,h4": {
          padding: 0,
          margin: 0,
          letterSpacing: "0.5px",
        },
        h3: {
          fontSize: 45,
        },
        ...style,
      }}
    >
      <span>{title}</span>
      {type === "chart" ? (
        <Chart {...chartConfig} />
      ) : (
        <Fragment>
          <h3>{subtitle}</h3>
          <h4>
            {showTrend ? (
              <IoIosTrendingUp
                size={20}
                viewBox={`0 ${isNegative ? "" : "-"}100 512 512`}
                style={{
                  transform: isNegative ? "rotate(180deg)" : 0,
                  marginRight: 10,
                }}
              />
            ) : null}
            {bottomTitle}
          </h4>
        </Fragment>
      )}
    </FlexBox>
  );
};

const salesItems = [
  {
    title: "MTD Sales",
    subtitle: "₹ 2.65 L",
    showTrend: true,
    isNegative: false,
    bottomTitle: "12 % MoM",
  },
  {
    title: "CD Sales",
    subtitle: "₹ 45,890",
    showTrend: true,
    isNegative: true,
    bottomTitle: "7 % DoD",
  },
  {
    title: "Operating Margin",
    subtitle: "25%",
    bottomTitle: "Target 30%",
    style: {
      h3: {
        color: "#FF3830",
        fontSize: 45,
      },
    },
  },
  {
    type: "chart",
    title: "This Week Sales Trend",
    chartConfig: {
      series: [400, 300, 350, 200, 280],
      data: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      type: "bar",
    },
  },
  {
    type: "chart",
    title: "Orders Completed",
    chartConfig: {
      series: [400, 300, 350, 200, 280],
      data: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      type: "bar",
    },
  },
  {
    type: "chart",
    title: "Orders Completed",
    chartConfig: {
      series: [400, 300, 350, 200, 280],
      data: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      type: "bar",
    },
  },
];

const Sales = () => {
  const navigate = useNavigate();
  const onSelect = (option) => {
    navigate(option.route);
  };
  return (
    <FlexBox
      flexDirection="column"
      style={{ flex: 1, gap: 30, overflowY: "scroll", padding: "24px 70px" }}
    >
      <FlexBox style={{ justifyContent: "flex-end", gap: 20 }}>
        <Button variant="outlined" onClick={()=>navigate("/sales/create-order")}>Add new order</Button>
        <Button variant="outlined" onClick={()=>navigate("/sales/orderbook")}>Order book</Button>
        <Button variant="outlined" onClick={()=>navigate("/sales/order-details")}>Track Order</Button>
      </FlexBox>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {salesItems.map((item) => (
          <SalesCard {...item} />
        ))}
      </div>
      <FlexBox
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <Chart
          width={"100%"}
          height={350}
          {...{
            series: [400, 300, 350, 200, 280, 200, 100].reverse(),
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            type: "line",
          }}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default Sales;
