import { Button, Card, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import handleApi from "../apis/handleApi";
const { Title, Paragraph } = Typography;
const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  let localStorageData: any = window.localStorage.getItem("user");
  if (localStorageData && typeof localStorageData === "string") {
    localStorageData = JSON.parse(localStorageData);
  }

  const url = new URL(window.location.href);

  const handleSend = async (values: {
    nameUser: string;
    money: number;
    email: string;
    idAccount: string;
  }) => {
    const res = await handleApi(
      "/create",
      { ...values, idAccount: localStorageData?.data },
      "post"
    );
    console.log("create: ", res);
    setIsLoading(true);
    try {
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Card
        style={{
          width: "100%",
        }}
      >
        <div className="text-center">
          <Title level={3}>Đăng ký khoản vay</Title>
          <Paragraph type="secondary">
            Chào mừng bạn đến với Pay Reminder
          </Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSend}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name={"nameUser"}
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter your username!!!",
              },
            ]}
          >
            <Input
              placeholder="Enter your username"
              allowClear
              maxLength={100}
              type="text"
            />
          </Form.Item>
          <Form.Item
            name={"money"}
            label="Money"
            rules={[
              {
                required: true,
                message: "Please enter your money!!!",
              },
            ]}
          >
            <Input
              placeholder="Enter your money"
              maxLength={100}
              type="number"
            />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email!!!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              allowClear
              maxLength={100}
              type="text"
            />
          </Form.Item>
        </Form>

        <div className="mt-4 mb-3">
          <Button
            onClick={() => form.submit()}
            type="primary"
            style={{
              width: "100%",
            }}
            size="large"
          >
            Xác nhận
          </Button>
        </div>
      </Card>
    </>
  );
};
export default Create;
