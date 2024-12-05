import React, { useEffect, useState } from "react";
import { Table, Divider, Button, Modal, Spin } from "antd";
import handleApi from "../apis/handleApi";
import EditRent from "./EditRent";
import { formatCurrencyVND } from "../utils/transferVND";

const ListUser = () => {
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [listUser, setListUser] = useState([]);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
      render: (text: any) => (
        <span style={{ color: "green", fontWeight: "bold" }}>{text}</span> // Styled as green
      ),
    },
    {
      title: "Email",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <span>
          <Button onClick={() => handleEdit(record)}>Sửa</Button>
          <Divider type="vertical" />
          <Button onClick={() => handleRemind(record.id)}>Nhắc nhở</Button>
        </span>
      ),
    },
  ];

  const handleRemind = async (userId: any) => {
    setLoading(true); // Show loading spinner
    try {
      const res = await handleApi(`/remind/${userId}`, null, "get");
      console.log("remind: ", res);
    } catch (error) {
      console.error("Error sending reminder:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const getListUser = async () => {
    setLoading(true); // Show loading spinner
    let localStorageData: any = window.localStorage.getItem("user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
    }
    try {
      const res: any = await handleApi(
        `/get-list-info-rent/${localStorageData?.data}`,
        null,
        "get"
      );
      const normalizedData = normalizeData(res?.data?.listUsers);
      setListUser(normalizedData);
    } catch (error: any) {
      console.error("Error fetching user list:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  function normalizeData(dataArray: any) {
    return dataArray.map((item: any, index: any) => ({
      id: item.id,
      key: (index + 1).toString(),
      name: item.nameUser,
      money: formatCurrencyVND(item.money),
      address: item.email,
    }));
  }

  useEffect(() => {
    getListUser();
  }, []);

  return (
    <div>
      <Modal
        title="Cập nhật thông tin"
        visible={isModalVisible}
        onOk={handleModalOk}
        centered
        onCancel={handleModalCancel}
      >
        <EditRent editingUser={editingUser} />
      </Modal>
      <Table
        columns={columns}
        dataSource={listUser}
        pagination={{
          pageSize: 6,
        }}
        loading={loading} // Add spinner only for table
      />
    </div>
  );
};

export default ListUser;
