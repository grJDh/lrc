import { Modal, Button } from '@mantine/core';

const Dialogue = ({ opened, text, onClose, onYes, onNo }) => {

  return (
    <Modal opened={opened} withCloseButton={false} centered onClose={onClose}>
      
      {text}

      <Button onClick={onYes}>
        Yes
      </Button>

      <Button onClick={onNo}>
        No
      </Button>
    </Modal>
  );
}

export default Dialogue;
