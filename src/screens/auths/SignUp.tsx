import {
  Button,
  Card,
  Form,
  Image,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handleApi from "../../apis/handleApi";
const { Title, Text, Paragraph } = Typography;
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleRegister = async (values: {
    userName: string;
    password: string;
    fullName: string;
    email: string;
  }) => {
    setIsLoading(true);
    try {
      const res: any = await handleApi("/auth/register", values, "post");
      console.log(res);
      if (res.code) {
        message.success(res.message);
      }
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
          width: "80%",
        }}
      >
        <div className="text-center">
          {/* <Image
            width={60}
            preview={false}
            src="https://res.cloudinary.com/dubz32w0z/image/upload/v1732695086/kankis/logo_odkwmb.png"
          /> */}
          <Title level={2}>Create an account</Title>
          <Paragraph type="secondary">
            Welcome back! please enter your details
          </Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleRegister}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name={"fullName"}
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter your name!!!",
              },
            ]}
          >
            <Input placeholder="Enter your name" allowClear />
          </Form.Item>
          <Form.Item
            name={"userName"}
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter your user name!!!",
              },
            ]}
          >
            <Input placeholder="Enter your name" allowClear />
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
              type="email"
            />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password!!!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              maxLength={100}
              type="password"
            />
          </Form.Item>
        </Form>
        <div className="mt-4 mb-3">
          <Button
            onClick={() => form.submit()}
            loading={isLoading}
            type="primary"
            style={{
              width: "100%",
            }}
            size="large"
          >
            Sign Up
          </Button>
        </div>
        <SocialLogin />
        <div className="mt-3 text-center">
          <Space>
            <Text>Already an acount? </Text>
            <Link to={"/login"}>Login</Link>
          </Space>
        </div>
      </Card>
    </>
  );
};
export default SignUp;
