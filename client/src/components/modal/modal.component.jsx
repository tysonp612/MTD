import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "antd";
export const ModalComponent = ({ title, rating, button }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    toast.success("Thank you for your rating, your rating will appear shortly");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div onClick={showModal}>
        {button}
        <br />
        {title}
      </div>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {rating}
      </Modal>
    </>
  );
};
