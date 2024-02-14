import React from "react";
import { Skeleton, Card } from "antd";
export const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <div className="col-md-4" key={i}>
          <Card className="p-1">
            <Skeleton active></Skeleton>
          </Card>
        </div>
      );
    }

    return totalCards;
  };
  return <div className="row pb-5">{cards()}</div>;
};
