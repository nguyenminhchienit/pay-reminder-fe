import { Button, Card, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import handleApi from "../apis/handleApi";
import { AudioOutlined } from "@ant-design/icons";
const { Title, Paragraph } = Typography;
const VoiceAdd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  let localStorageData: any = window.localStorage.getItem("user");
  if (localStorageData && typeof localStorageData === "string") {
    localStorageData = JSON.parse(localStorageData);
  }

  const url = new URL(window.location.href);

  const handleSend = async (values: {
    nameUser: string;
    email: string;
    idAccount: string;
  }) => {
    const res: any = await handleApi(
      "/voice",
      {
        text: values.nameUser + " email " + values.email,
        idAccount: localStorageData?.data,
      },
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

  const [isRecording, setIsRecording] = useState(false);
  let recognition: any;
  // Check if browser supports SpeechRecognition
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "vi-VN"; // Set language to Vietnamese, change if needed
    recognition.interimResults = false; // Only final results
    recognition.continuous = false; // Stop after one input
  } else {
    console.error("Speech recognition not supported in this browser.");
  }

  const handleMicrophoneClick = () => {
    if (!recognition) {
      message.error("Speech recognition is not supported in your browser.");
      return;
    }

    setIsRecording(true); // Show recording state

    recognition.start(); // Start speech recognition

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript; // Get recognized speech
      console.log("Recognized Speech: ", transcript);

      // Set the recognized text into the username input field
      form.setFieldsValue({ nameUser: transcript });
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error: ", event.error);
      message.error("Failed to recognize speech. Please try again.");
    };

    recognition.onend = () => {
      setIsRecording(false); // Stop recording state
    };
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
              {
                validator: (_, value) => {
                  const syntaxRegex = /^thêm\s.+\ssố tiền\s\d+(\.\d{1,2})?$/i;

                  if (!value || syntaxRegex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Cú pháp không đúng. Hãy nhập theo định dạng: thêm <tên> số tiền <số tiền> email <vui lòng nhập tay>"
                    )
                  );
                },
              },
            ]}
            help="Lưu ý: Cú pháp nhập username cần bao gồm tên, số tiền, và email."
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Cú pháp: thêm <tên> số tiền <số tiền> email <vui lòng nhập tay>"
              allowClear
              maxLength={100}
              type="text"
              suffix={
                <Button
                  shape="circle"
                  icon={<AudioOutlined />}
                  onClick={handleMicrophoneClick}
                  className={isRecording ? "recording" : ""}
                />
              }
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
      <style>
        {`
          .recording {
            color: red;
            animation: pulse 1s infinite;
          }
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </>
  );
};
export default VoiceAdd;
