import React, { useEffect, useState } from "react";
import { Table } from "antd";
import handleApi from "../apis/handleApi";
import moment from "moment";
import { formatCurrencyVND } from "../utils/transferVND";

const HistoryTransfer = () => {
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const columns = [
    {
      title: "Tên giao dịch",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "Email",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Dòng tiền",
      dataIndex: "action",
      key: "action",
      render: (text: any) => (
        <span style={{ color: "green", fontWeight: "bold" }}>{text}</span> // Styled as green
      ),
    },
  ];

  const getListUser = async () => {
    setLoading(true); // Start loading
    let localStorageData: any = window.localStorage.getItem("user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
    }
    try {
      const res: any = await handleApi(
        `/transaction/${localStorageData?.data}`,
        null,
        "get"
      );
      console.log("res trans: ", res);
      const normalizedData = normalizeData(res?.data);
      setListUser(normalizedData);
    } catch (error: any) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  function normalizeData(dataArray: any) {
    return dataArray.map((item: any, index: any) => ({
      key: (index + 1).toString(),
      name: item.namePay,
      money: formatCurrencyVND(item.amount),
      address: moment(item.date).format("DD/MM/YYYY HH:mm:ss"),
      action: `+ ${formatCurrencyVND(item.amount)}`,
    }));
  }

  useEffect(() => {
    getListUser();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={listUser}
      loading={loading} // Show spinner while loading
      pagination={{
        pageSize: 6,
      }}
    />
  );
};

export default HistoryTransfer;
