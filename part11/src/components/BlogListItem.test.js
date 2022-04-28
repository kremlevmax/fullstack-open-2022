// import React from "react";
// import "@testing-library/jest-dom/extend-expect";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import BlogListItem from "./BlogListItem";

// describe("<BlogListItem />", () => {
//   let container;

//   const mockHandler = jest.fn();

//   beforeEach(() => {
//     const user = {
//       id: "6261157df5ad77fc6cfb7b49",
//       name: "Max Kremlev",
//       token:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtyZW1sZXZtYTQ0eDMxIiwiaWQiOiI2MjYxMTU3ZGY1YWQ3N2ZjNmNmYjdiNDkiLCJpYXQiOjE2NTA5Mzg3OTV9.xVm9FSQ42shJVo-8qDWrb1mBN6FaI7b3r0S6G1C8_TE",
//       username: "kremlevma44x31",
//     };

//     const blog = {
//       title: "Blog 1",
//       author: "Max",
//       url: "www.max.com",
//       likes: 28,
//       user: "625f3aaec633ea7174b948c0",
//       id: "625f811d8056a500bb5b4eb7",
//     };
//     container = render(
//       <BlogListItem user={user} blog={blog} addLike={mockHandler} />
//     ).container;
//   });

//   test("Check double click on Like creates two events", async () => {
//     const user = userEvent.setup();
//     const button = screen.getByText("Like");
//     await user.click(button);
//     await user.click(button);

//     expect(mockHandler.mock.calls).toHaveLength(2);
//   });
// });
