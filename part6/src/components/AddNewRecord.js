import React from "react";

const AddNewRecord = ({
  onSubmitHandler,
  onChangeNameHandler,
  onChangePhoneNumberHandler,
  person,
}) => {
  return (
    <>
      <h2>Add a new record</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input onChange={onChangeNameHandler} value={person.name} />
        </div>
        <div>
          number:
          <input
            onChange={onChangePhoneNumberHandler}
            value={person.phoneNumber}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  );
};

export default AddNewRecord;
