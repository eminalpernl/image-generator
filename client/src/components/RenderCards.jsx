import React from "react";
import Card from "./Card";

function RenderCards({ data, title }) {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return <h2>{title}</h2>;
}

export default RenderCards;
