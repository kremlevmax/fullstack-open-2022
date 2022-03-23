import React from "react";

const Header = ({ text }) => {
  return (
    <tr>
      <td colSpan='2'>
        <b>{text}</b>
      </td>
    </tr>
  );
};

export default Header;
