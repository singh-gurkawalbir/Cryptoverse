import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const demoImage =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.articles) return <Loader />;
  const style = { width: "48px", height: "48px" };
  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.articles.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={3}>
                  {news.source.name}
                </Title>
                <img style={style} src={news?.urlToImage || demoImage} alt="" />
              </div>
              <Title level={4}>{news.title}</Title>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)} ...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    icon={<UserOutlined />}
                  />
                  <Text className="provider-name">{news.author}</Text>
                </div>
                <Text>{moment(news.publishedAt).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
