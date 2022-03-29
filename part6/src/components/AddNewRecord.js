import React from "react";

const AddNewRecord = ({
  onSubmitHandler,
  onChangeNameHandler,
  newName,
  onChangePhoneNumberHandler,
  newPhoneNumber,
}) => {
  return (
    <>
      <h2>Add a new record</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input onChange={onChangeNameHandler} value={newName} />
        </div>
        <div>
          number:
          <input onChange={onChangePhoneNumberHandler} value={newPhoneNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  );
};

export default AddNewRecord;
