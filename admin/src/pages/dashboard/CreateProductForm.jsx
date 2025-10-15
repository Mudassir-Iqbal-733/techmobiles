import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  Select,
  message,
  ConfigProvider,
  theme,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const { Option } = Select;

const RAM_OPTIONS = ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB", "32GB"];
const STORAGE_OPTIONS = ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"];
const SCREEN_SIZE_OPTIONS = ["5.0 inches", "5.5 inches", "6.0 inches", "6.5 inches", "7.0 inches"];
const CAMERA_PIXEL_OPTIONS = ["8MP", "12MP", "16MP", "32MP", "48MP", "64MP", "108MP"];

const CreateProductForm = () => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // 🔄 Watch for dark mode toggle on <html>
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // ✅ Upload
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "/uploads");
    formData.append("fileName", file.name);

    try {
      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          auth: {
            username: "private_tXMMJJ3ftBy0e+TVo8kvlBrfnjg=", // 🔑 Replace with real private key
          },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data?.url) {
        setImages((prev) => [...prev, { [file.uid]: response.data.url }]);
        message.success(`${file.name} uploaded successfully`);
        return response.data.url;
      }
    } catch (error) {
      message.error(`Upload failed: ${error.message}`);
    }
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      await uploadImage(file);
      onSuccess("ok");
    } catch {
      onError("Upload failed");
    }
  };

  const handleChange = ({ fileList, file }) => {
    if (fileList.length > 4) {
      message.warning("You can only upload up to 4 images.");
      return;
    }
    if (file.status === "removed") {
      setImages((prev) => prev.filter((img) => !img[file.uid]));
    }
    setFileList(fileList);
  };

  const beforeUpload = (file) => {
    if (fileList.length >= 4) {
      message.warning("You can only upload up to 4 images.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  // ✅ Submit
  const onFinish = async (values) => {
    try {
      const imageUrls = images.map((obj) => Object.values(obj)[0]);
      const productData = { ...values, description, images: imageUrls };

      await axios.post(`${import.meta.env.VITE_API_URL}/products/create`, productData, {
        headers: { "Content-Type": "application/json" },
      });

      message.success("Product created successfully!");
      form.resetFields();
      setDescription("");
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-sm transition-colors w-full max-w-full md:max-w-[95%] lg:max-w-[90%] xl:max-w-[100%] mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
          Create Product
        </h1>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input size="large" placeholder="Enter product name" />
          </Form.Item>

          {/* Price + Discounted */}
          <div className="flex flex-col md:flex-row gap-4">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <InputNumber size="large" style={{ width: "100%" }} placeholder="Enter price" />
            </Form.Item>
            <Form.Item
              name="discounted_price"
              label="Discounted Price"
              dependencies={["price"]}
              className="flex-1"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value < getFieldValue("price")) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Discounted price must be less than price");
                  },
                }),
              ]}
            >
              <InputNumber size="large" style={{ width: "100%" }} placeholder="Enter discounted price" />
            </Form.Item>
          </div>

          {/* RAM + Storage */}
          <div className="flex flex-col md:flex-row gap-4">
            <Form.Item name="ram" label="RAM" rules={[{ required: true }]} className="flex-1">
              <Select size="large" placeholder="Select RAM">
                {RAM_OPTIONS.map((ram) => (
                  <Option key={ram}>{ram}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="storage" label="Storage" rules={[{ required: true }]} className="flex-1">
              <Select size="large" placeholder="Select Storage">
                {STORAGE_OPTIONS.map((storage) => (
                  <Option key={storage}>{storage}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Screen + Camera */}
          <div className="flex flex-col md:flex-row gap-4">
            <Form.Item name="screensize" label="Screen Size" rules={[{ required: true }]} className="flex-1">
              <Select size="large" placeholder="Select Screen Size">
                {SCREEN_SIZE_OPTIONS.map((size) => (
                  <Option key={size}>{size}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="cameraPixels" label="Camera Pixel" rules={[{ required: true }]} className="flex-1">
              <Select size="large" placeholder="Select Camera Pixel">
                {CAMERA_PIXEL_OPTIONS.map((pixel) => (
                  <Option key={pixel}>{pixel}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Brand + Model */}
          <div className="flex flex-col md:flex-row gap-4">
            <Form.Item name="brand" label="Brand" rules={[{ required: true }]} className="flex-1">
              <Select size="large" placeholder="Select brand">
                <Option value="Apple">Apple</Option>
                <Option value="Samsung">Samsung</Option>
                <Option value="OnePlus">OnePlus</Option>
                <Option value="Xiaomi">Xiaomi</Option>
                <Option value="Realme">Realme</Option>
              </Select>
            </Form.Item>
            <Form.Item name="model" label="Model" rules={[{ required: true }]} className="flex-1">
              <Input size="large" placeholder="Enter model" />
            </Form.Item>
          </div>

          {/* Upload */}
          <Form.Item name="images" label="Upload Images">
            <Upload
              multiple
              customRequest={handleUpload}
              listType="picture"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {fileList.length < 4 && (
                <Button icon={<PlusOutlined />}>Upload Images (Max 4)</Button>
              )}
            </Upload>
          </Form.Item>

          {/* Description */}
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              style={{ height: "250px", marginBottom: "40px" }}
              className={isDark ? "dark-quill" : ""}
            />
          </Form.Item>

          
            <Button style={{width:"10%"}} type="primary" htmlType="submit"  block>
              Submit
            </Button>
          
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default CreateProductForm;
