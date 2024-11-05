// "use client";
// import {
//   handleDeleteProductAction,
//   handleDeleteUserAction,
// } from "@/utils/actions";
// import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
// import { Button, Image, Popconfirm, Table } from "antd";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// interface IProps {
//   orders: any;
//   meta: {
//     current: number;
//     pageSize: number;
//     pages: number;
//     total: number;
//   };
// }
// const OrderTable = (props: IProps) => {
//   const { orders, meta } = props;
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();

//   const columns = [
//     {
//       title: "STT",
//       render: (_: any, record: any, index: any) => {
//         return <>{index + 1 + (meta.current - 1) * meta.pageSize}</>;
//       },
//     },
//     // {
//     //   title: "_id",
//     //   dataIndex: "_id",
//     // },
//     {
//       title: "Tên",
//       dataIndex: "name",
//     },
//     {
//       title: "Ảnh",
//       dataIndex: "image",
//       render: (image: any) => {
//         return (
//           <Image src={image} height={40}>
//             {" "}
//           </Image>
//         );
//       },
//     },
//     {
//       title: "Số lượng",
//       dataIndex: "quantity",
//     },
//     {
//       title: "Giá",
//       dataIndex: "price",
//     },
//   ];

//   const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
//     if (pagination && pagination.current) {
//       const params = new URLSearchParams(searchParams);
//       params.set("current", pagination.current);
//       replace(`${pathname}?${params.toString()}`);
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 20,
//         }}
//       >
//         <span>Manager Pet</span>
//       </div>
//       <Table
//         bordered
//         dataSource={orders}
//         columns={columns}
//         rowKey={"_id"}
//         pagination={{
//           current: meta.current,
//           pageSize: meta.pageSize,
//           showSizeChanger: true,
//           total: meta.total,
//           showTotal: (total, range) => {
//             return (
//               <div>
//                 {" "}
//                 {range[0]}-{range[1]} trên {total} rows
//               </div>
//             );
//           },
//         }}
//         onChange={onChange}
//       />
//     </>
//   );
// };

// export default OrderTable;
