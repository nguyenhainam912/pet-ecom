import {
  handleGetCategory,
  handleGetSubCategory,
  handleUpdateProductAction,
  handleUpdateUserAction,
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
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

const UserUpdate = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;

  const [form] = Form.useForm();
  const [listCategory, setlistCategory] = useState([]);
  const [listSubCategory, setlistSubCategory] = useState([]);

  useEffect(() => {
    if (dataUpdate) {
      //code
      form.setFieldsValue({
        name: dataUpdate.name,
        code: dataUpdate.code,
        categoryId: dataUpdate.categoryId,
        subCategoryId: dataUpdate.subCategoryId,
        image: dataUpdate.image,
        tag: dataUpdate.tag,
        quantity: dataUpdate.quantity,
        price: dataUpdate.price,
      });
    }
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const {
        name,
        code,
        categoryId,
        subCategoryId,
        image,
        tag,
        quantity,
        price,
      } = values;
      const res = await handleUpdateProductAction({
        _id: dataUpdate._id,
        name,
        code,
        categoryId,
        subCategoryId,
        image,
        tag,
        quantity,
        price,
      });
      if (res?.data) {
        handleCloseUpdateModal();
        message.success("Update succeed");
      } else {
        notification.error({
          message: "Update error",
          description: res?.message,
        });
      }
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
      title="Update a user"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUpdateModal()}
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

export default UserUpdate;
