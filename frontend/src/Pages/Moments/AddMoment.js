import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Utils/BaseUrl";
const token = localStorage.getItem("token");

const formStyles = {
  borderTop: "0",
  borderRight: "0",
  borderLeft: "0",
  borderRadius: "0",
  borderBottom: "1px solid #ced4da",
};

const AddMoment = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      comment: "",
      tags: [],
      files: [],
    },
    validationSchema: "",
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("comment", values.comment);
      formData.append("tags", values.tags);

      if (values.files) {
        for (let i = 0; i < values.files.length; i++) {
          formData.append("files", values.files[i]);
        }
      }

      try {
        const res = await axios.post(BASE_URL + "/api/moment/create-moment", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token,
          },
        });
        if (res.status === 201) {
          navigate("/moment-list");
          toast.success("Moment added successfully");
        }
      } catch (err) {
        toast.error("Error while adding moment");
        return err;
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("files", event.target.files);
  };

  const { handleSubmit, handleChange } = formik;

  return (
    <div className=''>
      <div className='container mt-5'>
        <h1 className='mb-5 fw-bold'>Add Moment</h1>
        <form onSubmit={handleSubmit}>
          <div className='row mb-5'>
            <div className='col-md-12'>
              <label htmlFor='firstName' className='form-label'>
                Title
              </label>
              <input
                name='title'
                value={formik.values.title}
                onChange={(e) => handleChange(e)}
                type='text'
                className='form-control'
                style={formStyles}
                id='firstName'
              />
            </div>
            <div className='col-md-12 my-5'>
              <label htmlFor='firstName' className='form-label'>
                Comments
              </label>
              <textarea
                name='comment'
                value={formik.values.comment}
                onChange={(e) => handleChange(e)}
                type='text'
                className='form-control'
                style={formStyles}
                id='firstName'></textarea>
            </div>
            <div className='col-md-6 my-5'>
              <label htmlFor='lastName' className='form-label'>
                Tags
              </label>
              <CreatableSelect
                isClearable
                isMulti
                name='tags'
                value={tags}
                onChange={(e) => {
                  setTags(e);

                  formik.setFieldValue(
                    "tags",
                    e.map((el) => [el.value])
                  );
                }}
              />
            </div>
            <div className='col-md-6 my-5'>
              {/* <Form.Item
                label=''
                className='dragFormmmmmmmmmmmmmmm'
                style={{ border: "2px dashed rgb(206, 212, 218)" }}>
                <Form.Item name='dragger' valuePropName='fileList' getValueFromEvent={normFile} noStyle>
                  <Upload.Dragger name='files' action={BASE_URL + "/api/moment/create-moment"}>
                    <p className='ant-upload-drag-icon'>
                      <InboxOutlined />
                    </p>
                    <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                    <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item> */}
              <label htmlFor='files' className='form-label'></label>
              <input type='file' name='files' onChange={handleFileChange} className='form-control' multiple />
            </div>
          </div>

          <div className='d-flex justify-content-center'>
            <button
              type='submit'
              className='btn mb-5'
              style={{
                background: "#001B30",
                color: "white",
                paddingRight: "4rem",
                paddingLeft: "4rem",
                borderRadius: "5rem",
              }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddMoment;
