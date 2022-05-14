import { Modal, Button, Text } from '@mantine/core';

const Dialogue = ({ opened, text, onYes, onNo }) => {

  return (
    <Modal
      opened={opened}
      withCloseButton={false}
      centered
      onClose={onNo}
      className="flex flex-col justify-center"
    >
      <Text style={{ fontSize: "20px" }} align="center">
        {text}
      </Text>

      <div className="flex justify-center">
        <Button onClick={onYes}>
          Yes
        </Button>

        <Button onClick={onNo}>
          No
        </Button>
      </div>
    </Modal>
  );
}

export default Dialogue;
