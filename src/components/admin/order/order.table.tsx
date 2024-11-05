"use client";

import { formatPrice } from "@/utils/functionShare";
import { Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
  orders: any;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}
const OrderTable = (props: IProps) => {
  const { orders, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const columns = [
    {
      title: "STT",
      render: (_: any, record: any, index: any) => {
        return <>{index + 1 + (meta.current - 1) * meta.pageSize}</>;
      },
    },
    // {
    //   title: "_id",
    //   dataIndex: "_id",
    // },
    {
      title: "User",
      dataIndex: "userId",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (price: number) => {
        return <>{formatPrice(price)}</>;
      },
    },
    {
      title: "Pay",
      dataIndex: "pay",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("current", pagination.current);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const expandedRowRender = (record: any) => {
    const columns = [
      { title: "Pet", dataIndex: "name", key: "0" },
      { title: "Quantity", dataIndex: "quantity", key: "1" },
      { title: "Price", dataIndex: "price", key: "2" },
    ];

    var data = [];
    data = record?.detail.map((item: any) => {
      return {
        key: item?.productId?._id,
        name: item?.productId?.name,
        quantity: item?.quantity,
        price: formatPrice(item?.productId?.price),
      };
    });

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        key={`${record._id}_1`}
      />
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Manager Order</span>
      </div>
      <Table
        bordered
        dataSource={orders}
        columns={columns}
        rowKey={"_id"}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
    </>
  );
};

export default OrderTable;
