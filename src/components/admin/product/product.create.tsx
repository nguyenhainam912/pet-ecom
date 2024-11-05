import {
  handleCreateProductAction,
  handleCreateUserAction,
  handleGetCategory,
  handleGetSubCategory,
} from "@/utils/actions";
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
  Select,
} from "antd";
import { useEffect, useState } from "react";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const ProductCreate = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();
  const [listCategory, setlistCategory] = useState([]);
  const [listSubCategory, setlistSubCategory] = useState([]);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values: any) => {
    const res = await handleCreateProductAction(values);
    if (res?.data) {
      handleCloseCreateModal();
      message.success("Create succeed!");
    } else {
      notification.error({
        message: "Create error",
        description: res?.message,
      });
    }
  };

  const listACategory = async () => {
    let res: IBackendRes<IModelPaginate<ICategory>> = await handleGetCategory();
    let a: any = res?.data?.result?.map((item: ICategory) => {
      return { value: item._id, label: item.title };
    });
    setlistCategory(a);
  };

  const listASubCategory = async () => {
    let res: IBackendRes<IModelPaginate<ICategory>> =
      await handleGetSubCategory();
    let a: any = res?.data?.result?.map((item: ICategory) => {
      return { value: item._id, label: item.title };
    });
    setlistSubCategory(a);
  };

  useEffect(() => {
    listACategory();
    listASubCategory();
  }, []);

  return (
    <Modal
      title="Add new"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Code"
              name="code"
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <Input placeholder="SP000001" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="categoryId"
              rules={[
                { required: true, message: "Please input your category!" },
              ]}
            >
              <Select options={listCategory} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="SubCategory"
              name="subCategoryId"
              rules={[
                { required: true, message: "Please input your subCategory!" },
              ]}
            >
              <Select options={listSubCategory} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col span={12}>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tag"
              name="tag"
              rules={[{ required: true, message: "Please input your tag!" }]}
            >
              <Input placeholder="NEW" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[15, 15]}>
          <Col span={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input your quantity!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductCreate;
