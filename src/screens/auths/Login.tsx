import {
  Button,
  Card,
  Checkbox,
  Form,
  Image,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import handleApi from "../../apis/handleApi";
import { useAppDispatch } from "../../redux/hook";
import { addAuth, authSelector } from "../../redux/reducers/authReducer";
import { AuthTypeState } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
const { Title, Paragraph, Text } = Typography;
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth: AuthTypeState = useSelector(authSelector);

  useEffect(() => {
    let localStorageData: any = window.localStorage.getItem("user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
    }

    if (localStorageData?.data) {
      navigate("/trang-chu");
    }
  }, []);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const res: any = await handleApi("/auth/login", values, "post");
      console.log(res);
      if (res.code === 200) {
        message.success(res.message);
        await dispatch(addAuth(res));
        localStorage.setItem("user", JSON.stringify(res));
        window.location.reload();

        navigate(`/trang-chu`);
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
          <Title level={2}>Log in to your account</Title>
          <Paragraph type="secondary">
            Welcome back! please enter your details
          </Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name={"username"}
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
        <div className="row">
          <div className="col">
            <Checkbox
              checked={isRemember}
              onChange={(val) => setIsRemember(val.target.checked)}
            >
              Remember for 30 days
            </Checkbox>
          </div>
          <div className="col text-right d-flex flex-row-reverse">
            <Link to={"/"}>Forgot password?</Link>
          </div>
        </div>
        <div className="mt-4 mb-3">
          <Button
            onClick={() => form.submit()}
            type="primary"
            style={{
              width: "100%",
            }}
            size="large"
          >
            Login
          </Button>
        </div>
        <div className="mt-3 text-center">
          <Space>
            <Text type="secondary">Don't have an acount? </Text>
            <Link to={"/sign-up"}>Sign up</Link>
          </Space>
        </div>
      </Card>
    </>
  );
};
export default Login;
