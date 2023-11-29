import axios from "axios";
import react, { useEffect, useState } from "react";
import { BASE_URL } from "../../Utils/BaseUrl";
import { Table } from "antd";

const Home = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const getAllMoments = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/user/moment-list", {
        headers: { token },
      });
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    getAllMoments();
  }, []);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div className=''>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};
export default Home;
