import axios from "axios";
import react, { useEffect, useState } from "react";
import { BASE_URL } from "../../Utils/BaseUrl";
import { Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";

const MomentList = () => {
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

  const title = (thumbImg) => {
    return <img className='projectTeamTT' src={thumbImg} />;
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (e) =>
        e.map((el) => {
          return (
            <Tag color={"green"} key={el}>
              {el}
            </Tag>
          );
        }),
    },
    {
      title: "Images",
      dataIndex: "files",
      key: "files",
      render: (e) =>
        e.map((el) => {
          return (
            <div key={el} className='avatar-group d-inline-block'>
              <Tooltip title={title(el)} trigger='hover'>
                <Link
                  target='_'
                  to={el}
                  className='projectTeam avatar rounded-circle text-white border border-1 border-solid border-card'>
                  <img className='projectTeam' src={el} />
                </Link>
              </Tooltip>
            </div>
          );
        }),
    },
  ];
  return (
    <div className=''>
      <Table dataSource={data} columns={columns} />;
    </div>
  );
};
export default MomentList;
