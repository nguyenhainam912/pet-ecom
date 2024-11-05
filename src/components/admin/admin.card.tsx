"use client";

import { Card, Col, Row, Statistic, StatisticProps } from "antd";
import CountUp from "react-countup";

interface IProps {
  data: any;
}

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);
const AdminCard = (props: IProps) => {
  const { data } = props;
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="Số ngươi dùng"
            value={data?.countUser}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="Doanh Thu"
            value={data?.totalPrice}
            formatter={formatter}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AdminCard;
