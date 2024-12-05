import { Layout, Menu, Button, Modal, Dropdown, Drawer } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DemoDefaultTooltip from "./Test";
import Login from "../screens/auths/Login";
import { useEffect, useState } from "react";
import Create from "./CreateRent";
import ListUser from "./ListUser";
import HistoryTransfer from "./HistoryTransfer";
import handleApi from "../apis/handleApi";
import { formatCurrencyVND } from "../utils/transferVND";
import VoiceAdd from "./VoiceAdd";
import { MessageOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./test.css";
import { PlusOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedMenuKey, setSelectedMenuKey] = useState("1");

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
    console.log("OK clicked");
    setIsVisible(false);
    setIframeVisible(false);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    setIsVisible(false);
    setIframeVisible(false);
  };

  const showModal1 = () => {
    setIsOpen(true);
  };

  const handleOk1 = () => {
    console.log("OK clicked");
    setIsOpen(false);
  };

  const handleCancel1 = () => {
    console.log("Cancel clicked");
    setIsOpen(false);
  };

  const renderContent = () => {
    switch (selectedMenuKey) {
      case "1":
        return (
          <div>
            <BrowserRouter>
              <Routes>
                <Route path="/trang-chu" element={<DemoDefaultTooltip />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </div>
        );
      case "3":
        return (
          <div>
            <ListUser />
          </div>
        );
      case "2":
        return (
          <div>
            <HistoryTransfer />
          </div>
        );
      default:
        return <div>Welcome to Pay Reminder</div>;
    }
  };

  const [acc, setAcc] = useState<any>({});

  const getAccLogin = async () => {
    let localStorageData: any = window.localStorage.getItem("user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
    }
    try {
      const res: any = await handleApi(
        `/auth/get-account/${localStorageData?.data}`,
        null,
        "get"
      );
      await setAcc(res?.data);
    } catch (error: any) {}
  };

  const [iframeVisible, setIframeVisible] = useState(false);

  const handleIframe = () => {
    setIsVisible(true);
    setIframeVisible(true);
  };

  useEffect(() => {
    getAccLogin();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showModal}>
        Thêm nhanh
      </Menu.Item>
      <Menu.Item key="2" onClick={showModal1}>
        Thêm bằng giọng nói
      </Menu.Item>
    </Menu>
  );
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Trạng thái màn hình nhỏ

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Trang Chủ",
      onClick: () => {
        window.history.pushState({}, "", "/trang-chu"); // Thay đổi URL
      },
    },
    {
      key: "2",
      icon: <LaptopOutlined />,
      label: "Lịch sử giao dịch",
      onClick: () => {
        window.history.pushState({}, "", "/lich-su-giao-dich"); // Thay đổi URL
      },
    },
    {
      key: "3",
      icon: <LaptopOutlined />,
      label: "Danh sách người mượn",
      onClick: () => {
        window.history.pushState({}, "", "/danh-sach-nguoi-muon"); // Thay đổi URL
      },
    },
    {
      key: "4",
      icon: <NotificationOutlined />,
      label: "Đăng xuất",
      onClick: () => {
        window.localStorage.removeItem("user");
        window.location.href = "/login";
      },
    },
  ];

  return (
    <Layout>
      <Modal
        title="Chat with Pay Reminder"
        centered
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        {iframeVisible ? (
          <iframe
            src="http://54.144.87.3/?fbclid=IwY2xjawG-MdZleHRuA2FlbQIxMAABHZqywYT-ihkLpjuo5Rw86qEkKo0mDu63s2t7RhdM7VPxAchpKFxBD4oQcg_aem_xviM_FExwc8GaITo2Nhzuw" // Replace with your chatbot URL
            style={{
              width: "100%",
              height: "500px",
              border: "1px solid #ccc",
              marginTop: "20px",
            }}
            title="Chatbot"
          ></iframe>
        ) : (
          <Create />
        )}
      </Modal>
      <Modal
        title="Thêm người mượn bằng giọng nói"
        centered
        visible={isOpen}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <VoiceAdd />
      </Modal>
      {/* Header */}
      <Header
        className="header"
        style={{
          background: "#0d6efd",
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Tiêu đề */}
        <div
          style={{
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            flex: 1,
          }}
        >
          Pay Reminder
        </div>

        {/* Desktop menu */}
        <div
          className="desktop-menu"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Button
            icon={<MessageOutlined />}
            type="primary"
            style={{
              backgroundColor: "white",
              color: "#0d6efd",
              fontWeight: "bold",
            }}
            onClick={handleIframe}
          >
            Chat
          </Button>
          <Dropdown overlay={menu} trigger={["hover"]}>
            <Button
              type="primary"
              style={{
                backgroundColor: "white",
                color: "#0d6efd",
                fontWeight: "bold",
              }}
            >
              Thêm
            </Button>
          </Dropdown>
          <div
            style={{
              color: "white",
              fontSize: "16px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Welcome,</span>{" "}
            {acc?.nameAccount}
            <span style={{ fontWeight: "bold", marginLeft: "8px" }}>
              Số dư:
            </span>{" "}
            {formatCurrencyVND(acc?.wallet)}
          </div>
        </div>

        {/* Mobile menu button */}
        <Button
          className="mobile-menu-button"
          style={{
            backgroundColor: "white",
            color: "#0d6efd",
            fontWeight: "bold",
            display: "none",
          }}
          onClick={() => setDrawerVisible(true)}
        >
          <MenuUnfoldOutlined />
        </Button>

        {/* Drawer for mobile menu */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          bodyStyle={{ padding: "0" }}
          headerStyle={{
            backgroundColor: "#0d6efd",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <Menu
            mode="vertical"
            style={{
              borderRight: "none",
              fontSize: "16px",
            }}
            items={[
              {
                key: "1",
                icon: (
                  <MessageOutlined
                    style={{ color: "#0d6efd", fontSize: "18px" }}
                  />
                ),
                label: "Chat",
                onClick: handleIframe, // Chạy hàm xử lý khi bấm vào "Chat"
              },
              {
                key: "2",
                icon: (
                  <PlusOutlined
                    style={{ color: "#0d6efd", fontSize: "18px" }}
                  />
                ),
                label: "Thêm",
                onClick: showModal,
              },
            ]}
          />
        </Drawer>
      </Header>
      {/* Main Layout */}
      <Layout>
        {/* Sidebar */}
        <Sider
          width={250}
          className="site-layout-background"
          collapsed={isMobile} // Tự động ẩn khi ở mobile
          collapsedWidth={80} // Kích thước chỉ để hiển thị icon
          style={{ transition: "all 0.3s ease" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={(e) => setSelectedMenuKey(e.key)}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: isMobile ? null : item.label, // Ẩn văn bản khi ở mobile
              onClick: item.onClick,
            }))}
          />
        </Sider>

        {/* Content */}
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
