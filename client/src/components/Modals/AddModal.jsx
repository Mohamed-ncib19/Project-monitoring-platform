import FormModal from './FormModal';

function AddModal({ children, show, onHide, title, onValid, size }) {
  return (
    <FormModal
      show={show}
      size={size}
      onHide={onHide}
      title={title}
      submit={{
        label: 'Save',
        variant: 'success',
        icon: <i className="fa fa-save me-2" />,
      }}
      onValid={onValid}
    >
      {children}
    </FormModal>
  );
}

export default AddModal;
