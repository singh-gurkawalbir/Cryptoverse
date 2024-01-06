import React from "react";
import { Collapse, Row, Col, Typography, Avatar } from "antd";

import { useGetRefCurrenciesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Currencies = () => {
  const { data, isFetching } = useGetRefCurrenciesQuery();
  const statsList = data?.data?.currencies;
  // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;
  // console.log({statsList})
  return (
    <>
      <Row>
        <Col span={6}>Currency</Col>
        <Col span={6}>Type</Col>
        <Col span={6}>Symbol</Col>
      </Row>
      <Row>
        {statsList.map((currency) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={currency.uuid}
                showArrow={false}
                header={
                  <Row key={currency.uuid}>
                    <Col span={6}>
                      <Avatar
                        className="currency-image"
                        src={
                          currency.iconUrl ||
                          "https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/credit-card-color-icon.png"
                        }
                      />
                      <Text>
                        <strong> {currency.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>{currency.type}</Col>
                    <Col span={6}>{currency.symbol}</Col>
                  </Row>
                }
              ></Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Currencies;
