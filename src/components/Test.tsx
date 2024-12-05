import { Column } from "@ant-design/plots";
import { Spin } from "antd"; // Import Spin for the loading icon
import handleApi from "../apis/handleApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DemoDefaultTooltip = () => {
  let localStorageData: any = window.localStorage.getItem("user");
  if (localStorageData && typeof localStorageData === "string") {
    localStorageData = JSON.parse(localStorageData);
  }

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [value, setValue] = useState({});

  useEffect(() => {
    try {
      let localStorageData: any = window.localStorage.getItem("user");
      if (localStorageData && typeof localStorageData === "string") {
        localStorageData = JSON.parse(localStorageData);
      }

      if (!localStorageData) {
        navigate("/login");
      } else {
        setLoading(true); // Start loading
        test();
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
    }
  }, []);

  const test = async () => {
    try {
      const res: any = await handleApi(
        `/analyst/${localStorageData?.data}`,
        null
      );
      setValue(res?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading when the API call is finished
    }
  };

  const data = Object.entries(value).map(([name, value]) => ({
    name,
    value,
  }));

  const config = {
    data,
    xField: "name",
    yField: "value",

    onReady: ({ chart }: any) => {
      try {
        const { height } = chart._container.getBoundingClientRect();
        if (data.length > 0) {
          const tooltipItem = data[Math.floor(Math.random() * data.length)];
          chart.on(
            "afterrender",
            () => {
              chart.emit("tooltip:show", {
                data: {
                  data: tooltipItem,
                },
                offsetY: height / 2 - 60,
              });
            },
            true
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
  };

  return (
    <div>
      {loading ? (
        <Spin
          tip="Loading..."
          style={{ display: "block", textAlign: "center", margin: "20px 0" }}
        />
      ) : (
        <Column {...config} />
      )}
    </div>
  );
};

export default DemoDefaultTooltip;
