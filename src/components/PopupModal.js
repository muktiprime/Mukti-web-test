import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function PopupModal() {
  const [open, setOpen] = useState(true);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <div>
      {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Modal open={open} onClose={onCloseModal} center>
        <br />
        <p
          style={{
            padding: "20px",
            color: "#f4181c",
            textTransform: "uppercase",
            wordSpacing: "2px",
            fontWeight: "bolder",
          }}
        >
          You already have a active plan
        </p>
      </Modal>
    </div>
  );
}
