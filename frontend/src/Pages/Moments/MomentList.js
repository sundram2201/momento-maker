import axios from "axios";
import react, { useEffect, useState } from "react";
import { BASE_URL } from "../../Utils/BaseUrl";
import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { DashLoader } from "../../Components/Loaders";

const MomentList = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const getAllMoments = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/user/moment-list", {
        headers: { token },
      });
      if (!res) {
        toast.error("Invalid user");
        window.location.href = "/sign-in";
      } else if (res.status === 200) {
        setData(res.data.data);
        console.log(res.data.data, "?");
      }
    } catch (err) {
      console.log(err, ">?errror in moneeeeee");
      return err;
    }
  };

  useEffect(() => {
    getAllMoments();
  }, []);

  function getImageUrl(url) {
    const fixUrl = "http://192.168.1.41:8080/uploads/";
    return fixUrl + url.split("/").at(-1);
  }

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
      render: (e) => {
        return e.map((el) => {
          return (
            <Tag color={"green"} key={el}>
              {el}
            </Tag>
          );
        });
      },
    },
    {
      title: "Images",
      dataIndex: "files",
      key: "files",
      render: (e) =>
        e.map((el) => {
          const imageUrl = getImageUrl(el); // Extract image URL correctly

          console.log(imageUrl, "ellllllllll"); // Log the extracted URL
          return (
            <div key={el} className='avatar-group d-inline-block'>
              {/* <Tooltip title={title(el)} trigger='hover'> */}
              <Link
                target='_'
                to={el}
                className='projectTeam avatar rounded-circle text-white border border-1 border-solid border-card'>
                <img className='projectTeam' src={imageUrl} />
              </Link>
              {/* </Tooltip> */}
            </div>
          );
        }),
    },
  ];
  return data === null ? (
    <DashLoader />
  ) : (
    <div className=''>
      <Table dataSource={data} columns={columns} />;
    </div>
  );
};
export default MomentList;
